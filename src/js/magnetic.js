document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.hero-title');
    const subtitle = document.querySelector('.hero-subtitle');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const hero = document.querySelector('.hero');

    // Updated positions to be more centered
    const positions = [
        { x: -6, y: -2 },    // Top left
        { x: 6, y: -3 },     // Top right
        { x: -5, y: 3 },     // Bottom left
        { x: 5, y: 4 }       // Bottom right
    ];

    // Set initial positions with subtle rotations
    galleryItems.forEach((item, index) => {
        const pos = positions[index];
        const rotation = [-0.8, 0.6, -0.4, 0.7][index];
        item.style.transform = `
            translate3d(${pos.x}%, ${pos.y}%, 0)
            rotate(${rotation}deg)
        `;
    });

    let isMoving = false;
    let rafId = null;

    // Update magnetic effect
    window.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            const { clientX: mouseX, clientY: mouseY } = e;

            galleryItems.forEach((item, index) => {
                const rect = item.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = mouseX - centerX;
                const deltaY = mouseY - centerY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                
                // Decreased magnetic range and forces
                const maxDistances = [600, 550, 580, 530];
                const forces = [0.4, 0.35, 0.38, 0.42];

                if (distance < maxDistances[index]) {
                    const force = (maxDistances[index] - distance) / maxDistances[index];
                    const moveX = deltaX * force * forces[index];
                    const moveY = deltaY * force * forces[index];
                    
                    const pos = positions[index];
                    const rotation = [-0.8, 0.6, -0.4, 0.7][index];
                    item.style.transform = `
                        translate3d(${pos.x}%, ${pos.y}%, 0)
                        translate3d(${moveX}px, ${moveY}px, 0)
                        rotate(${rotation}deg)
                    `;
                } else {
                    const pos = positions[index];
                    const rotation = [-0.8, 0.6, -0.4, 0.7][index];
                    item.style.transform = `
                        translate3d(${pos.x}%, ${pos.y}%, 0)
                        rotate(${rotation}deg)
                    `;
                }
            });
        });
    });

    // Add slow return animation when mouse leaves
    document.addEventListener('mouseleave', () => {
        galleryItems.forEach((item, index) => {
            const pos = positions[index];
            const rotation = [-0.8, 0.6, -0.4, 0.7][index];
            item.style.transition = 'transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)';
            item.style.transform = `
                translate3d(${pos.x}%, ${pos.y}%, 0)
                rotate(${rotation}deg)
            `;
            
            // Remove transition after animation completes
            setTimeout(() => {
                item.style.transition = '';
            }, 1500);
        });
    });
    
    // Add click handlers
    [title, subtitle, ...galleryItems].forEach(element => {
        if (element) {
            element.addEventListener('click', handleClick);
        }
    });

    // Reset on background click
    document.addEventListener('click', (e) => {
        if (e.target === hero || e.target === document.body) {
            hero.classList.remove('outline-mode');
            document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
        }
    });

    const clickableElements = document.querySelectorAll('.gallery-item, .hero-title, .hero-subtitle');

    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            hero.classList.add('hovered');
        });

        element.addEventListener('mouseleave', () => {
            hero.classList.remove('hovered');
        });
    });

    const hoverElements = document.querySelectorAll('.gallery-item, .hero-title, .hero-subtitle');

    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            hero.classList.add('hovered');
        });

        element.addEventListener('mouseleave', () => {
            hero.classList.remove('hovered');
        });
    });
});