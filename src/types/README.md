# Sistema de Tipos TypeScript - JC Pastelaria Gourmet

Este diretório contém todos os tipos TypeScript para o projeto JC Pastelaria Gourmet, organizados de forma modular e reutilizável.

## 📁 Estrutura dos Arquivos

### `supabase.ts`
- **Descrição**: Tipos auto-gerados a partir do schema do Supabase
- **Conteúdo**: Definições de tabelas, enums e tipos de inserção/atualização
- **Regeneração**: Execute `npm run db:generate` quando o schema mudar

### `database.ts`
- **Descrição**: Tipos aprimorados com relacionamentos e campos computados
- **Conteúdo**: Interfaces estendidas para entidades do banco de dados
- **Uso**: Tipos para lógica de negócio e componentes

### `components.ts`
- **Descrição**: Tipos específicos para componentes React
- **Conteúdo**: Props de componentes, interfaces de UI, tipos de eventos
- **Uso**: Desenvolvimento de componentes tipados

### `forms.ts`
- **Descrição**: Tipos para formulários e validação
- **Conteúdo**: Dados de formulário, regras de validação, estados de form
- **Uso**: Formulários tipados e validação

### `store.ts`
- **Descrição**: Tipos para gerenciamento de estado (Zustand)
- **Conteúdo**: Estados de store, ações, configurações
- **Uso**: Stores tipados e gerenciamento de estado

### `api.ts`
- **Descrição**: Tipos para APIs e serviços externos
- **Conteúdo**: Endpoints, requests/responses, integrações (Stripe, email, etc.)
- **Uso**: Chamadas de API tipadas

### `utils.ts`
- **Descrição**: Tipos utilitários e helpers
- **Conteúdo**: Tipos genéricos, guards, assertions, padrões comuns
- **Uso**: Utilitários de tipos reutilizáveis

### `index.ts`
- **Descrição**: Arquivo principal de exportação
- **Conteúdo**: Re-exporta todos os tipos de forma organizada
- **Uso**: Importação centralizada de tipos

## 🚀 Como Usar

### Importação Básica
```typescript
import { User, Product, CartItem, AuthStore } from '@/types'
```

### Importação Específica
```typescript
import { ButtonProps, ModalProps } from '@/types/components'
import { LoginFormData, ValidationRule } from '@/types/forms'
import { Tables, Enums } from '@/types/supabase'
```

### Uso em Componentes
```typescript
import { ProductCardProps } from '@/types'

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onQuickView 
}) => {
  // Componente totalmente tipado
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <button onClick={() => onAddToCart(product, options)}>
        Adicionar ao Carrinho
      </button>
    </div>
  )
}
```

### Uso em Stores (Zustand)
```typescript
import { create } from 'zustand'
import { AuthStore } from '@/types'

const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  signIn: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      // Lógica de login tipada
      const user = await authService.signIn(email, password)
      set({ user, isAuthenticated: true, isLoading: false })
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  },
  
  // Outras ações...
}))
```

### Uso em APIs
```typescript
import { ApiResponse, CreateOrderRequest, Order } from '@/types'

const createOrder = async (
  data: CreateOrderRequest
): Promise<ApiResponse<Order>> => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  
  return response.json()
}
```

### Uso com Supabase
```typescript
import { supabase, db, User, Product } from '@/lib/supabase'

// Buscar usuários tipado
const getUsers = async (): Promise<User[]> => {
  const { data, error } = await db.users()
    .select('*')
    .eq('is_active', true)
  
  if (error) throw error
  return data || []
}

// Inserir produto tipado
const createProduct = async (product: TablesInsert<'products'>) => {
  const { data, error } = await db.products()
    .insert(product)
    .select()
    .single()
  
  if (error) throw error
  return data
}
```

### Uso em Formulários
```typescript
import { useForm } from 'react-hook-form'
import { LoginFormData, ValidationPatterns } from '@/types'

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>()
  
  const onSubmit = (data: LoginFormData) => {
    // Dados do formulário tipados
    console.log(data.email, data.password)
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: 'Email é obrigatório',
          pattern: {
            value: ValidationPatterns.email,
            message: 'Email inválido'
          }
        })}
        type="email"
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input
        {...register('password', {
          required: 'Senha é obrigatória',
          minLength: {
            value: 8,
            message: 'Senha deve ter pelo menos 8 caracteres'
          }
        })}
        type="password"
        placeholder="Senha"
      />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">Entrar</button>
    </form>
  )
}
```

## 🛠️ Scripts Disponíveis

### Gerar Tipos do Supabase
```bash
npm run db:generate
```
Gera tipos TypeScript a partir do schema do Supabase.

### Validar Tipos
```bash
node scripts/validate-types.js
```
Valida todos os tipos e gera relatório de cobertura.

### Verificar Tipos
```bash
npm run type-check
```
Executa verificação de tipos TypeScript em todo o projeto.

## 📊 Estatísticas do Sistema de Tipos

- **Arquivos**: 8 arquivos de tipos
- **Linhas de código**: 4.162+ linhas
- **Tipos exportados**: 465+ tipos
  - **Interfaces**: 292
  - **Type aliases**: 173
  - **Enums**: 10 (via Supabase)

## 🔧 Configuração

### Variáveis de Ambiente
```env
NEXT_PUBLIC_SUPABASE_URL=sua-url-do-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
SUPABASE_PROJECT_ID=seu-project-id
```

### TypeScript Config
Certifique-se de que o `tsconfig.json` inclui:
```json
{
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/types": ["src/types"],
      "@/types/*": ["src/types/*"]
    }
  }
}
```

## 🎯 Benefícios

### ✅ Type Safety
- Detecção de erros em tempo de compilação
- IntelliSense completo no VS Code
- Refatoração segura

### ✅ Produtividade
- Autocompletar inteligente
- Documentação inline
- Navegação de código

### ✅ Manutenibilidade
- Código autodocumentado
- Contratos claros entre módulos
- Evolução segura da API

### ✅ Qualidade
- Menos bugs em produção
- Testes mais confiáveis
- Código mais legível

## 🚨 Troubleshooting

### Erro: "Cannot find module '@/types'"
Verifique se o path mapping está configurado no `tsconfig.json`.

### Erro: "Type 'X' is not assignable to type 'Y'"
Verifique se os tipos estão atualizados executando `npm run db:generate`.

### Erro: "Property 'X' does not exist on type 'Y'"
Pode ser necessário atualizar os tipos ou verificar se a propriedade existe no schema.

### Performance lenta do TypeScript
Execute `npm run type-check` para verificar se há erros de tipos que podem estar causando lentidão.

## 📚 Recursos Adicionais

- [Documentação do TypeScript](https://www.typescriptlang.org/docs/)
- [Documentação do Supabase](https://supabase.com/docs)
- [Zustand com TypeScript](https://github.com/pmndrs/zustand#typescript)
- [React Hook Form com TypeScript](https://react-hook-form.com/ts)

---

**Desenvolvido para JC Pastelaria Gourmet** 🥟✨