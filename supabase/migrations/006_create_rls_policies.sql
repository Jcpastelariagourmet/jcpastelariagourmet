-- =============================================
-- JC Pastelaria Gourmet - Row Level Security (RLS)
-- =============================================

-- Habilitar RLS em todas as tabelas que precisam de controle de acesso
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE points_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- =============================================
-- Políticas para tabela users
-- =============================================

-- Usuários podem visualizar e atualizar apenas seu próprio perfil
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Permitir inserção de novos usuários (signup)
CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Função para criar usuário automaticamente após signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, name, points, level, total_spent, orders_count, preferences)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    100, -- Bônus de boas-vindas
    'bronze',
    0,
    0,
    COALESCE(new.raw_user_meta_data->>'preferences', '{}')::jsonb
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar usuário automaticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- =============================================
-- Políticas para tabela addresses
-- =============================================

-- Usuários podem gerenciar apenas seus próprios endereços
CREATE POLICY "Users can manage own addresses" ON addresses
  FOR ALL USING (auth.uid() = user_id);

-- =============================================
-- Políticas para tabela orders
-- =============================================

-- Usuários podem visualizar apenas seus próprios pedidos
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Usuários podem criar pedidos para si mesmos
CREATE POLICY "Users can create own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Usuários podem atualizar apenas seus próprios pedidos (para cancelamento)
CREATE POLICY "Users can update own orders" ON orders
  FOR UPDATE USING (auth.uid() = user_id);

-- =============================================
-- Políticas para tabela order_items
-- =============================================

-- Usuários podem visualizar itens de seus próprios pedidos
CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Usuários podem inserir itens em seus próprios pedidos
CREATE POLICY "Users can insert own order items" ON order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- =============================================
-- Políticas para tabelas de gamificação
-- =============================================

-- Usuários podem visualizar apenas suas próprias conquistas
CREATE POLICY "Users can view own achievements" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);

-- Sistema pode inserir conquistas para usuários
CREATE POLICY "System can insert user achievements" ON user_achievements
  FOR INSERT WITH CHECK (true);

-- Usuários podem visualizar apenas seus próprios desafios
CREATE POLICY "Users can view own challenges" ON user_challenges
  FOR SELECT USING (auth.uid() = user_id);

-- Sistema pode gerenciar desafios dos usuários
CREATE POLICY "System can manage user challenges" ON user_challenges
  FOR ALL WITH CHECK (true);

-- Usuários podem visualizar apenas seus próprios cupons
CREATE POLICY "Users can view own coupons" ON user_coupons
  FOR SELECT USING (auth.uid() = user_id);

-- Sistema pode gerenciar cupons dos usuários
CREATE POLICY "System can manage user coupons" ON user_coupons
  FOR ALL WITH CHECK (true);

-- Usuários podem visualizar apenas seu próprio histórico de pontos
CREATE POLICY "Users can view own points history" ON points_history
  FOR SELECT USING (auth.uid() = user_id);

-- Sistema pode inserir histórico de pontos
CREATE POLICY "System can insert points history" ON points_history
  FOR INSERT WITH CHECK (true);

-- =============================================
-- Políticas para tabela reviews
-- =============================================

-- Usuários podem visualizar todas as avaliações (públicas)
CREATE POLICY "Anyone can view reviews" ON reviews
  FOR SELECT USING (true);

-- Usuários podem criar avaliações apenas para seus próprios pedidos
CREATE POLICY "Users can create own reviews" ON reviews
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = reviews.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Usuários podem atualizar apenas suas próprias avaliações
CREATE POLICY "Users can update own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

-- =============================================
-- Políticas para tabela notifications
-- =============================================

-- Usuários podem visualizar apenas suas próprias notificações
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

-- Usuários podem atualizar apenas suas próprias notificações (marcar como lida)
CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Sistema pode inserir notificações para usuários
CREATE POLICY "System can insert notifications" ON notifications
  FOR INSERT WITH CHECK (true);

-- =============================================
-- Políticas para tabelas públicas (sem RLS)
-- =============================================

-- Produtos são visíveis para todos (apenas produtos disponíveis)
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (is_available = true);

-- Categorias são visíveis para todos (apenas categorias ativas)
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (is_active = true);

-- Tamanhos de produtos são visíveis para todos
CREATE POLICY "Product sizes are viewable by everyone" ON product_sizes
  FOR SELECT USING (is_available = true);

-- Customizações são visíveis para todos
CREATE POLICY "Product customizations are viewable by everyone" ON product_customizations
  FOR SELECT USING (true);

-- Opções de customização são visíveis para todos
CREATE POLICY "Customization options are viewable by everyone" ON customization_options
  FOR SELECT USING (is_available = true);

-- Conquistas são visíveis para todos
CREATE POLICY "Achievements are viewable by everyone" ON achievements
  FOR SELECT USING (is_active = true);

-- Desafios são visíveis para todos
CREATE POLICY "Challenges are viewable by everyone" ON challenges
  FOR SELECT USING (is_active = true);

-- Cupons não são diretamente visíveis (apenas através de código)
-- Configurações do sistema são visíveis para todos
CREATE POLICY "System settings are viewable by everyone" ON system_settings
  FOR SELECT USING (true);