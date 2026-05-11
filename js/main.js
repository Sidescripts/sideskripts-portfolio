// Main JS for Sideskripts Technologies

document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        let isScrolled = window.scrollY > 50;
        navbar.classList.toggle('scrolled', isScrolled);

        window.addEventListener('scroll', () => {
            const nextScrolled = window.scrollY > 50;
            if (nextScrolled !== isScrolled) {
                isScrolled = nextScrolled;
                navbar.classList.toggle('scrolled', isScrolled);
            }
        }, { passive: true });
    }

    const revealElements = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        revealElements.forEach(el => el.classList.add('fade-in-up'));
    } else {
        window.requestAnimationFrame(() => {
            revealElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.96) {
                    el.classList.add('fade-in-up');
                }
            });
        });

        // Scroll reveal observer
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -30px 0px'
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => {
            if (!el.classList.contains('fade-in-up')) {
                revealObserver.observe(el);
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (!href || href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (!target) {
                return;
            }

            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
