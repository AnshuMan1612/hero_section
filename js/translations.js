const translations = {
    en: {
        team: "OUR TEAM",
        vision: "OUR VISION",
        projects: "OUR PROJECTS",
        about: "ABOUT",
        contact: "CONTACT US",
        title: "IMAGING UNIQUE CONCEPTS AND DIGITAL EXPERIENCES",
        loaderText: "Pha5e",
        // Add new hover text translations
        biggerScience: {
            title: "BIGGER SCIENCE",
            desc: "Immersive Experience /WebGL /Gaming"
        },
        muchen: {
            title: "MUCHEN",
            desc: "Experential Website"
        },
        uganisha: {
            title: "UGANISHA",
            desc: "Experential Website /WebGL /3D"
        },
        oliveTree: {
            title: "OLIVE TREE",
            desc: "Interactive Installation /Real Time"
        }
    },
    fr: {
        team: "NOTRE ÉQUIPE",
        vision: "NOTRE VISION",
        projects: "NOS PROJETS",
        about: "À PROPOS",
        contact: "CONTACTEZ-NOUS",
        title: "IMAGINER DES CONCEPTS ET EXPÉRIENCES NUMÉRIQUES",
        loaderText: "Pha5e",
        // French translations for hover text
        biggerScience: {
            title: "BIGGER SCIENCE",
            desc: "Expérience Immersive /WebGL /Jeu"
        },
        muchen: {
            title: "MUCHEN",
            desc: "Site Web Expérientiel"
        },
        uganisha: {
            title: "UGANISHA",
            desc: "Site Web Expérientiel /WebGL /3D"
        },
        oliveTree: {
            title: "OLIVE TREE",
            desc: "Installation Interactive /Temps Réel"
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const langSwitch = document.getElementById('langSwitch');
    let currentLang = localStorage.getItem('language') || 'en';
    let isTransitioning = false;

    // Create a transition overlay
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'language-transition-overlay';
    transitionOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #1a1a1a;
        z-index: 9999;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.5s ease;
        display: flex;
        justify-content: center;
        align-items: center;
    `;
    document.body.appendChild(transitionOverlay);

    function safeTextUpdate(selector, text) {
        const element = document.querySelector(selector);
        if (element) element.textContent = text;
    }

    function updateLanguage(lang) {
        try {
            // Update gallery items
            document.querySelectorAll('.gallery-item').forEach((item, index) => {
                const hoverText = item.querySelector('.hover-text');
                if (hoverText) {
                    const key = ['biggerScience', 'muchen', 'uganisha', 'oliveTree'][index];
                    const translation = translations[lang][key];
                    
                    if (translation) {
                        safeTextUpdate(`[data-key="${key}"] h3`, translation.title);
                        safeTextUpdate(`[data-key="${key}"] p`, translation.desc);
                    }
                }
            });

            // Update navigation buttons
            const navButtons = [
                { selector: '.nav-right .nav-btn:nth-child(1)', key: 'team' },
                { selector: '.nav-right .nav-btn:nth-child(2)', key: 'vision' },
                { selector: '.nav-right .nav-btn:nth-child(3)', key: 'projects' },
                { selector: '.nav-right .nav-btn:nth-child(4)', key: 'contact' }
            ];

            navButtons.forEach(btn => {
                safeTextUpdate(btn.selector, translations[lang][btn.key]);
            });

            // Update hero title and loader text
            safeTextUpdate('.hero-title', translations[lang].title);
            safeTextUpdate('.loader-text', translations[lang].loaderText);
            
            // Update language switch button
            if (langSwitch) {
                langSwitch.classList.remove('en-active', 'fr-active');
                langSwitch.classList.add(`${lang}-active`);
                langSwitch.textContent = lang === 'en' ? 'FR' : 'EN';
            }
            
            localStorage.setItem('language', lang);
        } catch (error) {
            console.error('Error updating language:', error);
        }
    }

    function switchLanguage() {
        // Prevent multiple simultaneous transitions
        if (isTransitioning) return;
        isTransitioning = true;

        try {
            // Show transition overlay
            transitionOverlay.style.opacity = '1';
            transitionOverlay.style.pointerEvents = 'all';

            // Use a promise to handle transition
            const transitionPromise = new Promise((resolve) => {
                // Timeout to ensure overlay is visible
                setTimeout(() => {
                    try {
                        // Switch language
                        currentLang = currentLang === 'en' ? 'fr' : 'en';
                        updateLanguage(currentLang);
                        resolve();
                    } catch (innerError) {
                        console.error('Error during language switch:', innerError);
                        resolve(); // Still resolve to hide overlay
                    }
                }, 300);
            });

            // Ensure overlay is hidden after transition
            transitionPromise.then(() => {
                setTimeout(() => {
                    transitionOverlay.style.opacity = '0';
                    transitionOverlay.style.pointerEvents = 'none';
                    isTransitioning = false;
                }, 500);
            }).catch((error) => {
                console.error('Transition error:', error);
                // Fallback to hide overlay
                transitionOverlay.style.opacity = '0';
                transitionOverlay.style.pointerEvents = 'none';
                isTransitioning = false;
            });

        } catch (error) {
            console.error('Language switch error:', error);
            // Ensure overlay is always hidden
            transitionOverlay.style.opacity = '0';
            transitionOverlay.style.pointerEvents = 'none';
            isTransitioning = false;
        }
    }

    // Event listener for language switch
    if (langSwitch) {
        langSwitch.addEventListener('click', switchLanguage);
    }

    // Initial language setup
    updateLanguage(currentLang);
});