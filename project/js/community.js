// js/community.js
document.addEventListener('DOMContentLoaded', () => {
    renderCommunityProjects();
});

function renderCommunityProjects() {
    const grid = document.getElementById('communityProjectsGrid');
    const allProjects = JSON.parse(localStorage.getItem('community_projects')) || [];

    if (allProjects.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #6b7280;">Ainda não há projetos da comunidade. Seja o primeiro a publicar!</p>';
        return;
    }

    grid.innerHTML = allProjects.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-content">
                <div class="product-header">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-rating">
                        <i class="fas fa-user"></i>
                        <span>Por: ${product.authorName}</span>
                    </div>
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-tech">
                    ${product.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="product-footer">
                     <a href="${product.projectUrl}" target="_blank" class="cta-btn primary" style="padding: 0.5rem 1rem;">
                        <i class="fas fa-external-link-alt"></i>
                        <span>Ver Projeto</span>
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}