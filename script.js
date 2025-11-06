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

    // --- Panorama Section Chart ---
    const ctx = document.getElementById('mexicoGrowthChart');
    if (ctx) {
        Chart.register(ChartDataLabels);
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1T20', '4T20', '4T21', '4T22', '4T23', '4T24', '2T25', '3T25'],
                datasets: [{
                    label: 'Millones de Usuarios en México',
                    data: [0.0, 1.0, 1.4, 3.2, 5.2, 10.0, 12.0, 13.0],
                    fill: true,
                    backgroundColor: 'rgba(130, 10, 209, 0.1)',
                    borderColor: 'rgba(130, 10, 209, 1)',
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(130, 10, 209, 1)',
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    datalabels: {
                        anchor: 'end',
                        align: function(context) {
                            // For the last data point, align left to prevent clipping
                            return context.dataIndex === context.dataset.data.length - 1 ? 'left' : 'top';
                        },
                        offset: 4,
                        color: 'rgba(130, 10, 209, 1)',
                        font: {
                            weight: 'bold'
                        },
                        formatter: function(value) {
                            return value + 'M';
                        }
                    }
                }
            }
        });
    }
});
