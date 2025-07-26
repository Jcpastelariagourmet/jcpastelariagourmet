-- =============================================
-- JC Pastelaria Gourmet - Tipos Enumerados
-- =============================================

-- Tipos de usuário (níveis de fidelidade)
CREATE TYPE user_level AS ENUM ('bronze', 'silver', 'gold', 'diamond');

-- Status do pedido
CREATE TYPE order_status AS ENUM (
  'pending', 'confirmed', 'preparing', 'ready', 
  'out_for_delivery', 'delivered', 'cancelled'
);

-- Status do pagamento
CREATE TYPE payment_status AS ENUM (
  'pending', 'processing', 'paid', 'failed', 'refunded'
);

-- Tipo de entrega
CREATE TYPE delivery_type AS ENUM ('delivery', 'pickup');

-- Tipo de customização
CREATE TYPE customization_type AS ENUM ('single', 'multiple');

-- Tipo de conquista
CREATE TYPE achievement_type AS ENUM (
  'first_order', 'orders_count', 'total_spent', 'flavor_explorer',
  'loyal_customer', 'early_bird', 'night_owl', 'weekend_warrior'
);

-- Tipo de desafio
CREATE TYPE challenge_type AS ENUM ('weekly', 'monthly', 'seasonal', 'special');

-- Tipo de cupom
CREATE TYPE coupon_type AS ENUM (
  'percentage', 'fixed_amount', 'free_delivery', 'buy_x_get_y'
);

-- Tipo de notificação
CREATE TYPE notification_type AS ENUM (
  'order_update', 'promotion', 'achievement', 'challenge', 'system', 'reminder'
);

-- Tipo de movimentação de pontos
CREATE TYPE points_type AS ENUM (
  'earned_purchase', 'earned_achievement', 'earned_challenge', 
  'earned_referral', 'spent_reward', 'expired'
);