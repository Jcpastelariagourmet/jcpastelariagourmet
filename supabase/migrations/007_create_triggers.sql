-- =============================================
-- JC Pastelaria Gourmet - Triggers e Funções
-- =============================================

-- Função para atualizar timestamp automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualização automática de updated_at
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at 
    BEFORE UPDATE ON products 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at 
    BEFORE UPDATE ON orders 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at 
    BEFORE UPDATE ON reviews 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at 
    BEFORE UPDATE ON system_settings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- Função para criar usuário automaticamente após signup
-- =============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, email_verified)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email_confirmed_at IS NOT NULL
  );
  
  -- Conceder pontos de boas-vindas
  INSERT INTO public.points_history (user_id, points, type, description)
  VALUES (
    NEW.id,
    100,
    'earned_purchase',
    'Bônus de boas-vindas'
  );
  
  -- Atualizar pontos do usuário
  UPDATE public.users 
  SET points = points + 100 
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar usuário automaticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- Função para atualizar estatísticas do produto após avaliação
-- =============================================

CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
  -- Atualizar rating e contagem de reviews do produto
  UPDATE products 
  SET 
    rating = (
      SELECT ROUND(AVG(rating)::numeric, 2) 
      FROM reviews 
      WHERE product_id = NEW.product_id
    ),
    reviews_count = (
      SELECT COUNT(*) 
      FROM reviews 
      WHERE product_id = NEW.product_id
    )
  WHERE id = NEW.product_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar rating do produto
CREATE TRIGGER update_product_rating_trigger
  AFTER INSERT OR UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_product_rating();

-- =============================================
-- Função para atualizar estatísticas do usuário após pedido
-- =============================================

CREATE OR REPLACE FUNCTION update_user_stats_after_order()
RETURNS TRIGGER AS $$
BEGIN
  -- Só atualizar se o pedido foi entregue
  IF NEW.status = 'delivered' AND (OLD.status IS NULL OR OLD.status != 'delivered') THEN
    -- Atualizar estatísticas do usuário
    UPDATE users 
    SET 
      total_spent = total_spent + NEW.total,
      orders_count = orders_count + 1
    WHERE id = NEW.user_id;
    
    -- Conceder pontos pela compra (10 pontos por real)
    INSERT INTO points_history (user_id, points, type, description, reference_id, reference_type)
    VALUES (
      NEW.user_id,
      FLOOR(NEW.total * 10)::INTEGER,
      'earned_purchase',
      'Pontos pela compra #' || NEW.id,
      NEW.id,
      'order'
    );
    
    -- Atualizar pontos do usuário
    UPDATE users 
    SET points = points + FLOOR(NEW.total * 10)::INTEGER
    WHERE id = NEW.user_id;
    
    -- Verificar e atualizar nível do usuário
    PERFORM update_user_level(NEW.user_id);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar estatísticas após pedido
CREATE TRIGGER update_user_stats_after_order_trigger
  AFTER UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_user_stats_after_order();

-- =============================================
-- Função para atualizar nível do usuário baseado nos pontos
-- =============================================

CREATE OR REPLACE FUNCTION update_user_level(user_uuid UUID)
RETURNS VOID AS $$
DECLARE
  current_points INTEGER;
  new_level user_level;
  old_level user_level;
BEGIN
  -- Buscar pontos e nível atual do usuário
  SELECT points, level INTO current_points, old_level
  FROM users WHERE id = user_uuid;
  
  -- Determinar novo nível baseado nos pontos
  IF current_points >= 8000 THEN
    new_level := 'diamond';
  ELSIF current_points >= 3000 THEN
    new_level := 'gold';
  ELSIF current_points >= 1000 THEN
    new_level := 'silver';
  ELSE
    new_level := 'bronze';
  END IF;
  
  -- Atualizar nível se mudou
  IF new_level != old_level THEN
    UPDATE users SET level = new_level WHERE id = user_uuid;
    
    -- Criar notificação de mudança de nível
    INSERT INTO notifications (user_id, title, message, type, data)
    VALUES (
      user_uuid,
      'Parabéns! Novo nível desbloqueado!',
      'Você alcançou o nível ' || UPPER(new_level::text) || '!',
      'achievement',
      jsonb_build_object('level', new_level, 'old_level', old_level)
    );
  END IF;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- Função para garantir apenas um endereço padrão por usuário
-- =============================================

CREATE OR REPLACE FUNCTION ensure_single_default_address()
RETURNS TRIGGER AS $$
BEGIN
  -- Se o novo endereço está sendo marcado como padrão
  IF NEW.is_default = true THEN
    -- Desmarcar todos os outros endereços do usuário como padrão
    UPDATE addresses 
    SET is_default = false 
    WHERE user_id = NEW.user_id AND id != NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para garantir apenas um endereço padrão
CREATE TRIGGER ensure_single_default_address_trigger
  BEFORE INSERT OR UPDATE ON addresses
  FOR EACH ROW EXECUTE FUNCTION ensure_single_default_address();