# JC Pastelaria Gourmet - Database Schema

Este diretório contém todas as migrações do banco de dados para o sistema JC Pastelaria Gourmet.

## Estrutura das Migrações

### 001_create_enums.sql
Cria todos os tipos enumerados utilizados no sistema:
- `user_level`: Níveis de fidelidade (bronze, silver, gold, diamond)
- `order_status`: Status dos pedidos
- `payment_status`: Status dos pagamentos
- `delivery_type`: Tipos de entrega
- `customization_type`: Tipos de customização
- `achievement_type`: Tipos de conquistas
- `challenge_type`: Tipos de desafios
- `coupon_type`: Tipos de cupons
- `notification_type`: Tipos de notificações
- `points_type`: Tipos de movimentação de pontos

### 002_create_main_tables.sql
Cria as tabelas principais do sistema:
- `users`: Perfis dos usuários
- `categories`: Categorias de produtos
- `products`: Produtos disponíveis
- `product_sizes`: Tamanhos dos produtos
- `product_customizations`: Customizações disponíveis
- `customization_options`: Opções de customização
- `addresses`: Endereços dos usuários
- `orders`: Pedidos realizados
- `order_items`: Itens dos pedidos

### 003_create_gamification_tables.sql
Cria as tabelas do sistema de gamificação:
- `achievements`: Conquistas disponíveis
- `user_achievements`: Conquistas dos usuários
- `challenges`: Desafios disponíveis
- `user_challenges`: Participação em desafios
- `coupons`: Cupons de desconto
- `user_coupons`: Cupons dos usuários
- `points_history`: Histórico de pontos

### 004_create_support_tables.sql
Cria tabelas de suporte:
- `reviews`: Avaliações de produtos
- `notifications`: Notificações dos usuários
- `system_settings`: Configurações do sistema

### 005_create_indexes.sql
Cria índices para otimização de performance em campos frequentemente consultados.

### 006_create_rls_policies.sql
Configura Row Level Security (RLS) para controle de acesso aos dados.

### 007_create_triggers.sql
Cria triggers e funções para:
- Atualização automática de timestamps
- Criação automática de usuário após signup
- Atualização de estatísticas de produtos
- Atualização de estatísticas de usuários
- Controle de níveis de fidelidade
- Controle de endereços padrão

### 008_insert_initial_data.sql
Insere dados iniciais:
- Categorias de produtos
- Produtos base
- Tamanhos e customizações
- Conquistas iniciais
- Desafios iniciais
- Cupons iniciais
- Configurações do sistema

## Como Executar

### Opção 1: Supabase CLI
```bash
# Executar todas as migrações
supabase db reset

# Ou executar migrações específicas
supabase db push
```

### Opção 2: SQL Editor do Supabase
1. Acesse o painel do Supabase
2. Vá para SQL Editor
3. Execute os arquivos na ordem numerada (001, 002, 003, etc.)

### Opção 3: Arquivo Master
Execute o arquivo `000_init_complete_schema.sql` que roda todas as migrações em ordem.

## Verificações Importantes

### Após executar as migrações, verifique:

1. **Tabelas criadas**: 
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public' 
   ORDER BY table_name;
   ```

2. **RLS habilitado**:
   ```sql
   SELECT schemaname, tablename, rowsecurity 
   FROM pg_tables 
   WHERE schemaname = 'public' 
   AND rowsecurity = true;
   ```

3. **Triggers criados**:
   ```sql
   SELECT trigger_name, event_object_table 
   FROM information_schema.triggers 
   WHERE trigger_schema = 'public';
   ```

4. **Dados iniciais inseridos**:
   ```sql
   SELECT 'categories' as table_name, count(*) as records FROM categories
   UNION ALL
   SELECT 'products', count(*) FROM products
   UNION ALL
   SELECT 'achievements', count(*) FROM achievements
   UNION ALL
   SELECT 'challenges', count(*) FROM challenges;
   ```

## Estrutura de Dados

### Relacionamentos Principais

```
users (1) -----> (N) orders
users (1) -----> (N) addresses
users (1) -----> (N) user_achievements
users (1) -----> (N) user_challenges
users (1) -----> (N) points_history

categories (1) -----> (N) products
products (1) -----> (N) product_sizes
products (1) -----> (N) product_customizations
products (1) -----> (N) reviews

orders (1) -----> (N) order_items
orders (N) -----> (1) addresses

achievements (1) -----> (N) user_achievements
challenges (1) -----> (N) user_challenges
coupons (1) -----> (N) user_coupons
```

### Níveis de Fidelidade

| Nível | Pontos Mínimos | Benefícios |
|-------|----------------|------------|
| Bronze | 0 | Nenhum |
| Silver | 1.000 | 5% desconto |
| Gold | 3.000 | 10% desconto + frete grátis |
| Diamond | 8.000 | 15% desconto + frete grátis + acesso antecipado |

### Sistema de Pontos

- **Ganho**: 10 pontos por real gasto
- **Bônus de boas-vindas**: 100 pontos
- **Expiração**: 365 dias
- **Conquistas**: Pontos variáveis por conquista
- **Desafios**: Pontos variáveis por desafio

## Segurança

### Row Level Security (RLS)
- Usuários só podem acessar seus próprios dados
- Produtos e categorias são públicos
- Administradores têm acesso total via service role

### Políticas Implementadas
- `users`: Acesso apenas aos próprios dados
- `orders`: Usuários veem apenas seus pedidos
- `addresses`: Usuários gerenciam apenas seus endereços
- `reviews`: Usuários criam reviews apenas para seus pedidos
- `notifications`: Usuários veem apenas suas notificações

## Manutenção

### Limpeza Periódica
```sql
-- Limpar pontos expirados
DELETE FROM points_history 
WHERE expires_at < NOW() AND expires_at IS NOT NULL;

-- Limpar notificações antigas (mais de 90 dias)
DELETE FROM notifications 
WHERE created_at < NOW() - INTERVAL '90 days' AND read = true;

-- Limpar desafios expirados
UPDATE challenges 
SET is_active = false 
WHERE end_date < NOW() AND is_active = true;
```

### Backup Recomendado
- Backup diário das tabelas principais
- Backup semanal completo
- Retenção de 30 dias para backups diários
- Retenção de 12 meses para backups semanais