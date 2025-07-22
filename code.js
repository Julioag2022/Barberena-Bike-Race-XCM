document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');
    const sponsorLogos = document.querySelectorAll('.sponsor-logo');
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    const backToTopButton = document.getElementById('back-to-top');

    // Lógica del menú hamburguesa
    menuBtn.addEventListener('click', () => {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            setTimeout(() => {
                menu.classList.remove('scale-y-0');
            }, 10);
        } else {
            menu.classList.add('scale-y-0');
            setTimeout(() => {
                menu.classList.add('hidden');
            }, 300);
        }
    });

    // Función para observar elementos y añadir la clase 'is-visible'
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Observar las secciones para la animación de entrada general
    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });

    // Observar los logos de los patrocinadores para la animación de zoom-in individual
    sponsorLogos.forEach((logo, index) => {
        const sponsorObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        logo.classList.add('is-visible');
                    }, index * 150); // Retraso para la aparición secuencial
                    sponsorObserver.unobserve(logo);
                }
            });
        }, { threshold: 0.5 });
        sponsorObserver.observe(logo);
    });

    // Mostrar/ocultar el botón de volver al inicio
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // Función para volver al inicio
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});