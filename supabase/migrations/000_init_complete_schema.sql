-- =============================================
-- JC Pastelaria Gourmet - Schema Completo
-- Executa todas as migrações em ordem
-- =============================================

-- 1. Criar tipos enumerados
\i 001_create_enums.sql

-- 2. Criar tabelas principais
\i 002_create_main_tables.sql

-- 3. Criar tabelas de gamificação
\i 003_create_gamification_tables.sql

-- 4. Criar tabelas de suporte
\i 004_create_support_tables.sql

-- 5. Criar índices para performance
\i 005_create_indexes.sql

-- 6. Configurar Row Level Security
\i 006_create_rls_policies.sql

-- 7. Criar triggers e funções
\i 007_create_triggers.sql

-- 8. Inserir dados iniciais
\i 008_insert_initial_data.sql

-- =============================================
-- Verificação final do schema
-- =============================================

-- Verificar se todas as tabelas foram criadas
DO $$
DECLARE
    table_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO table_count
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE';
    
    RAISE NOTICE 'Total de tabelas criadas: %', table_count;
    
    -- Verificar tabelas específicas
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
        RAISE EXCEPTION 'Tabela users não foi criada';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'products') THEN
        RAISE EXCEPTION 'Tabela products não foi criada';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'orders') THEN
        RAISE EXCEPTION 'Tabela orders não foi criada';
    END IF;
    
    RAISE NOTICE 'Schema criado com sucesso!';
END
$$;