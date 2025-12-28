// Navbar background on scroll
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  setActiveNavLink();
  enablePageTransitions();
  initScrollReveal();
  initBackToTop();
  initMagneticButtons();
  initTypewriterQuote();
  initAmbientParticles();
  initMiniVisualizer();
  initFilters();
  optimizeImages();
});

function setActiveNavLink() {
  const current = location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar .nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    try {
      const href = (new URL(link.getAttribute('href'), location.href)).pathname.split('/').pop();
      if (href === current) {
        link.classList.add('active');
      }
    } catch (_) {
      /* ignora hrefs inválidos */
    }
  });
}

function enablePageTransitions() {
  const main = document.getElementById('main-content');
  if (!main) return;
  const navLinks = document.querySelectorAll('.navbar .nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || !href.endsWith('.html')) return;
    link.addEventListener('click', (e) => {
      // prevenir la transición para enlaces externos o nuevos tabs
      if (e.ctrlKey || e.metaKey || e.button === 1 || link.target === '_blank') return;
      e.preventDefault();
      main.classList.add('fade-out');
      setTimeout(() => { window.location.href = href; }, 220);
    });
  });
}

function initScrollReveal() {
  const selectors = [
    '.impact-content', '.impact-quote', '.experience-card',
    '.hover-card', '.playlist-card', '.card', 'section h2',
  ];
  const nodes = document.querySelectorAll(selectors.join(','));
  if (!nodes.length) return;
  nodes.forEach(el => el.classList.add('reveal-hidden'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  nodes.forEach(el => observer.observe(el));
}

function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'btn btn-primary';
  btn.setAttribute('aria-label', 'Volver arriba');
  btn.innerHTML = '<i class="bi bi-arrow-up"></i>';
  Object.assign(btn.style, {
    position: 'fixed', right: '16px', bottom: '20px', zIndex: 1050,
    borderRadius: '50%', width: '44px', height: '44px', display: 'none',
    boxShadow: '0 12px 24px rgba(0,0,0,0.25)'
  });
  document.body.appendChild(btn);

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 400 ? 'inline-flex' : 'none';
  });
}

function initMagneticButtons() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const magnets = document.querySelectorAll('.btn-primary, .playlist-btn, .theme-toggle');
  if (!magnets.length || prefersReduced) return;
  magnets.forEach(el => {
    el.style.willChange = 'transform';
    const strength = 8; // px
    let rafId = null;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - (rect.left + rect.width / 2);
      const my = e.clientY - (rect.top + rect.height / 2);
      const dx = Math.max(Math.min(mx / (rect.width / 2) * strength, strength), -strength);
      const dy = Math.max(Math.min(my / (rect.height / 2) * strength, strength), -strength);
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
    };
    const onLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.style.transform = 'translate(0, 0)';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
  });
}

function initTypewriterQuote() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;
  const quote = document.querySelector('.impact-quote blockquote p');
  if (!quote) return;
  const fullText = quote.textContent.trim();
  quote.textContent = '';
  const caret = document.createElement('span');
  caret.className = 'typewriter-caret';
  caret.textContent = '|';
  quote.appendChild(caret);

  const type = () => {
    let i = 0;
    const speed = 22; // ms per char
    const timer = setInterval(() => {
      if (i >= fullText.length) { clearInterval(timer); caret.classList.add('blink'); return; }
      caret.before(document.createTextNode(fullText[i]));
      i++;
    }, speed);
  };

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        type();
        obs.disconnect();
      }
    });
  }, { threshold: 0.2 });
  obs.observe(quote);
}

function initAmbientParticles() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;
  const container = document.createElement('div');
  container.className = 'ambient-container';
  document.body.appendChild(container);
  const count = 16; // un poco más densas
  const symbols = ['\u2022', '\u2022', '\u25CF', '♪', '♫'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'ambient-dot';
    el.textContent = symbols[i % symbols.length];
    const left = Math.random() * 100; // vw
    const top = Math.random() * 100; // vh
    const duration = 10 + Math.random() * 12; // s
    const delay = Math.random() * 8; // s
    el.style.left = left + 'vw';
    el.style.top = top + 'vh';
    el.style.animationDuration = duration + 's';
    el.style.animationDelay = delay + 's';
    el.style.opacity = String(0.15 + Math.random() * 0.12);
    container.appendChild(el);
  }
}

function initMiniVisualizer() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const buttons = document.querySelectorAll('.playlist-btn');
  if (!buttons.length) return;
  buttons.forEach(btn => {
    const eq = document.createElement('span');
    eq.className = 'eq-bars';
    for (let i = 0; i < 3; i++) {
      const bar = document.createElement('span');
      bar.className = 'eq-bar';
      eq.appendChild(bar);
    }
    btn.appendChild(eq);
    if (!prefersReduced) {
      btn.addEventListener('mouseenter', () => eq.classList.add('on'));
      btn.addEventListener('mouseleave', () => eq.classList.remove('on'));
      btn.addEventListener('focus', () => eq.classList.add('on'));
      btn.addEventListener('blur', () => eq.classList.remove('on'));
    }
  });
}

function optimizeImages() {
  const imgs = Array.from(document.querySelectorAll('img'));
  if (!imgs.length) return;
  imgs.forEach(img => {
    const isHero = !!img.closest('.carousel-item.active');
    const rect = img.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    // decoding
    if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
    if (isHero) {
      img.setAttribute('fetchpriority', 'high');
      // let browser decide loading for hero
    } else {
      // Lazy-load for non-hero images, prefer low priority
      img.setAttribute('fetchpriority', 'low');
      if (!inViewport && !img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
    }
  });
}

function initFilters() {
  const bars = document.querySelectorAll('.filter-bar');
  if (!bars.length) return;
  bars.forEach(bar => {
    const scope = bar.dataset.scope || '';
    // Target: next .row inside same section/container
    let target = null;
    const parentSection = bar.closest('section, .container');
    if (parentSection) target = parentSection.querySelector('.row');
    if (!target) return;

    const cards = Array.from(target.querySelectorAll('.card'));
    // Precompute tags per card
    cards.forEach(card => {
      const tags = computeCardTags(card, scope);
      card.dataset.tags = tags.join(',');
      // prepare transitions
      card.style.transition = 'opacity 220ms ease, transform 220ms ease';
    });

    const chips = bar.querySelectorAll('.filter-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        const filter = (chip.dataset.filter || 'all').toLowerCase();
        cards.forEach(card => {
          const tagStr = card.dataset.tags || '';
          const has = filter === 'all' || tagStr.split(',').includes(filter);
          if (has) {
            // show with animation
            card.style.display = '';
            requestAnimationFrame(() => {
              card.classList.remove('filter-hidden');
              card.classList.add('filter-show');
              card.classList.remove('filter-hide');
            });
          } else {
            // hide with animation
            card.classList.add('filter-hide');
            card.classList.remove('filter-show');
            setTimeout(() => { card.classList.add('filter-hidden'); card.style.display = 'none'; }, 220);
          }
        });
      });
    });

    // activate first chip
    const first = bar.querySelector('.filter-chip');
    if (first) first.click();
  });
}

function computeCardTags(card, scope) {
  const tags = new Set();
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  if (scope === 'artists') {
    const badge = card.querySelector('.card-body .badge');
    if (badge) {
      const txt = norm(badge.textContent);
      // split by separators
      txt.split(/[\s/,&]+/).forEach(t => {
        if (!t) return;
        // map to canonical tags
        if (t.includes('rock')) tags.add('rock');
        if (t.includes('soft')) tags.add('soft-rock');
        if (t.includes('pop')) tags.add('pop');
        if (t.includes('blues')) tags.add('blues');
        if (t.includes('folk')) tags.add('folk');
        if (t.includes('latino')) tags.add('latino');
        if (t.includes('progres')) tags.add('progresivo');
        if (t.includes('funk')) tags.add('funk');
        if (t.includes('disco')) tags.add('disco');
      });
    }
  } else if (scope === 'songs') {
    const bodyText = norm(card.querySelector('.card-body')?.textContent || '');
    const map = [
      ['amor', ['amor', 'romant', 'pasio']],
      ['melancolia', ['melancol', 'triste']],
      ['nostalgia', ['nostal', 'recuerdo']],
      ['esperanza', ['esperanza', 'futuro', 'fe']],
      ['introspeccion', ['introspe', 'espiritual', 'interior', 'contempla']]
    ];
    map.forEach(([tag, keys]) => {
      if (keys.some(k => bodyText.includes(k))) tags.add(tag);
    });
  }
  if (!tags.size) tags.add('otros');
  return Array.from(tags);
}
