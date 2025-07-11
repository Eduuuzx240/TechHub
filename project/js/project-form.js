// js/project-form.js
document.addEventListener('DOMContentLoaded', () => {
    const projectForm = document.getElementById('projectForm');
    if (projectForm) {
        projectForm.addEventListener('submit', handleProjectSubmit);
    }
});

function handleProjectSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = JSON.parse(localStorage.getItem('techhub_user'));

    if (!user) {
        alert('Você precisa estar logado para publicar um projeto.');
        openLoginModal();
        return;
    }

    const newProject = {
        id: Date.now(),
        authorId: user.id,
        authorName: user.name,
        name: formData.get('projectName'),
        description: formData.get('shortDescription'),
        category: formData.get('category'),
        tech: formData.get('tech').split(',').map(t => t.trim()),
        image: formData.get('imageUrl') || 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=400', // Imagem padrão
        projectUrl: formData.get('projectUrl'),
        rating: 0, // Projetos da comunidade podem começar com 0 e ter um sistema de votação
    };

    // Simulação de salvamento no backend
    const allProjects = JSON.parse(localStorage.getItem('community_projects')) || [];
    allProjects.push(newProject);
    localStorage.setItem('community_projects', JSON.stringify(allProjects));

    alert('Projeto publicado com sucesso! Ele agora está visível na página da comunidade.');
    window.location.href = 'dashboard.html';
}