// js/products.js - VERSÃO ATUALIZADA E INTEGRADA

// Produtos oficiais do techHUB
const officialProducts = [
    {
        id: 1,
        name: 'AI Analytics Platform',
        category: 'ai',
        price: 'R$ 899,90',
        image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.8,
        description: 'Plataforma de análise inteligente com IA avançada para insights em tempo real',
        featured: true,
        tech: ['Python', 'TensorFlow', 'React'],
        type: 'official' // Tipo para diferenciar
    },
    {
        id: 2,
        name: 'Progressive Web App',
        category: 'web',
        price: 'R$ 599,90',
        image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.9,
        description: 'Aplicação web progressiva de alta performance com experiência nativa',
        featured: true,
        tech: ['React', 'TypeScript', 'PWA'],
        type: 'official'
    },
    {
        id: 3,
        name: 'Native Mobile App',
        category: 'mobile',
        price: 'R$ 1299,90',
        image: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.7,
        description: 'App nativo multiplataforma de última geração com performance otimizada',
        featured: false,
        tech: ['React Native', 'Node.js', 'MongoDB'],
        type: 'official'
    },
    {
        id: 4,
        name: 'Design System Pro',
        category: 'design',
        price: 'R$ 449,90',
        image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.6,
        description: 'Sistema de design completo e escalável para equipes modernas',
        featured: false,
        tech: ['Figma', 'Storybook', 'CSS-in-JS'],
        type: 'official'
    },
    {
        id: 5,
        name: 'Cybersecurity Suite',
        category: 'security',
        price: 'R$ 1599,90',
        image: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.9,
        description: 'Suite completa de segurança cibernética com proteção avançada',
        featured: true,
        tech: ['Blockchain', 'Encryption', 'AI Security'],
        type: 'official'
    },
    {
        id: 6,
        name: 'Smart Dashboard',
        category: 'ai',
        price: 'R$ 699,90',
        image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.8,
        description: 'Dashboard inteligente com insights em tempo real e visualizações avançadas',
        featured: false,
        tech: ['Vue.js', 'D3.js', 'Machine Learning'],
        type: 'official'
    },
    {
        id: 7,
        name: 'E-commerce Platform',
        category: 'web',
        price: 'R$ 999,90',
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.7,
        description: 'Plataforma de e-commerce completa com recursos avançados',
        featured: false,
        tech: ['Next.js', 'Stripe', 'PostgreSQL'],
        type: 'official'
    },
    {
        id: 8,
        name: 'IoT Management System',
        category: 'ai',
        price: 'R$ 1899,90',
        image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.9,
        description: 'Sistema de gerenciamento IoT com IA para automação inteligente',
        featured: true,
        tech: ['Python', 'MQTT', 'TensorFlow'],
        type: 'official'
    },
];

let currentFilter = 'all';
let displayedProducts = 6;

// --- NOVA LÓGICA DE INTEGRAÇÃO ---

// Função para buscar TODOS os projetos (oficiais + comunidade)
function getAllProjects() {
    // 1. Pega os projetos da comunidade do localStorage
    const communityProjectsRaw = localStorage.getItem('community_projects') || '[]';
    const communityProjects = JSON.parse(communityProjectsRaw);

    // 2. Mapeia os projetos da comunidade para terem uma estrutura compatível
    const formattedCommunityProjects = communityProjects.map(p => ({
        ...p,
        type: 'community', // Tipo para diferenciar
        featured: false, // Projetos da comunidade não são "Destaque"
    }));

    // 3. Combina as duas listas
    return [...officialProducts, ...formattedCommunityProjects];
}

// --- FIM DA NOVA LÓGICA ---


document.addEventListener('DOMContentLoaded', function() {
    setupProductFilters();
    renderProducts();
    checkURLParams();
});

function setupProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            filterProducts(category);
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function checkURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
        filterProducts(category);
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            }
        });
    }
}

// --- FUNÇÃO DE RENDERIZAÇÃO ATUALIZADA ---
function renderProducts(category = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    const allProducts = getAllProjects(); // Pega a lista combinada

    const filtered = category === 'all' 
        ? allProducts
        : allProducts.filter(product => product.category === category);

    const productsToDisplay = filtered.slice(0, displayedProducts);

    productsGrid.innerHTML = productsToDisplay.map(product => {
        // Lógica para definir o conteúdo do rodapé do card
        const footerContent = product.type === 'official'
            ? `
                <span class="product-price">${product.price}</span>
                <div class="product-actions">
                    <button class="product-action secondary" onclick="viewProduct(${product.id}, '${product.type}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="product-action primary" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            `
            : `
                <span class="product-price">Por: ${product.authorName}</span>
                <div class="product-actions">
                    <a href="${product.projectUrl || '#'}" target="_blank" class="product-action primary">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            `;
        
        // Lógica para os "badges" (Destaque ou Comunidade)
        const badgeContent = product.type === 'official' && product.featured
            ? '<div class="product-featured">⭐ Destaque</div>'
            : product.type === 'community'
            ? '<div class="product-community-badge">Comunidade</div>'
            : '';

        return `
            <div class="product-card" data-category="${product.category}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${badgeContent}
                </div>
                <div class="product-content">
                    <div class="product-header">
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-rating">
                            <i class="fas fa-star"></i>
                            <span>${product.rating}</span>
                        </div>
                    </div>
                    <p class="product-description">${product.description}</p>
                    <div class="product-tech">
                        ${product.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="product-footer">
                        ${footerContent}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    updateLoadMoreButton(category);
}


function filterProducts(category) {
    currentFilter = category;
    displayedProducts = 6;
    renderProducts(category);
}

function loadMoreProducts() {
    displayedProducts += 6;
    renderProducts(currentFilter);
}

function updateLoadMoreButton(category) {
    const loadMoreSection = document.querySelector('.load-more');
    if (!loadMoreSection) return;

    const allProducts = getAllProjects();
    const totalProducts = category === 'all' 
        ? allProducts.length 
        : allProducts.filter(product => product.category === category).length;

    if (displayedProducts >= totalProducts) {
        loadMoreSection.style.display = 'none';
    } else {
        loadMoreSection.style.display = 'block';
    }
}

// Funções de ação atualizadas para encontrar o produto na lista correta
function viewProduct(productId, type) {
    const allProducts = getAllProjects();
    const product = allProducts.find(p => p.id === productId && p.type === type);
    if (product) {
        alert(`Visualizando: ${product.name}\n\n${product.description}`);
    }
}

function addToCart(productId) {
    const product = officialProducts.find(p => p.id === productId);
    if (product) {
        alert(`${product.name} adicionado ao carrinho!`);
    }
}