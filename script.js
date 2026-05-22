document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('.year').forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const open = navMenu.classList.contains('open');
            menuBtn.setAttribute('aria-expanded', open);
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => navMenu.classList.remove('open'));
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger siblings slightly
                const siblings = entry.target.parentElement
                    ? [...entry.target.parentElement.querySelectorAll('.reveal')]
                    : [];
                const idx = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${idx * 60}ms`;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.background = 'rgba(13, 15, 20, 0.97)';
        } else {
            navbar.style.background = 'rgba(13, 15, 20, 0.85)';
        }
    }, { passive: true });

    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;
                const categories = document.querySelectorAll('.proj-category');

                categories.forEach(cat => {
                    if (filter === 'all') {
                        cat.style.display = '';
                    } else {
                        const id = cat.id;
                        cat.style.display = id === filter ? '' : 'none';
                    }
                });
            });
        });
    }

    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            btn.disabled = true;
            btn.textContent = 'Sender…';

            setTimeout(() => {
                form.reset();
                btn.disabled = false;
                btn.textContent = 'Send melding';
                const success = document.getElementById('formSuccess');
                if (success) {
                    success.classList.add('show');
                    setTimeout(() => success.classList.remove('show'), 4000);
                }
            }, 800);
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

});