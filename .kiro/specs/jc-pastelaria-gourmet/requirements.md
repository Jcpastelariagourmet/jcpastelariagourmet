# JC Pastelaria Gourmet - Especificação de Requisitos

## Introdução

A JC Pastelaria Gourmet é uma aplicação web completa de delivery de pastéis artesanais com foco em gamificação, programa de fidelidade e experiência do usuário premium. O sistema deve proporcionar uma experiência envolvente que incentive a fidelização através de pontos, níveis, conquistas e desafios, mantendo a qualidade e praticidade de um e-commerce moderno.

## Requisitos Funcionais

### 1. Sistema de Autenticação e Perfil do Usuário

**User Story:** Como um cliente, eu quero criar uma conta e gerenciar meu perfil para ter uma experiência personalizada e acompanhar meu progresso na plataforma.

#### Acceptance Criteria

1. QUANDO um usuário acessa a página de registro ENTÃO o sistema SHALL exibir um formulário com campos obrigatórios: nome, email, senha, telefone (opcional)
2. QUANDO um usuário preenche o formulário de registro corretamente ENTÃO o sistema SHALL criar a conta, enviar email de verificação e redirecionar para onboarding
3. QUANDO um usuário faz login com credenciais válidas ENTÃO o sistema SHALL autenticar o usuário e redirecionar para dashboard personalizado
4. QUANDO um usuário acessa seu perfil ENTÃO o sistema SHALL exibir: dados pessoais, estatísticas de gamificação, histórico de pedidos, endereços salvos, preferências alimentares
5. QUANDO um usuário atualiza informações do perfil ENTÃO o sistema SHALL validar os dados, salvar alterações e exibir confirmação
6. QUANDO um usuário solicita recuperação de senha ENTÃO o sistema SHALL enviar email com link de redefinição válido por 24 horas
7. QUANDO um usuário verifica email através do link ENTÃO o sistema SHALL ativar a conta e liberar funcionalidades completas
8. QUANDO um usuário faz logout ENTÃO o sistema SHALL limpar sessão local e redirecionar para página inicial

### 2. Catálogo de Produtos e Navegação

**User Story:** Como um cliente, eu quero navegar pelo catálogo de produtos de forma intuitiva para encontrar e personalizar os pastéis que desejo.

#### Acceptance Criteria

1. QUANDO um usuário acessa o catálogo ENTÃO o sistema SHALL exibir produtos organizados por categorias: Pastéis Salgados, Pastéis Doces, Bebidas, Combos, Sobremesas
2. QUANDO um usuário seleciona uma categoria ENTÃO o sistema SHALL filtrar produtos e exibir apenas itens da categoria selecionada
3. QUANDO um usuário visualiza um produto ENTÃO o sistema SHALL exibir: imagem, nome, descrição, preço base, avaliações, tempo de preparo, opções de tamanho
4. QUANDO um usuário clica em um produto ENTÃO o sistema SHALL abrir modal/página detalhada com: galeria de imagens, descrição completa, ingredientes, informações nutricionais, customizações disponíveis
5. QUANDO um usuário busca por produtos ENTÃO o sistema SHALL filtrar por nome, descrição, ingredientes e exibir resultados relevantes
6. QUANDO um usuário aplica filtros ENTÃO o sistema SHALL permitir filtrar por: preço, categoria, tempo de preparo, avaliação, restrições alimentares
7. QUANDO um usuário ordena produtos ENTÃO o sistema SHALL permitir ordenar por: popularidade, preço (menor/maior), avaliação, tempo de preparo
8. QUANDO um produto está indisponível ENTÃO o sistema SHALL exibir status "Indisponível" e desabilitar opção de adicionar ao carrinho

### 3. Sistema de Carrinho e Customização

**User Story:** Como um cliente, eu quero adicionar produtos ao carrinho com customizações específicas para montar meu pedido ideal.

#### Acceptance Criteria

1. QUANDO um usuário adiciona produto ao carrinho ENTÃO o sistema SHALL permitir selecionar: tamanho, customizações obrigatórias/opcionais, observações especiais
2. QUANDO um usuário seleciona customizações ENTÃO o sistema SHALL calcular preço final automaticamente incluindo modificadores de preço
3. QUANDO um usuário visualiza carrinho ENTÃO o sistema SHALL exibir: produtos, quantidades, customizações, preços individuais, subtotal, taxa de entrega, desconto, total final
4. QUANDO um usuário modifica quantidade no carrinho ENTÃO o sistema SHALL atualizar preços e totais em tempo real
5. QUANDO um usuário remove item do carrinho ENTÃO o sistema SHALL atualizar totais e exibir confirmação
6. QUANDO carrinho atinge valor mínimo para frete grátis ENTÃO o sistema SHALL exibir notificação e remover taxa de entrega
7. QUANDO um usuário aplica cupom ENTÃO o sistema SHALL validar código, aplicar desconto e exibir economia
8. QUANDO um usuário salva carrinho ENTÃO o sistema SHALL persistir itens localmente e sincronizar com conta se logado
9. QUANDO um usuário abandona carrinho ENTÃO o sistema SHALL enviar lembrete por email após 2 horas (se logado)

### 4. Sistema de Checkout e Pagamento

**User Story:** Como um cliente, eu quero finalizar meu pedido de forma rápida e segura, escolhendo endereço de entrega e método de pagamento.

#### Acceptance Criteria

1. QUANDO um usuário inicia checkout ENTÃO o sistema SHALL exigir login e validar itens do carrinho
2. QUANDO um usuário seleciona tipo de entrega ENTÃO o sistema SHALL oferecer opções: delivery (com endereço) ou retirada no local
3. QUANDO um usuário escolhe delivery ENTÃO o sistema SHALL exibir endereços salvos e permitir adicionar novo endereço
4. QUANDO um usuário adiciona endereço ENTÃO o sistema SHALL validar CEP, calcular taxa de entrega e tempo estimado
5. QUANDO um usuário seleciona método de pagamento ENTÃO o sistema SHALL oferecer: PIX, cartão de crédito/débito, dinheiro, JC Points
6. QUANDO um usuário paga com cartão ENTÃO o sistema SHALL integrar com gateway de pagamento seguro (Stripe)
7. QUANDO um usuário paga com PIX ENTÃO o sistema SHALL gerar QR Code e chave PIX com validade de 30 minutos
8. QUANDO um usuário paga com JC Points ENTÃO o sistema SHALL validar saldo suficiente e permitir pagamento parcial/total
9. QUANDO pagamento é confirmado ENTÃO o sistema SHALL criar pedido, enviar confirmação por email/SMS e redirecionar para acompanhamento
10. QUANDO pagamento falha ENTÃO o sistema SHALL exibir erro específico e permitir nova tentativa

### 5. Sistema de Gamificação - JC Points

**User Story:** Como um cliente, eu quero ganhar pontos a cada compra para trocar por recompensas e acompanhar meu progresso na plataforma.

#### Acceptance Criteria

1. QUANDO um usuário faz primeira compra ENTÃO o sistema SHALL conceder 100 pontos de bônus de boas-vindas
2. QUANDO um usuário completa pedido ENTÃO o sistema SHALL conceder 10 pontos por real gasto (configurável)
3. QUANDO um usuário atinge novo nível ENTÃO o sistema SHALL exibir animação de celebração e desbloquear benefícios
4. QUANDO um usuário visualiza saldo de pontos ENTÃO o sistema SHALL exibir: pontos atuais, pontos a expirar, histórico de ganhos/gastos
5. QUANDO um usuário acessa loja de recompensas ENTÃO o sistema SHALL exibir: produtos disponíveis, cupons, descontos, benefícios por pontos
6. QUANDO um usuário resgata recompensa ENTÃO o sistema SHALL validar saldo, debitar pontos e ativar benefício
7. QUANDO pontos estão próximos do vencimento ENTÃO o sistema SHALL notificar usuário 7 dias antes
8. QUANDO um usuário indica amigo ENTÃO ambos SHALL receber bônus de 200 pontos após primeira compra do indicado

### 6. Sistema de Níveis de Fidelidade

**User Story:** Como um cliente, eu quero progredir através de níveis de fidelidade para desbloquear benefícios exclusivos e status premium.

#### Acceptance Criteria

1. QUANDO um usuário se cadastra ENTÃO o sistema SHALL definir nível inicial como Bronze (0-999 pontos)
2. QUANDO um usuário atinge 1000 pontos ENTÃO o sistema SHALL promover para nível Prata com benefícios: 5% desconto permanente
3. QUANDO um usuário atinge 3000 pontos ENTÃO o sistema SHALL promover para nível Ouro com benefícios: 10% desconto, frete grátis
4. QUANDO um usuário atinge 8000 pontos ENTÃO o sistema SHALL promover para nível Diamante com benefícios: 15% desconto, frete grátis, acesso antecipado
5. QUANDO um usuário visualiza progresso ENTÃO o sistema SHALL exibir: nível atual, pontos para próximo nível, barra de progresso, benefícios desbloqueados
6. QUANDO um usuário de nível superior faz pedido ENTÃO o sistema SHALL aplicar automaticamente desconto correspondente
7. QUANDO um usuário Diamante acessa novos produtos ENTÃO o sistema SHALL notificar 24h antes do lançamento público
8. QUANDO um usuário mantém nível por 12 meses ENTÃO o sistema SHALL conceder bônus de fidelidade de 500 pontos

### 7. Sistema de Conquistas (Achievements)

**User Story:** Como um cliente, eu quero desbloquear conquistas baseadas no meu comportamento para me sentir reconhecido e engajado.

#### Acceptance Criteria

1. QUANDO um usuário faz primeiro pedido ENTÃO o sistema SHALL desbloquear conquista "Primeira Compra" (100 pontos)
2. QUANDO um usuário faz 10 pedidos ENTÃO o sistema SHALL desbloquear conquista "Cliente Fiel" (500 pontos)
3. QUANDO um usuário experimenta 15 sabores diferentes ENTÃO o sistema SHALL desbloquear conquista "Explorador de Sabores" (300 pontos)
4. QUANDO um usuário faz pedido entre 6h-9h ENTÃO o sistema SHALL desbloquear conquista "Madrugador" (150 pontos)
5. QUANDO um usuário faz pedido entre 22h-2h ENTÃO o sistema SHALL desbloquear conquista "Coruja" (150 pontos)
6. QUANDO um usuário faz 5 pedidos em fins de semana ENTÃO o sistema SHALL desbloquear conquista "Guerreiro do Fim de Semana" (200 pontos)
7. QUANDO um usuário gasta R$ 500 total ENTÃO o sistema SHALL desbloquear conquista "Grande Investidor" (400 pontos)
8. QUANDO um usuário avalia 20 produtos ENTÃO o sistema SHALL desbloquear conquista "Crítico Gastronômico" (250 pontos)
9. QUANDO conquista é desbloqueada ENTÃO o sistema SHALL exibir notificação animada, adicionar pontos e registrar no perfil
10. QUANDO um usuário visualiza conquistas ENTÃO o sistema SHALL exibir: desbloqueadas (com data), em progresso (com barra), bloqueadas (com requisitos)

### 8. Sistema de Desafios

**User Story:** Como um cliente, eu quero participar de desafios temporários para ganhar recompensas extras e manter engajamento.

#### Acceptance Criteria

1. QUANDO sistema cria desafio semanal ENTÃO SHALL definir: objetivo, recompensa, data início/fim, critérios de conclusão
2. QUANDO um usuário acessa desafios ENTÃO o sistema SHALL exibir: ativos, progresso atual, tempo restante, recompensas
3. QUANDO um usuário progride em desafio ENTÃO o sistema SHALL atualizar barra de progresso em tempo real
4. QUANDO um usuário completa desafio ENTÃO o sistema SHALL conceder recompensa automaticamente e exibir celebração
5. QUANDO desafio expira ENTÃO o sistema SHALL resetar progresso e criar novo desafio automaticamente
6. QUANDO um usuário participa de desafio mensal ENTÃO o sistema SHALL oferecer recompensas maiores (1000+ pontos)
7. QUANDO sistema detecta usuário inativo ENTÃO SHALL criar desafio personalizado "Volta ao Sabor" com desconto especial
8. QUANDO múltiplos usuários competem ENTÃO o sistema SHALL exibir ranking em tempo real

### 9. Sistema de Cupons e Promoções

**User Story:** Como um cliente, eu quero utilizar cupons de desconto e participar de promoções para economizar em meus pedidos.

#### Acceptance Criteria

1. QUANDO um usuário aplica cupom válido ENTÃO o sistema SHALL calcular desconto e exibir economia no carrinho
2. QUANDO cupom tem valor mínimo ENTÃO o sistema SHALL validar se pedido atende requisito antes de aplicar
3. QUANDO cupom é de primeira compra ENTÃO o sistema SHALL validar se usuário nunca fez pedido antes
4. QUANDO cupom expira ENTÃO o sistema SHALL remover automaticamente do carrinho e notificar usuário
5. QUANDO usuário de aniversário acessa sistema ENTÃO SHALL receber cupom automático de 20% desconto
6. QUANDO usuário atinge novo nível ENTÃO o sistema SHALL conceder cupom de celebração correspondente ao nível
7. QUANDO sistema detecta carrinho abandonado ENTÃO SHALL enviar cupom de 10% por email após 24h
8. QUANDO promoção "Compre 2 Leve 3" está ativa ENTÃO o sistema SHALL aplicar automaticamente no checkout

### 10. Sistema de Avaliações e Reviews

**User Story:** Como um cliente, eu quero avaliar produtos que consumi para ajudar outros clientes e receber reconhecimento.

#### Acceptance Criteria

1. QUANDO um usuário recebe pedido ENTÃO o sistema SHALL enviar convite para avaliação após 2 horas
2. QUANDO um usuário avalia produto ENTÃO o sistema SHALL permitir: nota (1-5 estrelas), comentário, fotos opcionais
3. QUANDO avaliação é enviada ENTÃO o sistema SHALL validar conteúdo, publicar e conceder 50 pontos
4. QUANDO um usuário visualiza produto ENTÃO o sistema SHALL exibir: média de avaliações, número de reviews, comentários recentes
5. QUANDO avaliação contém palavrão ENTÃO o sistema SHALL filtrar automaticamente e solicitar revisão
6. QUANDO loja responde avaliação ENTÃO o sistema SHALL notificar cliente e exibir resposta
7. QUANDO um usuário faz 10 avaliações ENTÃO o sistema SHALL conceder status "Avaliador Verificado"
8. QUANDO avaliação é muito negativa (1-2 estrelas) ENTÃO o sistema SHALL notificar gerência automaticamente

### 11. Sistema de Notificações

**User Story:** Como um cliente, eu quero receber notificações relevantes sobre meus pedidos, promoções e conquistas para me manter informado.

#### Acceptance Criteria

1. QUANDO pedido muda status ENTÃO o sistema SHALL enviar notificação push e email com atualização
2. QUANDO usuário ganha conquista ENTÃO o sistema SHALL exibir notificação in-app com animação
3. QUANDO novo desafio é criado ENTÃO o sistema SHALL notificar usuários elegíveis
4. QUANDO promoção especial é lançada ENTÃO o sistema SHALL segmentar e notificar usuários por nível
5. QUANDO pontos estão próximos do vencimento ENTÃO o sistema SHALL enviar lembrete 7 e 1 dia antes
6. QUANDO usuário está inativo por 30 dias ENTÃO o sistema SHALL enviar campanha de reativação
7. QUANDO usuário configura preferências ENTÃO o sistema SHALL respeitar: email, SMS, push, horários permitidos
8. QUANDO notificação é enviada ENTÃO o sistema SHALL registrar entrega e permitir opt-out

### 12. Dashboard do Usuário

**User Story:** Como um cliente, eu quero ter um dashboard personalizado que mostre meu progresso, estatísticas e ações rápidas.

#### Acceptance Criteria

1. QUANDO um usuário acessa dashboard ENTÃO o sistema SHALL exibir: saldo JC Points, nível atual, progresso para próximo nível
2. QUANDO dashboard carrega ENTÃO o sistema SHALL mostrar: pedidos recentes, conquistas recentes, desafios ativos
3. QUANDO um usuário visualiza estatísticas ENTÃO o sistema SHALL exibir: total gasto, pedidos realizados, sabores experimentados, economia com cupons
4. QUANDO um usuário acessa ações rápidas ENTÃO o sistema SHALL oferecer: repetir último pedido, favoritos, cupons disponíveis
5. QUANDO um usuário visualiza histórico ENTÃO o sistema SHALL permitir filtrar por: data, status, valor, produtos
6. QUANDO um usuário acessa endereços ENTÃO o sistema SHALL permitir: adicionar, editar, excluir, definir padrão
7. QUANDO um usuário gerencia preferências ENTÃO o sistema SHALL permitir configurar: restrições alimentares, notificações, tema
8. QUANDO dashboard detecta ação importante ENTÃO o sistema SHALL destacar com badge ou animação

### 13. Sistema de Pedidos e Acompanhamento

**User Story:** Como um cliente, eu quero acompanhar meus pedidos em tempo real desde a confirmação até a entrega.

#### Acceptance Criteria

1. QUANDO pedido é confirmado ENTÃO o sistema SHALL exibir número do pedido, tempo estimado e status inicial "Confirmado"
2. QUANDO pedido entra em preparo ENTÃO o sistema SHALL atualizar status para "Preparando" e notificar cliente
3. QUANDO pedido fica pronto ENTÃO o sistema SHALL atualizar para "Pronto" e notificar para retirada/entrega
4. QUANDO pedido sai para entrega ENTÃO o sistema SHALL atualizar para "Saiu para Entrega" com previsão atualizada
5. QUANDO pedido é entregue ENTÃO o sistema SHALL finalizar como "Entregue" e solicitar confirmação do cliente
6. QUANDO cliente acessa acompanhamento ENTÃO o sistema SHALL exibir: timeline visual, status atual, tempo estimado, contato da loja
7. QUANDO há atraso no pedido ENTÃO o sistema SHALL notificar automaticamente com nova previsão
8. QUANDO cliente cancela pedido ENTÃO o sistema SHALL validar prazo, processar estorno e atualizar status

### 14. Sistema de Endereços

**User Story:** Como um cliente, eu quero gerenciar múltiplos endereços de entrega para facilitar futuros pedidos.

#### Acceptance Criteria

1. QUANDO um usuário adiciona endereço ENTÃO o sistema SHALL validar: CEP, completude dos campos, área de entrega
2. QUANDO CEP é inserido ENTÃO o sistema SHALL preencher automaticamente: cidade, estado, bairro (se disponível)
3. QUANDO endereço está fora da área ENTÃO o sistema SHALL informar indisponibilidade e sugerir retirada
4. QUANDO um usuário define endereço padrão ENTÃO o sistema SHALL usar automaticamente no checkout
5. QUANDO um usuário edita endereço ENTÃO o sistema SHALL revalidar dados e atualizar pedidos futuros
6. QUANDO um usuário exclui endereço ENTÃO o sistema SHALL confirmar ação e remover de pedidos salvos
7. QUANDO sistema calcula frete ENTÃO SHALL considerar: distância, zona de entrega, valor mínimo
8. QUANDO endereço é usado em pedido ENTÃO o sistema SHALL salvar automaticamente se não existir

## Requisitos Não Funcionais

### Performance
- Sistema deve carregar página inicial em menos de 2 segundos
- Busca de produtos deve retornar resultados em menos de 500ms
- Checkout deve processar em menos de 3 segundos
- Sistema deve suportar 1000 usuários simultâneos

### Segurança
- Todas as senhas devem ser criptografadas com bcrypt
- Dados de pagamento devem usar HTTPS e tokenização
- Sessões devem expirar após 24 horas de inatividade
- Sistema deve implementar rate limiting para APIs

### Usabilidade
- Interface deve ser responsiva para mobile, tablet e desktop
- Sistema deve funcionar offline para visualização básica
- Deve suportar navegação por teclado para acessibilidade
- Textos devem ter contraste mínimo de 4.5:1

### Compatibilidade
- Deve funcionar em Chrome, Firefox, Safari, Edge (últimas 2 versões)
- Deve ser instalável como PWA
- Deve funcionar em iOS 12+ e Android 8+
- Deve suportar notificações push em todos os browsers compatíveis

### Escalabilidade
- Banco de dados deve suportar crescimento de 100% ao ano
- Sistema deve permitir adição de novas funcionalidades sem refatoração
- APIs devem ser versionadas para compatibilidade
- Cache deve ser implementado para consultas frequentes