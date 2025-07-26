// Constantes da aplicação JC Pastelaria Gourmet

export const APP_CONFIG = {
  name: 'JC Pastelaria Gourmet',
  description: 'Sabores que conquistam',
  version: '1.0.0',
  author: 'JC Pastelaria',
  contact: {
    phone: '(11) 99999-9999',
    email: 'contato@jcpastelaria.com',
    whatsapp: '5511999999999'
  },
  social: {
    instagram: '@jcpastelariagourmet',
    facebook: 'JC Pastelaria Gourmet',
    tiktok: '@jcpastelaria'
  }
};

export const DELIVERY_CONFIG = {
  freeDeliveryMinimum: 30.00,
  deliveryFee: 5.99,
  maxDeliveryDistance: 10, // km
  estimatedDeliveryTime: {
    min: 30,
    max: 60
  },
  workingHours: {
    monday: { open: '08:00', close: '22:00' },
    tuesday: { open: '08:00', close: '22:00' },
    wednesday: { open: '08:00', close: '22:00' },
    thursday: { open: '08:00', close: '22:00' },
    friday: { open: '08:00', close: '23:00' },
    saturday: { open: '08:00', close: '23:00' },
    sunday: { open: '10:00', close: '22:00' }
  }
};

export const GAMIFICATION_CONFIG = {
  pointsPerReal: 10, // 10 pontos por R$ 1,00 gasto
  levels: {
    bronze: { min: 0, max: 999, name: 'Bronze', color: '#CD7F32', benefits: [] },
    silver: { min: 1000, max: 2999, name: 'Prata', color: '#C0C0C0', benefits: ['5% desconto'] },
    gold: { min: 3000, max: 7999, name: 'Ouro', color: '#FFD700', benefits: ['10% desconto', 'Frete grátis'] },
    diamond: { min: 8000, max: Infinity, name: 'Diamante', color: '#B9F2FF', benefits: ['15% desconto', 'Frete grátis', 'Acesso antecipado'] }
  },
  achievements: {
    firstOrder: { points: 100, name: 'Primeira Compra' },
    loyalCustomer: { points: 500, name: 'Cliente Fiel' },
    flavorExplorer: { points: 300, name: 'Explorador de Sabores' },
    earlyBird: { points: 150, name: 'Madrugador' },
    nightOwl: { points: 150, name: 'Coruja' },
    weekendWarrior: { points: 200, name: 'Guerreiro do Fim de Semana' }
  }
};

export const PAYMENT_METHODS = [
  { id: 'pix', name: 'PIX', icon: 'pix', enabled: true },
  { id: 'credit_card', name: 'Cartão de Crédito', icon: 'credit-card', enabled: true },
  { id: 'debit_card', name: 'Cartão de Débito', icon: 'credit-card', enabled: true },
  { id: 'cash', name: 'Dinheiro', icon: 'banknote', enabled: true },
  { id: 'points', name: 'JC Points', icon: 'star', enabled: true }
];

export const ORDER_STATUS = {
  pending: { name: 'Pendente', color: 'yellow', description: 'Aguardando confirmação' },
  confirmed: { name: 'Confirmado', color: 'blue', description: 'Pedido confirmado' },
  preparing: { name: 'Preparando', color: 'orange', description: 'Preparando seu pedido' },
  ready: { name: 'Pronto', color: 'green', description: 'Pronto para retirada/entrega' },
  out_for_delivery: { name: 'Saiu para Entrega', color: 'purple', description: 'A caminho do destino' },
  delivered: { name: 'Entregue', color: 'green', description: 'Pedido entregue' },
  cancelled: { name: 'Cancelado', color: 'red', description: 'Pedido cancelado' }
};

export const PRODUCT_CATEGORIES = [
  { id: 'salgados', name: 'Pastéis Salgados', icon: '🥟', color: '#FFC700' },
  { id: 'doces', name: 'Pastéis Doces', icon: '🍰', color: '#FFB300' },
  { id: 'bebidas', name: 'Bebidas', icon: '🥤', color: '#753700' },
  { id: 'combos', name: 'Combos', icon: '🍽️', color: '#4D1F00' },
  { id: 'sobremesas', name: 'Sobremesas', icon: '🍨', color: '#28A745' }
];

export const DIETARY_RESTRICTIONS = [
  { id: 'vegetarian', name: 'Vegetariano', icon: '🌱' },
  { id: 'vegan', name: 'Vegano', icon: '🌿' },
  { id: 'gluten_free', name: 'Sem Glúten', icon: '🌾' },
  { id: 'lactose_free', name: 'Sem Lactose', icon: '🥛' },
  { id: 'sugar_free', name: 'Sem Açúcar', icon: '🍯' },
  { id: 'low_sodium', name: 'Baixo Sódio', icon: '🧂' }
];

export const NOTIFICATION_TYPES = {
  order_update: { name: 'Atualização de Pedido', icon: 'package', color: 'blue' },
  promotion: { name: 'Promoção', icon: 'tag', color: 'green' },
  achievement: { name: 'Conquista', icon: 'trophy', color: 'gold' },
  challenge: { name: 'Desafio', icon: 'target', color: 'purple' },
  system: { name: 'Sistema', icon: 'bell', color: 'gray' },
  reminder: { name: 'Lembrete', icon: 'clock', color: 'orange' }
};

export const CHALLENGE_TYPES = {
  weekly: { name: 'Semanal', duration: 7, color: 'blue' },
  monthly: { name: 'Mensal', duration: 30, color: 'green' },
  seasonal: { name: 'Sazonal', duration: 90, color: 'orange' },
  special: { name: 'Especial', duration: null, color: 'purple' }
};

export const COUPON_TYPES = {
  percentage: { name: 'Porcentagem', symbol: '%' },
  fixed_amount: { name: 'Valor Fixo', symbol: 'R$' },
  free_delivery: { name: 'Frete Grátis', symbol: '🚚' },
  buy_x_get_y: { name: 'Compre X Leve Y', symbol: '🎁' }
};

export const REGEX_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
  cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  cep: /^\d{5}-\d{3}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
};

export const ERROR_MESSAGES = {
  required: 'Este campo é obrigatório',
  email: 'Digite um email válido',
  phone: 'Digite um telefone válido',
  password: 'A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula e número',
  passwordConfirm: 'As senhas não coincidem',
  cpf: 'Digite um CPF válido',
  cep: 'Digite um CEP válido',
  minLength: (min: number) => `Mínimo de ${min} caracteres`,
  maxLength: (max: number) => `Máximo de ${max} caracteres`,
  min: (min: number) => `Valor mínimo: ${min}`,
  max: (max: number) => `Valor máximo: ${max}`
};

export const SUCCESS_MESSAGES = {
  login: 'Login realizado com sucesso!',
  register: 'Cadastro realizado com sucesso!',
  logout: 'Logout realizado com sucesso!',
  orderPlaced: 'Pedido realizado com sucesso!',
  profileUpdated: 'Perfil atualizado com sucesso!',
  addressSaved: 'Endereço salvo com sucesso!',
  passwordChanged: 'Senha alterada com sucesso!',
  emailVerified: 'Email verificado com sucesso!',
  couponApplied: 'Cupom aplicado com sucesso!',
  achievementUnlocked: 'Conquista desbloqueada!',
  challengeCompleted: 'Desafio concluído!'
};

export const LOADING_MESSAGES = [
  'Preparando seu pedido...',
  'Selecionando os melhores ingredientes...',
  'Aquecendo a fritadeira...',
  'Quase pronto...',
  'Finalizando os detalhes...'
];

export const MASCOT_REACTIONS = {
  welcome: '👋 Olá! Bem-vindo à JC Pastelaria!',
  addToCart: '😋 Ótima escolha! Adicionado ao carrinho!',
  achievement: '🏆 Parabéns! Nova conquista desbloqueada!',
  levelUp: '⭐ Incrível! Você subiu de nível!',
  orderPlaced: '🎉 Pedido confirmado! Já estamos preparando!',
  error: '😅 Ops! Algo deu errado, mas vamos resolver!',
  loading: '⏳ Só um minutinho...',
  empty: '🤔 Que tal experimentar nossos pastéis?'
};

export const THEME_CONFIG = {
  light: {
    name: 'Claro',
    icon: 'sun',
    colors: {
      primary: '#FFC700',
      secondary: '#FFB300',
      accent: '#753700',
      background: '#FFFFFF',
      surface: '#FDECE2',
      text: '#000000'
    }
  },
  dark: {
    name: 'Escuro',
    icon: 'moon',
    colors: {
      primary: '#FFD700',
      secondary: '#4A90E2',
      accent: '#FFD700',
      background: '#1A1A1A',
      surface: '#2D2D2D',
      text: '#FFFFFF'
    }
  }
};