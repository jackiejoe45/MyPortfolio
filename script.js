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
        } else if (previewElement) {
            previewElement.textContent = target.value;
        }
    });

    // Theme toggle functionality
    themeSelect.addEventListener('change', (event) => {
        const selectedTheme = event.target.value;
        previewContainer.className = `preview-container ${selectedTheme}`;
    });

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
