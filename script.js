document.addEventListener('DOMContentLoaded', () => {

  // Год в футере
  document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());

  const menuBtn = document.querySelector('.menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => navMenu.classList.toggle('open'));
    document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => navMenu.classList.remove('open')));
  }

  // Анимация появления
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = [...(entry.target.parentElement?.querySelectorAll('.reveal') || [])];
      entry.target.style.transitionDelay = siblings.indexOf(entry.target) * 60 + 'ms';
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Фильтр проектов
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.proj-category').forEach(cat => {
        cat.style.display = (f === 'all' || cat.id === f) ? '' : 'none';
      });
    });
  });

  // Форма контакта
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sender…';
      setTimeout(() => {
        form.reset();
        btn.disabled = false;
        btn.textContent = 'Send melding';
        const s = document.getElementById('formSuccess');
        if (s) { s.classList.add('show'); setTimeout(() => s.classList.remove('show'), 4000); }
      }, 800);
    });
  }

  // Плавный скролл к якорям
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' }); }
    });
  });

});