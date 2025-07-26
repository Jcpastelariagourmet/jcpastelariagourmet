import React, { useState } from 'react';
import { 
  Button, 
  Input, 
  Modal, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  Badge,
  StatusBadge,
  LevelBadge,
  Loading,
  PageLoading,
  LoadingOverlay
} from './index';

/**
 * Example component showcasing all design system components
 * This is for development and testing purposes
 */
export const DesignSystemExamples: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.length < 3) {
      setInputError('Mínimo 3 caracteres');
    } else {
      setInputError('');
    }
  };

  const handleLoadingTest = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        JC Pastelaria Gourmet - Design System
      </h1>

      {/* Buttons */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          
          <div className="flex gap-4 items-center">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          
          <div className="flex gap-4 items-center">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
      </section>

      {/* Inputs */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Inputs</h2>
        <div className="space-y-4 max-w-md">
          <Input 
            label="Nome completo" 
            placeholder="Digite seu nome"
            required
          />
          
          <Input 
            label="Email" 
            type="email"
            placeholder="seu@email.com"
            helper="Usaremos para enviar atualizações do pedido"
          />
          
          <Input 
            label="Teste com erro"
            value={inputValue}
            onChange={handleInputChange}
            error={inputError}
            placeholder="Digite pelo menos 3 caracteres"
          />
          
          <Input 
            label="Campo desabilitado"
            disabled
            value="Campo desabilitado"
          />
        </div>
      </section>

      {/* Cards */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Card Padrão</CardTitle>
              <CardDescription>
                Este é um card básico com header e conteúdo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Conteúdo do card aqui...</p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Ação</Button>
            </CardFooter>
          </Card>

          <Card variant="elevated" hover>
            <CardHeader>
              <CardTitle>Card Elevado</CardTitle>
              <CardDescription>
                Card com sombra e efeito hover
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Passe o mouse sobre este card</p>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardHeader>
              <CardTitle>Card Outlined</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Card com borda destacada</p>
            </CardContent>
          </Card>

          <Card variant="ghost" padding="lg">
            <CardContent>
              <p>Card ghost com padding grande</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Badges */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Badges</h2>
        <div className="space-y-4">
          <div className="flex gap-2 items-center flex-wrap">
            <Badge>Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>
          
          <div className="flex gap-2 items-center">
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
          </div>
          
          <div className="flex gap-2 items-center flex-wrap">
            <StatusBadge status="pending" />
            <StatusBadge status="confirmed" />
            <StatusBadge status="preparing" />
            <StatusBadge status="ready" />
            <StatusBadge status="delivered" />
            <StatusBadge status="cancelled" />
          </div>
          
          <div className="flex gap-2 items-center">
            <LevelBadge level="bronze" />
            <LevelBadge level="silver" />
            <LevelBadge level="gold" />
            <LevelBadge level="diamond" />
          </div>
        </div>
      </section>

      {/* Loading */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Loading</h2>
        <div className="space-y-4">
          <div className="flex gap-8 items-center">
            <Loading size="sm" text="Small" />
            <Loading size="md" text="Medium" />
            <Loading size="lg" text="Large" />
            <Loading size="xl" text="Extra Large" />
          </div>
          
          <div className="flex gap-8 items-center">
            <Loading variant="spinner" text="Spinner" />
            <Loading variant="dots" text="Dots" />
            <Loading variant="pulse" text="Pulse" />
          </div>
          
          <div className="flex gap-4">
            <Button onClick={handleLoadingTest}>
              Testar Loading Overlay
            </Button>
          </div>
          
          <LoadingOverlay isLoading={isLoading} text="Carregando dados...">
            <Card>
              <CardContent>
                <p>Este conteúdo fica coberto pelo loading overlay quando ativo.</p>
                <p>Clique no botão acima para testar.</p>
              </CardContent>
            </Card>
          </LoadingOverlay>
        </div>
      </section>

      {/* Modal */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Modal</h2>
        <div className="space-y-4">
          <Button onClick={() => setIsModalOpen(true)}>
            Abrir Modal
          </Button>
          
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Modal de Exemplo"
            size="md"
          >
            <div className="space-y-4">
              <p>Este é um modal de exemplo do design system.</p>
              
              <Input 
                label="Campo no modal"
                placeholder="Digite algo..."
              />
              
              <div className="flex gap-2">
                <Badge variant="success">Modal ativo</Badge>
                <Badge variant="info">Exemplo</Badge>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>
                  Confirmar
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </section>
    </div>
  );
};