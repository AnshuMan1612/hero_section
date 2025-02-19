/* filepath: /c:/Users/anshm/OneDrive/Desktop/hero-website/src/js/outline.js */
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            hero.classList.add('image-hovered');
        });

        item.addEventListener('mouseleave', () => {
            hero.classList.remove('image-hovered');
            // Reset all opacities when no element is hovered
            galleryItems.forEach(item => item.style.opacity = '1');
        });
    });
});