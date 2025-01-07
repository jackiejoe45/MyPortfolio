document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('portfolioForm');
    const previewContainer = document.querySelector('.preview-container');
    const themeSelect = document.getElementById('themeSelect');

    // Update preview in real-time
    form.addEventListener('input', (event) => {
        const target = event.target;
        const previewElement = previewContainer.querySelector(`#preview-${target.name}`);

        if (target.name === 'specializations' || target.name === 'technicalSkills' || target.name === 'softSkills') {
            const listElement = previewContainer.querySelector(`#preview-${target.name}`);
            listElement.innerHTML = target.value.split(',').map(item => `<li>${item.trim()}</li>`).join('');
        } else if (target.name === 'linkedin' || target.name === 'devPlatforms' || target.name === 'otherLinks') {
            updateLinks();
        } else if (target.name === 'featuredProjects') {
            updateFeaturedProjects(target.value);
        } else if (target.name === 'codeRepos') {
            updateCodeRepos(target.value);
        } else if (target.name === 'workHistory') {
            updateWorkHistory(target.value);
        } else if (target.name === 'degrees') {
            updateDegrees(target.value);
        } else if (target.name === 'testimonials') {
            updateTestimonials(target.value);
        } else if (target.name === 'awards') {
            updateAwards(target.value);
        } else if (previewElement) {
            previewElement.textContent = target.value;
        }
    });

    // Theme toggle functionality
    themeSelect.addEventListener('change', (event) => {
        const selectedTheme = event.target.value;
        previewContainer.className = `preview-container ${selectedTheme}`;
    });

    // Update links section
    function updateLinks() {
        const linksContainer = previewContainer.querySelector('#preview-links');
        linksContainer.innerHTML = '';

        const linkFields = ['linkedin', 'devPlatforms', 'otherLinks'];
        linkFields.forEach(field => {
            const value = form[field].value;
            if (value) {
                const icon = getIconForField(field);
                linksContainer.innerHTML += `<a href="${value}" target="_blank">${icon}</a>`;
            }
        });
    }

    // Update featured projects section
    function updateFeaturedProjects(value) {
        const projectsContainer = previewContainer.querySelector('#preview-featuredProjects');
        projectsContainer.innerHTML = value.split('],').map(item => {
            const [name, link] = item.replace(/[\[\]]/g, '').split(',').map(part => part.split(':')[1].trim());
            return `<li><a href="${link}" target="_blank">${name}</a></li>`;
        }).join('');
    }

    // Update code repository links section
    function updateCodeRepos(value) {
        const reposContainer = previewContainer.querySelector('#preview-codeRepos');
        reposContainer.innerHTML = value.split(',').map(link => `<li><a href="${link.trim()}" target="_blank">${link.trim()}</a></li>`).join('');
    }

    // Update work history section
    function updateWorkHistory(value) {
        const workHistoryContainer = previewContainer.querySelector('#preview-workHistory');
        workHistoryContainer.innerHTML = value.split('],').map(item => {
            const [title, company, period] = item.replace(/[\[\]]/g, '').split(',').map(part => part.split(':')[1].trim());
            return `<li>${title} at ${company} (${period})</li>`;
        }).join('');
    }

    // Update degrees section
    function updateDegrees(value) {
        const degreesContainer = previewContainer.querySelector('#preview-degrees');
        degreesContainer.textContent = value;
    }

    // Update testimonials section
    function updateTestimonials(value) {
        const testimonialsContainer = previewContainer.querySelector('#preview-testimonials');
        testimonialsContainer.innerHTML = value.split('},').map(item => {
            const [client, review] = item.replace(/[{}]/g, '').split(',').map(part => part.split(':')[1].trim());
            return `<li>${client}: "${review}"</li>`;
        }).join('');
    }

    // Update awards section
    function updateAwards(value) {
        const awardsContainer = previewContainer.querySelector('#preview-awards');
        awardsContainer.innerHTML = value.split(',').map(award => `<li>${award.trim()}</li>`).join('');
    }

    // Get icon for field
    function getIconForField(field) {
        switch (field) {
            case 'linkedin':
                return '<i class="fab fa-linkedin"></i>'; // Use FontAwesome or similar for icons
            case 'devPlatforms':
                return '<i class="fab fa-dev"></i>'; // Example icon
            case 'otherLinks':
                return '<i class="fas fa-link"></i>'; // Example icon
            default:
                return '';
        }
    }
});
