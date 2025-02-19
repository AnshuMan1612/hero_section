document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Move the main cursor
        cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;

        // Move the follower with slight delay
        setTimeout(() => {
            cursorFollower.style.transform = `translate(${mouseX - 20}px, ${mouseY - 20}px)`;
        }, 100);
    });

    // Add hover effect for interactive elements
    const hoverTargets = document.querySelectorAll('.hover-target');
    
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(3)';
            cursorFollower.style.transform += ' scale(1.5)';
        });

        target.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(3)', '');
            cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(1.5)', '');
        });
    });
});