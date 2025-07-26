// Dados dos produtos
const products = {
    burger: [
        {
            id: 1,
            name: "Whopper",
            price: 24.99,
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
            rating: 5,
            description: "Nosso icônico Whopper com carne grelhada, alface, tomate, cebola, picles e maionese",
            category: "burger"
        },
        {
            id: 2,
            name: "Big King",
            price: 22.99,
            image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
            rating: 4,
            description: "Dois hambúrgueres, alface, queijo, picles, cebola em um pão com gergelim",
            category: "burger"
        },
        {
            id: 3,
            name: "Bacon King",
            price: 28.99,
            image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400&h=300&fit=crop",
            rating: 5,
            description: "Hambúrguer com bacon crocante, queijo e molho especial",
            category: "burger"
        }
    ],
    chicken: [
        {
            id: 4,
            name: "Chicken Crispy",
            price: 19.99,
            image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop",
            rating: 4,
            description: "Frango empanado crocante com alface e maionese",
            category: "chicken"
        },
        {
            id: 5,
            name: "Chicken Royal",
            price: 21.99,
            image: "https://images.unsplash.com/photo-1606755962773-d324e2dabd66?w=400&h=300&fit=crop",
            rating: 5,
            description: "Peito de frango grelhado com queijo e molho especial",
            category: "chicken"
        }
    ],
    sides: [
        {
            id: 6,
            name: "Batata Frita Média",
            price: 8.99,
            image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
            rating: 4,
            description: "Batatas fritas douradas e crocantes",
            category: "sides"
        },
        {
            id: 7,
            name: "Onion Rings",
            price: 9.99,
            image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=300&fit=crop",
            rating: 4,
            description: "Anéis de cebola empanados e fritos",
            category: "sides"
        }
    ],
    drinks: [
        {
            id: 8,
            name: "Coca-Cola 500ml",
            price: 6.99,
            image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop",
            rating: 5,
            description: "Refrigerante Coca-Cola gelado",
            category: "drinks"
        },
        {
            id: 9,
            name: "Milkshake Chocolate",
            price: 12.99,
            image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop",
            rating: 5,
            description: "Milkshake cremoso de chocolate",
            category: "drinks"
        }
    ]
};

// Estado da aplicação
let cart = [];
let currentCategory = 'all';
let currentUser = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    renderProducts();
    updateCartUI();
    setupEventListeners();
    loadCartFromStorage();
}

// Event Listeners
function setupEventListeners() {
    // Navegação de categorias
    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', function() {
            const category = this.dataset.category || this.querySelector('span').textContent.toLowerCase().replace(' ', '');
            filterByCategory(category);
        });
    });

    // Botões do hero
    document.querySelector('.hero .btn-primary').addEventListener('click', () => {
        document.querySelector('.products-grid').scrollIntoView({ behavior: 'smooth' });
    });

    // Cart toggle
    document.querySelector('.cart-link').addEventListener('click', (e) => {
        e.preventDefault();
        toggleCart();
    });

    // Account
    document.querySelector('.account-link').addEventListener('click', (e) => {
        e.preventDefault();
        toggleAccount();
    });
}

// Renderização de produtos
function renderProducts(category = 'all') {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';

    let allProducts = [];
    
    if (category === 'all') {
        Object.values(products).forEach(categoryProducts => {
            allProducts = [...allProducts, ...categoryProducts];
        });
    } else {
        allProducts = products[category] || [];
    }

    allProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });

    // Renderizar produtos em destaque na sidebar
    renderFeaturedProducts();
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x300/FFA500/FFFFFF?text=${product.name}'">
        <h3>${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="rating">
            <span class="stars">${'★'.repeat(product.rating)}${'☆'.repeat(5-product.rating)}</span>
        </div>
        <div class="price">R$ ${product.price.toFixed(2)}</div>
        <button class="btn btn-primary add-to-cart" onclick="addToCart(${product.id})">
            Adicionar ao Carrinho
        </button>
    `;
    return card;
}

function renderFeaturedProducts() {
    const featuredContainer = document.querySelector('.featured-products');
    featuredContainer.innerHTML = '';

    // Pegar 3 produtos aleatórios
    const allProducts = Object.values(products).flat();
    const featured = allProducts.sort(() => 0.5 - Math.random()).slice(0, 3);

    featured.forEach(product => {
        const featuredItem = document.createElement('div');
        featuredItem.className = 'featured-item';
        featuredItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/120x90/FFA500/FFFFFF?text=${product.name}'">
            <div class="featured-info">
                <h4>${product.name}</h4>
                <div class="price">R$ ${product.price.toFixed(2)}</div>
                <button class="btn-small" onclick="addToCart(${product.id})">Adicionar</button>
            </div>
        `;
        featuredContainer.appendChild(featuredItem);
    });
}

// Filtros
function filterByCategory(category) {
    currentCategory = category;
    
    // Atualizar visual da categoria ativa
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
    });
    
    if (category !== 'all') {
        const categoryMap = {
            'burger': 'BURGER',
            'chicken': 'CHICKEN', 
            'sides': 'FRENCH FRIES',
            'drinks': 'DRINKS'
        };
        
        document.querySelectorAll('.category-item').forEach(item => {
            if (item.querySelector('span').textContent === categoryMap[category]) {
                item.classList.add('active');
            }
        });
    }

    renderProducts(category);
}

// Carrinho de compras
function addToCart(productId) {
    const allProducts = Object.values(products).flat();
    const product = allProducts.find(p => p.id === productId);
    
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartUI();
    saveCartToStorage();
    showNotification(`${product.name} adicionado ao carrinho!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCartToStorage();
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartUI();
        saveCartToStorage();
    }
}

function updateCartUI() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Atualizar contador do carrinho
    const cartLink = document.querySelector('.cart-link');
    cartLink.innerHTML = `<i class="fas fa-shopping-cart"></i> Carrinho (${cartCount})`;

    // Atualizar modal do carrinho se estiver aberto
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        updateCartModal();
    }
}

function toggleCart() {
    let cartModal = document.getElementById('cartModal');
    
    if (!cartModal) {
        cartModal = createCartModal();
        document.body.appendChild(cartModal);
    }
    
    updateCartModal();
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
}

function createCartModal() {
    const modal = document.createElement('div');
    modal.id = 'cartModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Seu Carrinho</h2>
                <span class="close" onclick="toggleCart()">&times;</span>
            </div>
            <div class="modal-body">
                <div id="cartItems"></div>
                <div class="cart-total">
                    <h3>Total: R$ <span id="cartTotalAmount">0.00</span></h3>
                </div>
                <div class="cart-actions">
                    <button class="btn btn-secondary" onclick="clearCart()">Limpar Carrinho</button>
                    <button class="btn btn-primary" onclick="checkout()">Finalizar Pedido</button>
                </div>
            </div>
        </div>
    `;
    return modal;
}

function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const cartTotalAmount = document.getElementById('cartTotalAmount');
    
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
        cartTotalAmount.textContent = '0.00';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/80x60/FFA500/FFFFFF?text=${item.name}'">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>R$ ${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-controls">
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <div class="cart-item-total">
                R$ ${(item.price * item.quantity).toFixed(2)}
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalAmount.textContent = total.toFixed(2);
}

function clearCart() {
    cart = [];
    updateCartUI();
    saveCartToStorage();
    showNotification('Carrinho limpo!');
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        showNotification('Seu carrinho está vazio!', 'error');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Simular processo de checkout
    showNotification('Processando pedido...', 'info');
    
    setTimeout(() => {
        const orderNumber = Math.floor(Math.random() * 10000);
        showNotification(`Pedido #${orderNumber} realizado com sucesso! Total: R$ ${total.toFixed(2)}`, 'success');
        clearCart();
        toggleCart();
    }, 2000);
}

// Sistema de conta
function toggleAccount() {
    let accountModal = document.getElementById('accountModal');
    
    if (!accountModal) {
        accountModal = createAccountModal();
        document.body.appendChild(accountModal);
    }
    
    accountModal.style.display = accountModal.style.display === 'block' ? 'none' : 'block';
}

function createAccountModal() {
    const modal = document.createElement('div');
    modal.id = 'accountModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Minha Conta</h2>
                <span class="close" onclick="toggleAccount()">&times;</span>
            </div>
            <div class="modal-body">
                ${currentUser ? `
                    <div class="user-info">
                        <h3>Bem-vindo, ${currentUser.name}!</h3>
                        <p>Email: ${currentUser.email}</p>
                        <button class="btn btn-secondary" onclick="logout()">Sair</button>
                    </div>
                ` : `
                    <form id="loginForm" onsubmit="login(event)">
                        <div class="form-group">
                            <label>Nome:</label>
                            <input type="text" id="userName" required>
                        </div>
                        <div class="form-group">
                            <label>Email:</label>
                            <input type="email" id="userEmail" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Entrar</button>
                    </form>
                `}
            </div>
        </div>
    `;
    return modal;
}

function login(event) {
    event.preventDefault();
    
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    
    currentUser = { name, email };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    document.querySelector('.account-link').innerHTML = `<i class="fas fa-user"></i> ${name}`;
    toggleAccount();
    showNotification(`Bem-vindo, ${name}!`);
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    document.querySelector('.account-link').innerHTML = '<i class="fas fa-user"></i> My Account';
    toggleAccount();
    showNotification('Logout realizado com sucesso!');
}

// Notificações
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Armazenamento local
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
    
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        document.querySelector('.account-link').innerHTML = `<i class="fas fa-user"></i> ${currentUser.name}`;
    }
}

// Busca
function setupSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar produtos...';
    searchInput.className = 'search-input';
    searchInput.addEventListener('input', (e) => searchProducts(e.target.value));
    
    document.querySelector('.header').appendChild(searchInput);
}

function searchProducts(query) {
    if (!query) {
        renderProducts(currentCategory);
        return;
    }
    
    const allProducts = Object.values(products).flat();
    const filtered = allProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';
    
    filtered.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}