'use client';

import { useState } from 'react';
import { 
  MainLayout, 
  Container, 
  GridContainer, 
  FlexContainer, 
  Section,
  PageContainer,
  BREADCRUMB_CONFIGS 
} from '@/components/layout';
import { Button, Card, Badge } from '@/components/ui';

// Mock user data for testing
const mockUser = {
  id: '1',
  name: 'João Silva',
  email: 'joao@example.com',
  points: 1250,
  level: 'silver' as const,
  total_spent: 150.00,
  orders_count: 8,
  created_at: '2024-01-15T10:00:00Z',
  updated_at: '2024-01-20T15:30:00Z',
  avatar_url: null,
  phone: '(11) 99999-9999',
  preferences: {},
  is_active: true,
  email_verified: true,
  phone_verified: false
};

export default function LayoutTestPage() {
  const [user, setUser] = useState<typeof mockUser | null>(mockUser);
  const [cartCount, setCartCount] = useState(3);
  const [notifications, setNotifications] = useState(2);

  const breadcrumbItems = BREADCRUMB_CONFIGS.product('Pastel de Carne', 'Pastéis Salgados');

  return (
    <MainLayout
      user={user}
      cartItemsCount={cartCount}
      unreadNotifications={notifications}
      breadcrumbItems={breadcrumbItems}
      onCartToggle={() => console.log('Cart toggled')}
      onAuthToggle={() => console.log('Auth toggled')}
      onProfileClick={() => console.log('Profile clicked')}
      onNotificationsClick={() => console.log('Notifications clicked')}
    >
      <Container size="xl" padding="md" className="py-8">
        <div className="space-y-8">
          {/* Page Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Sistema de Layout - Teste
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Esta página demonstra todos os componentes do sistema de layout da JC Pastelaria Gourmet.
            </p>
          </div>

          {/* Container Examples */}
          <Section background="gray" padding="lg">
            <h2 className="text-2xl font-semibold mb-6">Containers</h2>
            
            {/* Grid Container */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Grid Container</h3>
              <GridContainer cols={3} gap="md" responsive={{ sm: 1, md: 2, lg: 3 }}>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Card 1</h4>
                  <p className="text-sm text-gray-600">Conteúdo do primeiro card</p>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Card 2</h4>
                  <p className="text-sm text-gray-600">Conteúdo do segundo card</p>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Card 3</h4>
                  <p className="text-sm text-gray-600">Conteúdo do terceiro card</p>
                </Card>
              </GridContainer>
            </div>

            {/* Flex Container */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Flex Container</h3>
              <FlexContainer justify="between" align="center" className="bg-white p-4 rounded-lg">
                <div>
                  <h4 className="font-medium">Título</h4>
                  <p className="text-sm text-gray-600">Descrição</p>
                </div>
                <FlexContainer gap="sm">
                  <Badge variant="primary">Novo</Badge>
                  <Button size="sm">Ação</Button>
                </FlexContainer>
              </FlexContainer>
            </div>
          </Section>

          {/* User Info Display */}
          {user && (
            <Section background="primary" padding="md">
              <h2 className="text-2xl font-semibold mb-6">Informações do Usuário</h2>
              <Card className="p-6">
                <FlexContainer align="center" gap="md">
                  <div className="h-16 w-16 rounded-full bg-primary text-white text-xl flex items-center justify-center font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    <FlexContainer gap="sm" className="mt-2">
                      <Badge variant="primary">{user.points} pontos</Badge>
                      <Badge variant="secondary" className="capitalize">{user.level}</Badge>
                      <Badge variant="info">{user.orders_count} pedidos</Badge>
                    </FlexContainer>
                  </div>
                </FlexContainer>
              </Card>
            </Section>
          )}

          {/* Interactive Elements */}
          <Section padding="md">
            <h2 className="text-2xl font-semibold mb-6">Elementos Interativos</h2>
            <GridContainer cols={2} gap="md" responsive={{ sm: 1, lg: 2 }}>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Carrinho</h3>
                <FlexContainer justify="between" align="center" className="mb-4">
                  <span>Itens no carrinho:</span>
                  <Badge variant="primary">{cartCount}</Badge>
                </FlexContainer>
                <FlexContainer gap="sm">
                  <Button 
                    size="sm" 
                    onClick={() => setCartCount(cartCount + 1)}
                  >
                    Adicionar Item
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setCartCount(Math.max(0, cartCount - 1))}
                  >
                    Remover Item
                  </Button>
                </FlexContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Notificações</h3>
                <FlexContainer justify="between" align="center" className="mb-4">
                  <span>Não lidas:</span>
                  <Badge variant="error">{notifications}</Badge>
                </FlexContainer>
                <FlexContainer gap="sm">
                  <Button 
                    size="sm" 
                    onClick={() => setNotifications(notifications + 1)}
                  >
                    Nova Notificação
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setNotifications(Math.max(0, notifications - 1))}
                  >
                    Marcar como Lida
                  </Button>
                </FlexContainer>
              </Card>
            </GridContainer>
          </Section>

          {/* Layout Actions */}
          <Section background="gray" padding="md">
            <h2 className="text-2xl font-semibold mb-6">Ações do Layout</h2>
            <FlexContainer gap="md" wrap="wrap">
              <Button onClick={() => setUser(user ? null : mockUser)}>
                {user ? 'Fazer Logout' : 'Fazer Login'}
              </Button>
              <Button variant="outline" onClick={() => console.log('Abrir carrinho')}>
                Abrir Carrinho ({cartCount})
              </Button>
              <Button variant="outline" onClick={() => console.log('Abrir notificações')}>
                Notificações ({notifications})
              </Button>
              <Button variant="secondary" onClick={() => console.log('Abrir perfil')}>
                Meu Perfil
              </Button>
            </FlexContainer>
          </Section>

          {/* Responsive Test */}
          <Section padding="md">
            <h2 className="text-2xl font-semibold mb-6">Teste Responsivo</h2>
            <p className="text-gray-600 mb-4">
              Redimensione a janela para testar a responsividade dos componentes.
            </p>
            <GridContainer 
              cols={4} 
              gap="md" 
              responsive={{ sm: 1, md: 2, lg: 3, xl: 4 }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <Card key={num} className="p-4 text-center">
                  <div className="h-20 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                    <span className="text-2xl font-bold text-primary">{num}</span>
                  </div>
                  <p className="text-sm text-gray-600">Item {num}</p>
                </Card>
              ))}
            </GridContainer>
          </Section>
        </div>
      </Container>
    </MainLayout>
  );
}