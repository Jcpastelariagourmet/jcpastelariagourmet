-- =============================================
-- JC Pastelaria Gourmet - Script de Migração Completa
-- =============================================

-- INSTRUÇÕES:
-- 1. Execute este script no SQL Editor do Supabase Dashboard
-- 2. Ou use o Supabase CLI: supabase db reset
-- 3. Ou execute os arquivos individuais na pasta migrations/ em ordem

-- NOTA: Este é um script consolidado de todas as migrações
-- Para desenvolvimento, prefira usar os arquivos individuais

-- =============================================
-- VERIFICAR SE JÁ EXISTE SCHEMA
-- =============================================

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users' AND table_schema = 'public') THEN
        RAISE NOTICE 'Schema já existe. Execute DROP SCHEMA public CASCADE; CREATE SCHEMA public; antes de continuar.';
        RAISE EXCEPTION 'Schema já existe';
    END IF;
END $$;

-- =============================================
-- EXECUTAR MIGRAÇÕES
-- =============================================

-- Para executar as migrações completas, use um dos métodos abaixo:

-- MÉTODO 1: Supabase CLI (Recomendado)
-- supabase db reset

-- MÉTODO 2: Arquivos individuais no SQL Editor
-- Execute os arquivos na seguinte ordem:
-- 1. 001_create_enums.sql
-- 2. 002_create_main_tables.sql  
-- 3. 003_create_gamification_tables.sql
-- 4. 004_create_support_tables.sql
-- 5. 005_create_indexes.sql
-- 6. 006_create_rls_policies.sql
-- 7. 007_create_triggers.sql
-- 8. 008_insert_initial_data.sql
-- 9. 999_verify_schema.sql (opcional - para verificação)

-- MÉTODO 3: Script consolidado (não recomendado para produção)
-- Descomente as linhas abaixo para executar tudo de uma vez:

/*
\i 001_create_enums.sql
\i 002_create_main_tables.sql
\i 003_create_gamification_tables.sql
\i 004_create_support_tables.sql
\i 005_create_indexes.sql
\i 006_create_rls_policies.sql
\i 007_create_triggers.sql
\i 008_insert_initial_data.sql
*/

SELECT 'Para executar as migrações, siga as instruções nos comentários acima.' as instrucoes;