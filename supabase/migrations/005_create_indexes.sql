-- =============================================
-- JC Pastelaria Gourmet - Índices para Performance
-- =============================================

-- Índices para tabela users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_level ON users(level);
CREATE INDEX idx_users_points ON users(points);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Índices para tabela products
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_is_available ON products(is_available);
CREATE INDEX idx_products_rating ON products(rating);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_name_search ON products USING gin(to_tsvector('portuguese', name || ' ' || description));

-- Índices para tabela orders
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_delivery_type ON orders(delivery_type);

-- Índices para tabela order_items
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- Índices para tabela addresses
CREATE INDEX idx_addresses_user_id ON addresses(user_id);
CREATE INDEX idx_addresses_is_default ON addresses(is_default);
CREATE INDEX idx_addresses_zip_code ON addresses(zip_code);

-- Índices para tabela categories
CREATE INDEX idx_categories_is_active ON categories(is_active);
CREATE INDEX idx_categories_order_index ON categories(order_index);

-- Índices para tabela product_sizes
CREATE INDEX idx_product_sizes_product_id ON product_sizes(product_id);
CREATE INDEX idx_product_sizes_is_available ON product_sizes(is_available);

-- Índices para tabela product_customizations
CREATE INDEX idx_product_customizations_product_id ON product_customizations(product_id);
CREATE INDEX idx_product_customizations_type ON product_customizations(type);

-- Índices para tabela customization_options
CREATE INDEX idx_customization_options_customization_id ON customization_options(customization_id);
CREATE INDEX idx_customization_options_is_available ON customization_options(is_available);

-- Índices para tabela achievements
CREATE INDEX idx_achievements_type ON achievements(type);
CREATE INDEX idx_achievements_is_active ON achievements(is_active);

-- Índices para tabela user_achievements
CREATE INDEX idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX idx_user_achievements_achievement_id ON user_achievements(achievement_id);
CREATE INDEX idx_user_achievements_earned_at ON user_achievements(earned_at);

-- Índices para tabela challenges
CREATE INDEX idx_challenges_type ON challenges(type);
CREATE INDEX idx_challenges_is_active ON challenges(is_active);
CREATE INDEX idx_challenges_start_date ON challenges(start_date);
CREATE INDEX idx_challenges_end_date ON challenges(end_date);

-- Índices para tabela user_challenges
CREATE INDEX idx_user_challenges_user_id ON user_challenges(user_id);
CREATE INDEX idx_user_challenges_challenge_id ON user_challenges(challenge_id);
CREATE INDEX idx_user_challenges_completed ON user_challenges(completed);

-- Índices para tabela coupons
CREATE INDEX idx_coupons_code ON coupons(code);
CREATE INDEX idx_coupons_is_active ON coupons(is_active);
CREATE INDEX idx_coupons_valid_from ON coupons(valid_from);
CREATE INDEX idx_coupons_valid_until ON coupons(valid_until);

-- Índices para tabela user_coupons
CREATE INDEX idx_user_coupons_user_id ON user_coupons(user_id);
CREATE INDEX idx_user_coupons_coupon_id ON user_coupons(coupon_id);

-- Índices para tabela points_history
CREATE INDEX idx_points_history_user_id ON points_history(user_id);
CREATE INDEX idx_points_history_type ON points_history(type);
CREATE INDEX idx_points_history_created_at ON points_history(created_at);
CREATE INDEX idx_points_history_expires_at ON points_history(expires_at);

-- Índices para tabela reviews
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_order_id ON reviews(order_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_created_at ON reviews(created_at);

-- Índices para tabela notifications
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);