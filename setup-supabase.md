# Configuração do Supabase para JC Pastelaria Gourmet

## 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Crie uma nova organização ou use uma existente
4. Clique em "New Project"
5. Preencha:
   - **Name**: `jc-pastelaria-gourmet`
   - **Database Password**: Crie uma senha forte
   - **Region**: `South America (São Paulo)` ou mais próximo
6. Clique em "Create new project"

## 2. Obter Credenciais

Após o projeto ser criado:

1. Vá para **Settings** → **API**
2. Copie as seguintes informações:
   - **Project URL**: `https://[seu-projeto].supabase.co`
   - **anon public key**: `eyJ...` (chave pública)
   - **service_role key**: `eyJ...` (chave privada - cuidado!)

## 3. Configurar Variáveis de Ambiente

Edite o arquivo `.env.local` com suas credenciais reais:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://[seu-projeto].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ[sua-chave-publica]
SUPABASE_SERVICE_ROLE_KEY=eyJ[sua-chave-privada]

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="JC Pastelaria Gourmet"

# Development
NODE_ENV=development

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=development-secret-key-change-in-production

# JWT Secret
JWT_SECRET=development-jwt-secret-change-in-production
```

## 4. Executar Migrações

### Opção A: Supabase CLI (Recomendado)

1. Instale o Supabase CLI:
```bash
npm install -g supabase
```

2. Faça login:
```bash
supabase login
```

3. Link com seu projeto:
```bash
supabase link --project-ref [seu-project-id]
```

4. Execute as migrações:
```bash
supabase db reset
```

### Opção B: SQL Editor

1. Vá para **SQL Editor** no dashboard do Supabase
2. Execute os arquivos na ordem:
   - `supabase/migrations/001_create_enums.sql`
   - `supabase/migrations/002_create_main_tables.sql`
   - `supabase/migrations/003_create_gamification_tables.sql`
   - `supabase/migrations/006_create_rls_policies.sql`
   - `supabase/migrations/007_create_triggers.sql`
   - `supabase/migrations/008_insert_initial_data.sql`

## 5. Configurar Storage (Opcional)

Para imagens de produtos:

1. Vá para **Storage** no dashboard
2. Crie um bucket chamado `products`
3. Configure as políticas de acesso:
   - **SELECT**: Público (para visualizar imagens)
   - **INSERT/UPDATE/DELETE**: Apenas usuários autenticados

## 6. Verificar Configuração

Execute o projeto:
```bash
npm run dev
```

Acesse: `http://localhost:3000/test-catalog`

Se tudo estiver configurado corretamente, você verá os dados reais do Supabase.

## 7. Deploy na Vercel

### Configurar Variáveis de Ambiente na Vercel

1. Acesse seu projeto na Vercel
2. Vá para **Settings** → **Environment Variables**
3. Adicione as mesmas variáveis do `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXTAUTH_URL` (URL do seu domínio na Vercel)
   - `NEXTAUTH_SECRET` (gere uma nova chave para produção)
   - `JWT_SECRET` (gere uma nova chave para produção)

### Deploy

```bash
# Se ainda não fez o deploy inicial
vercel

# Para deploys subsequentes
vercel --prod
```

## 8. Configurações de Produção

### Supabase

1. **Authentication** → **Settings**:
   - Adicione seu domínio da Vercel em **Site URL**
   - Configure **Redirect URLs** se necessário

2. **Database** → **Settings**:
   - Configure backup automático
   - Monitore uso e performance

### Vercel

1. Configure domínio customizado se necessário
2. Configure analytics
3. Configure monitoring

## Troubleshooting

### Erro: "Invalid API key"
- Verifique se as chaves estão corretas
- Certifique-se de que não há espaços extras

### Erro: "Database connection failed"
- Verifique se o projeto Supabase está ativo
- Confirme se as migrações foram executadas

### Erro: "RLS policy violation"
- Verifique se as políticas RLS foram criadas
- Confirme se o usuário tem permissões adequadas

### Dados não aparecem
- Verifique se os dados iniciais foram inseridos
- Confirme se as tabelas foram criadas corretamente