// js/dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    // Primeiro, verifica se o usuário está logado. Se não, redireciona.
    const user = JSON.parse(localStorage.getItem('techhub_user'));
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    renderUserProjects();
});

function renderUserProjects() {
    const grid = document.getElementById('userProjectsGrid');
    // Simulação: Pega os projetos do localStorage. Em um app real, viria de um banco de dados.
    const allProjects = JSON.parse(localStorage.getItem('community_projects')) || [];
    const userProjects = allProjects.filter(p => p.authorId === JSON.parse(localStorage.getItem('techhub_user')).id);

    if (userProjects.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #6b7280;">Você ainda não publicou nenhum projeto. <a href="publicar-projeto.html">Publique o primeiro!</a></p>';
        return;
    }

    // Reutiliza a lógica de renderização de cards
    grid.innerHTML = userProjects.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                </div>
        </div>
    `).join('');
}