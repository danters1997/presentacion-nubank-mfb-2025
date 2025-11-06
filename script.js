document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('header nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Timeline Interaction ---
    const timelineEvents = document.querySelectorAll('.timeline-event');

    timelineEvents.forEach(event => {
        event.addEventListener('click', () => {
            // Check if the tooltip already exists
            const existingTooltip = event.querySelector('.timeline-tooltip');

            // Remove all other active tooltips
            document.querySelectorAll('.timeline-event.active').forEach(activeEvent => {
                if (activeEvent !== event) {
                    activeEvent.classList.remove('active');
                    const tooltip = activeEvent.querySelector('.timeline-tooltip');
                    if (tooltip) {
                        tooltip.remove();
                    }
                }
            });

            if (existingTooltip) {
                // If clicked again, just toggle off
                existingTooltip.remove();
                event.classList.remove('active');
            } else {
                // Create and show the tooltip
                const description = event.dataset.description;
                const tooltip = document.createElement('div');
                tooltip.className = 'timeline-tooltip';
                tooltip.textContent = description;
                
                event.appendChild(tooltip);
                event.classList.add('active');
            }
        });
    });
});
