// js/service-form.js
document.addEventListener('DOMContentLoaded', () => {
    const serviceForm = document.getElementById('serviceForm');
    if (serviceForm) {
        serviceForm.addEventListener('submit', handleServiceSubmit);
    }
});

function handleServiceSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = JSON.parse(localStorage.getItem('techhub_user'));

    if (!user) {
        alert('Você precisa estar logado para publicar um serviço.');
        openLoginModal();
        return;
    }

    // Processar lista de itens incluídos
    const includesText = formData.get('includes') || '';
    const includesList = includesText.split('\n')
        .map(item => item.trim())
        .filter(item => item.length > 0);

    const newService = {
        id: Date.now(),
        authorId: user.id,
        authorName: user.name,
        authorEmail: formData.get('contactEmail'),
        authorPhone: formData.get('phone'),
        name: formData.get('serviceName'),
        description: formData.get('shortDescription'),
        fullDescription: formData.get('fullDescription'),
        category: formData.get('category'),
        tech: formData.get('tech') ? formData.get('tech').split(',').map(t => t.trim()) : [],
        price: formData.get('price'),
        duration: formData.get('duration'),
        teamSize: formData.get('teamSize'),
        experience: formData.get('experience'),
        includes: includesList,
        portfolioUrl: formData.get('portfolioUrl'),
        rating: 0,
        reviews: 0,
        type: 'service',
        createdAt: new Date().toISOString(),
    };

    // Simulação de salvamento no backend
    const allServices = JSON.parse(localStorage.getItem('community_services')) || [];
    allServices.push(newService);
    localStorage.setItem('community_services', JSON.stringify(allServices));

    // Mostrar loading no botão
    const submitBtn = e.target.querySelector('.btn-primary');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Publicando...';
    submitBtn.disabled = true;

    setTimeout(() => {
        alert('Serviço publicado com sucesso! Ele agora está disponível na plataforma.');
        window.location.href = 'dashboard.html';
    }, 1500);
}