#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setupSupabase() {
  console.log('🚀 Configuração do Supabase para JC Pastelaria Gourmet\n');
  
  console.log('Para configurar o Supabase, você precisa:');
  console.log('1. Criar um projeto em https://supabase.com');
  console.log('2. Obter as credenciais do projeto');
  console.log('3. Executar as migrações do banco de dados\n');

  const hasProject = await question('Você já criou um projeto no Supabase? (s/n): ');
  
  if (hasProject.toLowerCase() !== 's') {
    console.log('\n📋 Passos para criar o projeto:');
    console.log('1. Acesse https://supabase.com');
    console.log('2. Clique em "Start your project"');
    console.log('3. Crie um novo projeto com o nome "jc-pastelaria-gourmet"');
    console.log('4. Escolha a região "South America (São Paulo)"');
    console.log('5. Aguarde a criação do projeto\n');
    
    await question('Pressione Enter quando o projeto estiver criado...');
  }

  console.log('\n🔑 Agora vamos configurar as credenciais:');
  console.log('Vá para Settings → API no seu projeto Supabase\n');

  const supabaseUrl = await question('Cole a Project URL: ');
  const supabaseAnonKey = await question('Cole a anon public key: ');
  const supabaseServiceKey = await question('Cole a service_role key (opcional): ');

  // Validate URL
  if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('.supabase.co')) {
    console.log('❌ URL inválida. Deve ser algo como: https://[projeto].supabase.co');
    process.exit(1);
  }

  // Validate anon key
  if (!supabaseAnonKey.startsWith('eyJ')) {
    console.log('❌ Chave anon inválida. Deve começar com "eyJ"');
    process.exit(1);
  }

  // Create .env.local file
  const envContent = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseAnonKey}
${supabaseServiceKey ? `SUPABASE_SERVICE_ROLE_KEY=${supabaseServiceKey}` : '# SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key'}

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
`;

  fs.writeFileSync('.env.local', envContent);
  console.log('✅ Arquivo .env.local criado com sucesso!');

  console.log('\n📊 Agora vamos configurar o banco de dados:');
  const setupDatabase = await question('Deseja executar as migrações automaticamente? (s/n): ');

  if (setupDatabase.toLowerCase() === 's') {
    console.log('\n🔄 Executando migrações...');
    console.log('Você pode fazer isso de duas formas:\n');
    
    console.log('OPÇÃO 1 - Supabase CLI (Recomendado):');
    console.log('npm install -g supabase');
    console.log('supabase login');
    console.log('supabase link --project-ref [seu-project-id]');
    console.log('supabase db reset\n');
    
    console.log('OPÇÃO 2 - SQL Editor:');
    console.log('1. Vá para SQL Editor no dashboard do Supabase');
    console.log('2. Execute os arquivos na pasta supabase/migrations/ na ordem:');
    console.log('   - 001_create_enums.sql');
    console.log('   - 002_create_main_tables.sql');
    console.log('   - 003_create_gamification_tables.sql');
    console.log('   - 006_create_rls_policies.sql');
    console.log('   - 007_create_triggers.sql');
    console.log('   - 008_insert_initial_data.sql\n');
  }

  console.log('🎉 Configuração concluída!');
  console.log('\nPróximos passos:');
  console.log('1. Execute: npm run dev');
  console.log('2. Acesse: http://localhost:3000/test-supabase');
  console.log('3. Verifique se a conexão está funcionando');
  console.log('4. Teste o catálogo: http://localhost:3000/test-catalog');
  console.log('\nPara deploy na Vercel:');
  console.log('1. Configure as mesmas variáveis de ambiente na Vercel');
  console.log('2. Execute: vercel --prod');
  
  rl.close();
}

setupSupabase().catch(console.error);