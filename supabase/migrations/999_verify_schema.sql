-- =============================================
-- JC Pastelaria Gourmet - Verificação do Schema
-- =============================================

-- Função para verificar se o schema foi criado corretamente
CREATE OR REPLACE FUNCTION verify_schema()
RETURNS TABLE(
  check_name TEXT,
  status TEXT,
  details TEXT
) AS $$
BEGIN
  -- Verificar tipos enumerados
  RETURN QUERY
  SELECT 
    'Enum Types'::TEXT,
    CASE WHEN COUNT(*) >= 10 THEN 'PASS' ELSE 'FAIL' END::TEXT,
    'Found ' || COUNT(*)::TEXT || ' enum types'::TEXT
  FROM pg_type 
  WHERE typtype = 'e' AND typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public');

  -- Verificar tabelas principais
  RETURN QUERY
  SELECT 
    'Main Tables'::TEXT,
    CASE WHEN COUNT(*) >= 20 THEN 'PASS' ELSE 'FAIL' END::TEXT,
    'Found ' || COUNT(*)::TEXT || ' tables'::TEXT
  FROM information_schema.tables 
  WHERE table_schema = 'public' AND table_type = 'BASE TABLE';

  -- Verificar RLS habilitado
  RETURN QUERY
  SELECT 
    'RLS Policies'::TEXT,
    CASE WHEN COUNT(*) >= 10 THEN 'PASS' ELSE 'FAIL' END::TEXT,
    'Found ' || COUNT(*)::TEXT || ' tables with RLS enabled'::TEXT
  FROM pg_tables 
  WHERE schemaname = 'public' AND rowsecurity = true;

  -- Verificar índices
  RETURN QUERY
  SELECT 
    'Indexes'::TEXT,
    CASE WHEN COUNT(*) >= 30 THEN 'PASS' ELSE 'FAIL' END::TEXT,
    'Found ' || COUNT(*)::TEXT || ' indexes'::TEXT
  FROM pg_indexes 
  WHERE schemaname = 'public';

  -- Verificar triggers
  RETURN QUERY
  SELECT 
    'Triggers'::TEXT,
    CASE WHEN COUNT(*) >= 5 THEN 'PASS' ELSE 'FAIL' END::TEXT,
    'Found ' || COUNT(*)::TEXT || ' triggers'::TEXT
  FROM information_schema.triggers 
  WHERE trigger_schema = 'public';

  -- Verificar dados iniciais - categorias
  RETURN QUERY
  SELECT 
    'Initial Data - Categories'::TEXT,
    CASE WHEN COUNT(*) >= 5 THEN 'PASS' ELSE 'FAIL' END::TEXT,
    'Found ' || COUNT(*)::TEXT || ' categories'::TEXT
  FROM categories;

  -- Verificar dados iniciais - produtos
  RETURN QUERY
  SELECT 
    'Initial Data - Products'::TEXT,
    CASE WHEN COUNT(*) >= 5 THEN 'PASS' ELSE 'FAIL' END::TEXT,
    'Found ' || COUNT(*)::TEXT || ' products'::TEXT
  FROM products;

  -- Verificar dados iniciais - conquistas
  RETURN QUERY
  SELECT 
    'Initial Data - Achievements'::TEXT,
    CASE WHEN COUNT(*) >= 5 THEN 'PASS' ELSE 'FAIL' END::TEXT,
    'Found ' || COUNT(*)::TEXT || ' achievements'::TEXT
  FROM achievements;

  -- Verificar dados iniciais - desafios
  RETURN QUERY
  SELECT 
    'Initial Data - Challenges'::TEXT,
    CASE WHEN COUNT(*) >= 3 THEN 'PASS' ELSE 'FAIL' END::TEXT,
    'Found ' || COUNT(*)::TEXT || ' challenges'::TEXT
  FROM challenges;

  -- Verificar dados iniciais - cupons
  RETURN QUERY
  SELECT 
    'Initial Data - Coupons'::TEXT,
    CASE WHEN COUNT(*) >= 3 THEN 'PASS' ELSE 'FAIL' END::TEXT,
    'Found ' || COUNT(*)::TEXT || ' coupons'::TEXT
  FROM coupons;

  -- Verificar configurações do sistema
  RETURN QUERY
  SELECT 
    'System Settings'::TEXT,
    CASE WHEN COUNT(*) >= 5 THEN 'PASS' ELSE 'FAIL' END::TEXT,
    'Found ' || COUNT(*)::TEXT || ' system settings'::TEXT
  FROM system_settings;

END;
$$ LANGUAGE plpgsql;

-- Executar verificação
SELECT * FROM verify_schema();

-- Verificação adicional de integridade referencial
DO $$
DECLARE
    violation_count INTEGER;
BEGIN
    -- Verificar se todos os produtos têm categoria válida
    SELECT COUNT(*) INTO violation_count
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE c.id IS NULL;
    
    IF violation_count > 0 THEN
        RAISE WARNING 'Found % products without valid category', violation_count;
    ELSE
        RAISE NOTICE 'All products have valid categories';
    END IF;
    
    -- Verificar se todos os tamanhos têm produto válido
    SELECT COUNT(*) INTO violation_count
    FROM product_sizes ps
    LEFT JOIN products p ON ps.product_id = p.id
    WHERE p.id IS NULL;
    
    IF violation_count > 0 THEN
        RAISE WARNING 'Found % product sizes without valid product', violation_count;
    ELSE
        RAISE NOTICE 'All product sizes have valid products';
    END IF;
    
    -- Verificar se todas as customizações têm produto válido
    SELECT COUNT(*) INTO violation_count
    FROM product_customizations pc
    LEFT JOIN products p ON pc.product_id = p.id
    WHERE p.id IS NULL;
    
    IF violation_count > 0 THEN
        RAISE WARNING 'Found % customizations without valid product', violation_count;
    ELSE
        RAISE NOTICE 'All customizations have valid products';
    END IF;
    
    RAISE NOTICE 'Schema integrity verification completed';
END;
$$;

-- Limpar função de verificação
DROP FUNCTION verify_schema();