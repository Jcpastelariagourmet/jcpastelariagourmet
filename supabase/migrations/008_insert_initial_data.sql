-- =============================================
-- JC Pastelaria Gourmet - Dados Iniciais
-- =============================================

-- =============================================
-- Inserir categorias iniciais
-- =============================================

INSERT INTO categories (name, description, icon, color, order_index, is_active) VALUES
('Pastéis Salgados', 'Deliciosos pastéis salgados com recheios variados', '🥟', '#FFC700', 1, true),
('Pastéis Doces', 'Pastéis doces irresistíveis para sobremesa', '🍰', '#FF6B6B', 2, true),
('Bebidas', 'Bebidas refrescantes para acompanhar', '🥤', '#4ECDC4', 3, true),
('Combos', 'Combinações especiais com desconto', '🍽️', '#45B7D1', 4, true),
('Sobremesas', 'Doces e sobremesas artesanais', '🍮', '#96CEB4', 5, true);

-- =============================================
-- Inserir produtos base por categoria
-- =============================================

-- Pastéis Salgados
INSERT INTO products (name, description, price, category_id, image_url, is_available, preparation_time, nutritional_info, allergens) 
SELECT 
  'Pastel de Carne', 
  'Pastel tradicional com recheio de carne moída temperada com cebola e temperos especiais',
  12.90,
  id,
  '/images/products/pastel-carne.jpg',
  true,
  25,
  '{"calories": 320, "protein": 18, "carbs": 28, "fat": 16}',
  ARRAY['glúten']
FROM categories WHERE name = 'Pastéis Salgados';

INSERT INTO products (name, description, price, category_id, image_url, is_available, preparation_time, nutritional_info, allergens) 
SELECT 
  'Pastel de Queijo', 
  'Pastel cremoso com queijo mussarela derretido',
  10.90,
  id,
  '/images/products/pastel-queijo.jpg',
  true,
  20,
  '{"calories": 280, "protein": 14, "carbs": 26, "fat": 14}',
  ARRAY['glúten', 'lactose']
FROM categories WHERE name = 'Pastéis Salgados';

INSERT INTO products (name, description, price, category_id, image_url, is_available, preparation_time, nutritional_info, allergens) 
SELECT 
  'Pastel de Frango com Catupiry', 
  'Pastel com frango desfiado e catupiry cremoso',
  14.90,
  id,
  '/images/products/pastel-frango-catupiry.jpg',
  true,
  30,
  '{"calories": 350, "protein": 22, "carbs": 28, "fat": 18}',
  ARRAY['glúten', 'lactose']
FROM categories WHERE name = 'Pastéis Salgados';

INSERT INTO products (name, description, price, category_id, image_url, is_available, preparation_time, nutritional_info, allergens) 
SELECT 
  'Pastel de Camarão', 
  'Pastel gourmet com camarão refogado e temperos especiais',
  18.90,
  id,
  '/images/products/pastel-camarao.jpg',
  true,
  35,
  '{"calories": 290, "protein": 20, "carbs": 26, "fat": 12}',
  ARRAY['glúten', 'crustáceos']
FROM categories WHERE name = 'Pastéis Salgados';

-- Pastéis Doces
INSERT INTO products (name, description, price, category_id, image_url, is_available, preparation_time, nutritional_info, allergens) 
SELECT 
  'Pastel de Chocolate', 
  'Pastel doce com recheio cremoso de chocolate ao leite',
  11.90,
  id,
  '/images/products/pastel-chocolate.jpg',
  true,
  20,
  '{"calories": 380, "protein": 8, "carbs": 45, "fat": 18}',
  ARRAY['glúten', 'lactose']
FROM categories WHERE name = 'Pastéis Doces';

INSERT INTO products (name, description, price, category_id, image_url, is_available, preparation_time, nutritional_info, allergens) 
SELECT 
  'Pastel de Doce de Leite', 
  'Pastel com doce de leite cremoso argentino',
  12.90,
  id,
  '/images/products/pastel-doce-leite.jpg',
  true,
  20,
  '{"calories": 420, "protein": 10, "carbs": 52, "fat": 20}',
  ARRAY['glúten', 'lactose']
FROM categories WHERE name = 'Pastéis Doces';

-- Bebidas
INSERT INTO products (name, description, price, category_id, image_url, is_available, preparation_time, nutritional_info, allergens) 
SELECT 
  'Refrigerante Lata', 
  'Refrigerante gelado em lata 350ml - Coca-Cola, Guaraná, Fanta',
  4.50,
  id,
  '/images/products/refrigerante-lata.jpg',
  true,
  5,
  '{"calories": 140, "protein": 0, "carbs": 37, "fat": 0}',
  ARRAY[]::text[]
FROM categories WHERE name = 'Bebidas';

INSERT INTO products (name, description, price, category_id, image_url, is_available, preparation_time, nutritional_info, allergens) 
SELECT 
  'Suco Natural', 
  'Suco natural de frutas frescas - Laranja, Limão, Maracujá',
  6.90,
  id,
  '/images/products/suco-natural.jpg',
  true,
  10,
  '{"calories": 110, "protein": 2, "carbs": 26, "fat": 0}',
  ARRAY[]::text[]
FROM categories WHERE name = 'Bebidas';

-- Combos
INSERT INTO products (name, description, price, category_id, image_url, is_available, preparation_time, nutritional_info, allergens) 
SELECT 
  'Combo Tradicional', 
  '1 Pastel salgado + 1 Refrigerante + 1 Pastel doce',
  24.90,
  id,
  '/images/products/combo-tradicional.jpg',
  true,
  30,
  '{"calories": 740, "protein": 26, "carbs": 91, "fat": 34}',
  ARRAY['glúten', 'lactose']
FROM categories WHERE name = 'Combos';

-- =============================================
-- Inserir tamanhos para produtos
-- =============================================

-- Tamanhos para pastéis salgados
INSERT INTO product_sizes (product_id, name, price_modifier, description, is_available)
SELECT p.id, 'Pequeno', 0.00, 'Tamanho tradicional', true
FROM products p 
JOIN categories c ON p.category_id = c.id 
WHERE c.name = 'Pastéis Salgados';

INSERT INTO product_sizes (product_id, name, price_modifier, description, is_available)
SELECT p.id, 'Grande', 4.00, 'Tamanho família', true
FROM products p 
JOIN categories c ON p.category_id = c.id 
WHERE c.name = 'Pastéis Salgados';

-- Tamanhos para bebidas
INSERT INTO product_sizes (product_id, name, price_modifier, description, is_available)
SELECT p.id, '350ml', 0.00, 'Lata tradicional', true
FROM products p 
JOIN categories c ON p.category_id = c.id 
WHERE c.name = 'Bebidas' AND p.name = 'Refrigerante Lata';

INSERT INTO product_sizes (product_id, name, price_modifier, description, is_available)
SELECT p.id, '600ml', 2.50, 'Garrafa grande', true
FROM products p 
JOIN categories c ON p.category_id = c.id 
WHERE c.name = 'Bebidas' AND p.name = 'Refrigerante Lata';

-- =============================================
-- Inserir customizações para produtos
-- =============================================

-- Customizações para pastéis salgados
INSERT INTO product_customizations (product_id, name, type, required, max_selections, order_index)
SELECT p.id, 'Molho', 'single', false, 1, 1
FROM products p 
JOIN categories c ON p.category_id = c.id 
WHERE c.name = 'Pastéis Salgados';

INSERT INTO product_customizations (product_id, name, type, required, max_selections, order_index)
SELECT p.id, 'Extras', 'multiple', false, 3, 2
FROM products p 
JOIN categories c ON p.category_id = c.id 
WHERE c.name = 'Pastéis Salgados';

-- =============================================
-- Inserir opções de customização
-- =============================================

-- Opções de molho
INSERT INTO customization_options (customization_id, name, price_modifier, is_available, order_index)
SELECT pc.id, 'Molho de Alho', 0.00, true, 1
FROM product_customizations pc
WHERE pc.name = 'Molho';

INSERT INTO customization_options (customization_id, name, price_modifier, is_available, order_index)
SELECT pc.id, 'Molho Picante', 0.00, true, 2
FROM product_customizations pc
WHERE pc.name = 'Molho';

INSERT INTO customization_options (customization_id, name, price_modifier, is_available, order_index)
SELECT pc.id, 'Molho Barbecue', 1.00, true, 3
FROM product_customizations pc
WHERE pc.name = 'Molho';

-- Opções de extras
INSERT INTO customization_options (customization_id, name, price_modifier, is_available, order_index)
SELECT pc.id, 'Queijo Extra', 2.50, true, 1
FROM product_customizations pc
WHERE pc.name = 'Extras';

INSERT INTO customization_options (customization_id, name, price_modifier, is_available, order_index)
SELECT pc.id, 'Bacon', 3.00, true, 2
FROM product_customizations pc
WHERE pc.name = 'Extras';

INSERT INTO customization_options (customization_id, name, price_modifier, is_available, order_index)
SELECT pc.id, 'Catupiry', 2.00, true, 3
FROM product_customizations pc
WHERE pc.name = 'Extras';

-- =============================================
-- Inserir conquistas iniciais
-- =============================================

INSERT INTO achievements (name, description, icon, points_reward, type, requirements, is_active) VALUES
('Primeira Compra', 'Faça seu primeiro pedido na JC Pastelaria', '🎉', 100, 'first_order', '{"orders_count": 1}', true),
('Cliente Fiel', 'Realize 10 pedidos', '⭐', 500, 'orders_count', '{"orders_count": 10}', true),
('Grande Investidor', 'Gaste R$ 500 em pedidos', '💰', 400, 'total_spent', '{"total_spent": 500}', true),
('Explorador de Sabores', 'Experimente 15 sabores diferentes', '🍽️', 300, 'flavor_explorer', '{"unique_products": 15}', true),
('Madrugador', 'Faça um pedido entre 6h e 9h', '🌅', 150, 'early_bird', '{"time_range": "06:00-09:00"}', true),
('Coruja', 'Faça um pedido entre 22h e 2h', '🦉', 150, 'night_owl', '{"time_range": "22:00-02:00"}', true),
('Guerreiro do Fim de Semana', 'Faça 5 pedidos em fins de semana', '🎯', 200, 'weekend_warrior', '{"weekend_orders": 5}', true),
('Crítico Gastronômico', 'Avalie 20 produtos', '📝', 250, 'loyal_customer', '{"reviews_count": 20}', true);

-- =============================================
-- Inserir desafios iniciais
-- =============================================

INSERT INTO challenges (name, description, icon, points_reward, type, requirements, start_date, end_date, is_active) VALUES
('Desafio Semanal - Sabores', 'Experimente 3 sabores diferentes esta semana', '🌟', 200, 'weekly', '{"unique_products": 3, "period": "week"}', NOW(), NOW() + INTERVAL '7 days', true),
('Desafio Mensal - Fidelidade', 'Faça 8 pedidos neste mês', '🏆', 800, 'monthly', '{"orders_count": 8, "period": "month"}', NOW(), NOW() + INTERVAL '30 days', true),
('Desafio Especial - Avaliador', 'Avalie 5 produtos que você pediu', '⭐', 300, 'special', '{"reviews_count": 5}', NOW(), NOW() + INTERVAL '14 days', true);

-- =============================================
-- Inserir cupons iniciais
-- =============================================

INSERT INTO coupons (code, name, description, type, value, minimum_order, usage_limit, valid_from, valid_until, is_active) VALUES
('BEMVINDO20', 'Boas-vindas', 'Desconto de 20% para novos clientes', 'percentage', 20.00, 25.00, 1000, NOW(), NOW() + INTERVAL '90 days', true),
('FRETEGRATIS', 'Frete Grátis', 'Frete grátis em pedidos acima de R$ 30', 'free_delivery', 0.00, 30.00, NULL, NOW(), NOW() + INTERVAL '30 days', true),
('COMBO15', 'Desconto Combo', '15% de desconto em combos', 'percentage', 15.00, 0.00, NULL, NOW(), NOW() + INTERVAL '60 days', true);

-- =============================================
-- Inserir configurações do sistema
-- =============================================

INSERT INTO system_settings (key, value, description) VALUES
('delivery_fee', '{"default": 5.00, "free_minimum": 40.00, "zones": [{"name": "Centro", "fee": 3.00}, {"name": "Bairros próximos", "fee": 5.00}, {"name": "Bairros distantes", "fee": 8.00}]}', 'Configurações de taxa de entrega'),
('points_config', '{"earn_rate": 10, "expiry_days": 365, "welcome_bonus": 100}', 'Configurações do sistema de pontos'),
('level_thresholds', '{"bronze": 0, "silver": 1000, "gold": 3000, "diamond": 8000}', 'Limites de pontos para cada nível'),
('level_benefits', '{"bronze": {"discount": 0}, "silver": {"discount": 5}, "gold": {"discount": 10, "free_delivery": true}, "diamond": {"discount": 15, "free_delivery": true, "early_access": true}}', 'Benefícios por nível de usuário'),
('business_hours', '{"monday": {"open": "11:00", "close": "23:00"}, "tuesday": {"open": "11:00", "close": "23:00"}, "wednesday": {"open": "11:00", "close": "23:00"}, "thursday": {"open": "11:00", "close": "23:00"}, "friday": {"open": "11:00", "close": "23:30"}, "saturday": {"open": "11:00", "close": "23:30"}, "sunday": {"open": "16:00", "close": "23:00"}}', 'Horários de funcionamento'),
('contact_info', '{"phone": "(11) 99999-9999", "whatsapp": "(11) 99999-9999", "email": "contato@jcpastelaria.com.br", "address": "Rua dos Pastéis, 123 - Centro"}', 'Informações de contato'),
('social_media', '{"instagram": "@jcpastelaria", "facebook": "JC Pastelaria Gourmet", "whatsapp": "https://wa.me/5511999999999"}', 'Redes sociais');