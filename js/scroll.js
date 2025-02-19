document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const video = document.querySelector('.background-video');
    const gallery = document.querySelector('.gallery');
    const videoSection = document.querySelector('.video-section');
    
    if (!video || !videoSection || !gallery) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Handle video autoplay when section is visible
                if (entry.target.classList.contains('video-section')) {
                    const sectionVideo = entry.target.querySelector('video');
                    if (sectionVideo) {
                        sectionVideo.play().catch(err => console.log('Video autoplay prevented:', err));
                    }
                }
            }
        });
    }, {
        threshold: 0.2
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll navigation
    const navButtons = document.querySelectorAll('.nav-right .nav-btn:not(#langSwitch)');
    navButtons.forEach((button, index) => {
        if (sections[index]) {
            button.addEventListener('click', () => {
                sections[index].scrollIntoView({ behavior: 'smooth' });
            });
        }
    });

    // Handle video click
    video.addEventListener('click', () => {
        if (video.paused) {
            video.play().catch(error => console.log('Playback error:', error));
        } else {
            video.pause();
        }
    });

    // Initialize scroll settings immediately
    let scrollPosition = window.pageYOffset;
    let ticking = false;

    function handleScroll() {
        scrollPosition = window.pageYOffset;

        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateGalleryPosition(scrollPosition);
                ticking = false;
            });
            ticking = true;
        }
    }

    function updateGalleryPosition(scrollPos) {
        if (scrollPos > 0) {
            const scale = Math.max(0.5, 1 - (scrollPos * 0.001));
            const opacity = Math.max(0, 1 - (scrollPos * 0.002));
            
            gallery.style.transform = `scale(${scale})`;
            gallery.style.opacity = opacity;

            if (scrollPos > window.innerHeight / 2) {
                video.style.opacity = '1';
            } else {
                video.style.opacity = '0';
            }
        } else {
            gallery.style.transform = 'scale(1)';
            gallery.style.opacity = '1';
            video.style.opacity = '0';
        }
    }

    // Add scroll listener immediately
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial position update
    updateGalleryPosition(scrollPosition);
});