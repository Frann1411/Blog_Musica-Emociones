// Carousel functionality (Tailwind version)
function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const navBtns = document.querySelectorAll('.carousel-nav-btn');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  
  if (!slides.length) return;
  
  let currentSlide = 0;
  let autoplayInterval;

  function restartHeroAnimations(slide) {
    if (!slide) return;

    const animatedNodes = Array.from(slide.querySelectorAll('[data-hero-animate]'));
    if (!animatedNodes.length) return;

    animatedNodes.forEach((node) => {
      const animationClass = node.dataset.heroAnimate || 'animate-hero-fade-up';
      node.classList.remove(animationClass);
    });

    requestAnimationFrame(() => {
      animatedNodes.forEach((node, index) => {
        const animationClass = node.dataset.heroAnimate || 'animate-hero-fade-up';
        const delay = node.dataset.heroDelay || `${index * 140}ms`;
        node.style.animationDelay = delay;
        node.classList.add(animationClass);
      });
    });
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('opacity-0', i !== index);
      slide.classList.toggle('opacity-100', i === index);
    });
    navBtns.forEach((btn, i) => {
      btn.classList.toggle('bg-white/60', i === index);
      btn.classList.toggle('bg-white/40', i !== index);
    });

    restartHeroAnimations(slides[index]);
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
    resetAutoplay();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
    resetAutoplay();
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 4000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  
  navBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
      resetAutoplay();
    });
  });

  restartHeroAnimations(slides[0]);
  startAutoplay();
}

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

// Menú móvil
function initSongCardHovers() {
  const songCards = document.querySelectorAll('.song-card');
  
  songCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--emotion-x', `${x}%`);
      card.style.setProperty('--emotion-y', `${y}%`);
    });

    card.addEventListener('mouseenter', () => {
      card.style.setProperty('--emotion-x', '50%');
      card.style.setProperty('--emotion-y', '50%');
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--emotion-x', '50%');
      card.style.setProperty('--emotion-y', '50%');
    });
  });
}

/* Paginación cliente para canciones: muestra 6 por página */
function initSongPagination() {
  const grid = document.getElementById('songs-grid');
  const pager = document.getElementById('songs-pagination');
  if (!grid || !pager) return;

  const items = Array.from(grid.querySelectorAll('.song-card'));
  const pageSize = 6;
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  let current = 1;

  function renderPager() {
    pager.innerHTML = '';

    const prev = document.createElement('button');
    prev.type = 'button';
    prev.textContent = '‹';
    prev.className = 'px-3 py-1 rounded-md bg-primary-800 text-white';
    prev.disabled = current === 1;
    prev.addEventListener('click', () => renderPage(current - 1));
    pager.appendChild(prev);

    const range = 1;
    const start = Math.max(1, current - range);
    const end = Math.min(pageCount, current + range);

    if (start > 1) {
      const first = document.createElement('button');
      first.type = 'button';
      first.textContent = '1';
      first.className = 'px-3 py-1 rounded-md bg-primary-800 text-white';
      first.addEventListener('click', () => renderPage(1));
      pager.appendChild(first);

      if (start > 2) {
        const dots = document.createElement('span');
        dots.className = 'song-pagination-ellipsis';
        dots.textContent = '...';
        pager.appendChild(dots);
      }
    }

    for (let i = start; i <= end; i++) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = String(i);
      button.className = i === current
        ? 'px-3 py-1 rounded-md bg-primary-500 text-white font-semibold'
        : 'px-3 py-1 rounded-md bg-primary-800 text-white';
      button.addEventListener('click', () => renderPage(i));
      pager.appendChild(button);
    }

    if (end < pageCount) {
      if (end < pageCount - 1) {
        const dots = document.createElement('span');
        dots.className = 'song-pagination-ellipsis';
        dots.textContent = '...';
        pager.appendChild(dots);
      }

      const last = document.createElement('button');
      last.type = 'button';
      last.textContent = String(pageCount);
      last.className = 'px-3 py-1 rounded-md bg-primary-800 text-white';
      last.addEventListener('click', () => renderPage(pageCount));
      pager.appendChild(last);
    }

    const next = document.createElement('button');
    next.type = 'button';
    next.textContent = '›';
    next.className = 'px-3 py-1 rounded-md bg-primary-800 text-white';
    next.disabled = current === pageCount;
    next.addEventListener('click', () => renderPage(current + 1));
    pager.appendChild(next);
  }

  function renderPage(page) {
    current = Math.max(1, Math.min(pageCount, page));
    const start = (current - 1) * pageSize;
    const end = start + pageSize;

    items.forEach((item, index) => {
      item.style.display = (index >= start && index < end) ? '' : 'none';
    });

    renderPager();
    window.scrollTo({ top: grid.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
  }

  renderPage(1);
}

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar carrusel
  initCarousel();

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    
    // Cerrar menú al hacer click en un enlace
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  setActiveNavLink();
  enablePageTransitions();
  initScrollReveal();
  initBackToTop();
  initMagneticButtons();
  initTypewriterQuote();
  initAmbientParticles();
  initMiniVisualizer();
  initFilters();
  initCardSpotlight();
  initSongCardHovers();
  initSongPagination();
  initAboutRotator();
  initAboutTimeline();
  initContentCardModal();
  initArtistModals();
  initArtistPagination();
  optimizeImages();
});

function setActiveNavLink() {
  const current = location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link-tw, .navbar .nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    try {
      const href = (new URL(link.getAttribute('href'), location.href)).pathname.split('/').pop();
      if (href === current) {
        link.classList.add('active');
        link.classList.add('text-primary-400');
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
  btn.innerHTML = '<svg class="inline-block w-5 h-5"><use href="#arrow-up"></use></svg>';
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

function initCardSpotlight() {
  const cards = document.querySelectorAll('article.bg-primary-200.rounded-2xl.overflow-hidden.shadow-soft');
  if (!cards.length) return;

  cards.forEach((card) => {
    const setSpot = (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--spot-x', `${Math.max(0, Math.min(100, x))}%`);
      card.style.setProperty('--spot-y', `${Math.max(0, Math.min(100, y))}%`);
    };

    card.addEventListener('mouseenter', setSpot);
    card.addEventListener('mousemove', setSpot);
  });
}

/* Rotador de frases para la sección Sobre mí */
function initAboutRotator() {
  const container = document.querySelector('.about-quote-rotator');
  if (!container) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const quotes = Array.from(container.querySelectorAll('.quote'));
  if (!quotes.length) return;
  let idx = quotes.findIndex(q => q.classList.contains('active'));
  if (idx < 0) idx = 0;

  quotes.forEach((q, i) => { if (i !== idx) q.classList.remove('active'); else q.classList.add('active'); });

  if (prefersReduced || quotes.length < 2) return;

  setInterval(() => {
    quotes[idx].classList.remove('active');
    idx = (idx + 1) % quotes.length;
    quotes[idx].classList.add('active');
  }, 4800);
}

/* Interacciones simples para la timeline: mostrar/ocultar detalles */
function initAboutTimeline() {
  const toggles = document.querySelectorAll('.timeline-item .toggle-details');
  if (!toggles.length) return;
  toggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const body = toggle.closest('.timeline-body');
      const hiddenContent = body.querySelector('.hidden-content');
      if (!hiddenContent) return;
      const open = toggle.getAttribute('data-open') === 'true';
      if (open) {
        hiddenContent.style.maxHeight = '0';
        toggle.setAttribute('data-open', 'false');
        toggle.textContent = 'Ver más ▸';
      } else {
        hiddenContent.style.maxHeight = hiddenContent.scrollHeight + 'px';
        toggle.setAttribute('data-open', 'true');
        toggle.textContent = 'Ocultar ▾';
      }
    });
  });
}

/* Modal expandible para artistas */
function initArtistModals() {
  const modal = document.getElementById('artist-modal');
  if (!modal) return;

  const titleNode = document.getElementById('artist-modal-title');
  const bioNode = document.getElementById('artist-modal-bio');
  const albumsNode = document.getElementById('artist-modal-albums');
  const songsNode = document.getElementById('artist-modal-songs');

  function closeModal() {
    modal.classList.add('hidden');
    modal.style.display = '';
    document.body.style.overflow = '';
  }

  function openModal(data) {
    titleNode.textContent = data.title || '';
    bioNode.textContent = data.bio || '';
    albumsNode.innerHTML = '';
    songsNode.innerHTML = '';
    (data.albums || []).forEach(a => {
      const li = document.createElement('li'); li.textContent = a; albumsNode.appendChild(li);
    });
    (data.songs || []).forEach(s => {
      const li = document.createElement('li'); li.textContent = s; songsNode.appendChild(li);
    });
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  // Attach to buttons
  document.querySelectorAll('.open-artist-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const art = btn.closest('.artist-card');
      if (!art) return;
      const title = art.querySelector('h3')?.textContent?.trim();
      const bio = art.querySelector('p')?.textContent?.trim();
      const albums = (art.getAttribute('data-albums') || '').split(';').map(s => s.trim()).filter(Boolean);
      const songs = (art.getAttribute('data-songs') || '').split(';').map(s => s.trim()).filter(Boolean);
      openModal({ title, bio, albums, songs });
    });
  });

  // Close handlers
  modal.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

/* Paginación cliente para artistas: muestra 9 por página */
function initArtistPagination() {
  const grid = document.getElementById('artists-grid');
  const pager = document.getElementById('artists-pagination');
  if (!grid || !pager) return;
  const items = Array.from(grid.querySelectorAll('.artist-card'));
  const pageSize = 9;
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  let current = 1;

  function renderPage(page) {
    current = Math.max(1, Math.min(pageCount, page));
    const start = (current - 1) * pageSize;
    const end = start + pageSize;
    items.forEach((it, i) => {
      it.style.display = (i >= start && i < end) ? '' : 'none';
    });
    renderPager();
    window.scrollTo({ top: grid.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
  }

  function renderPager() {
    pager.innerHTML = '';
    const prev = document.createElement('button'); prev.textContent = '‹'; prev.className = 'px-3 py-1 rounded-md bg-primary-800 text-white';
    prev.disabled = current === 1; prev.addEventListener('click', () => renderPage(current - 1));
    pager.appendChild(prev);

    // show up to 5 page numbers centered
    const range = 2; // pages each side
    const start = Math.max(1, current - range);
    const end = Math.min(pageCount, current + range);
    for (let i = start; i <= end; i++) {
      const b = document.createElement('button'); b.textContent = String(i);
      b.className = (i === current) ? 'px-3 py-1 rounded-md bg-primary-500 text-white font-semibold' : 'px-3 py-1 rounded-md bg-primary-800 text-primary-100';
      b.addEventListener('click', () => renderPage(i));
      pager.appendChild(b);
    }

    const next = document.createElement('button'); next.textContent = '›'; next.className = 'px-3 py-1 rounded-md bg-primary-800 text-white';
    next.disabled = current === pageCount; next.addEventListener('click', () => renderPage(current + 1));
    pager.appendChild(next);
  }

  renderPage(1);
}

/* Modal reutilizable para cards de index y sobre-mi */
function initContentCardModal() {
  let modal = document.getElementById('content-card-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'content-card-modal';
    modal.className = 'fixed inset-0 z-50 hidden items-center justify-center p-4';
    modal.innerHTML = `
      <div class="absolute inset-0 bg-black/60" data-close-content-modal></div>
      <div class="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-primary-900 text-primary-50 shadow-2xl">
        <div class="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-secondary-500/10 pointer-events-none"></div>
        <div class="relative p-6 md:p-8">
          <button class="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/20" data-close-content-modal>
            Cerrar
          </button>
          <p id="content-card-modal-eyebrow" class="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary-200"></p>
          <h3 id="content-card-modal-title" class="mb-4 text-3xl font-heading font-bold text-white"></h3>
          <p id="content-card-modal-body" class="text-base leading-relaxed text-primary-100"></p>
          <div class="mt-6">
            <h4 class="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-primary-200">Puntos clave</h4>
            <ul id="content-card-modal-points" class="grid gap-3 text-sm text-primary-100"></ul>
          </div>
        </div>
      </div>`;
    document.body.appendChild(modal);
  }

  const titleNode = document.getElementById('content-card-modal-title');
  const eyebrowNode = document.getElementById('content-card-modal-eyebrow');
  const bodyNode = document.getElementById('content-card-modal-body');
  const pointsNode = document.getElementById('content-card-modal-points');

  const closeModal = () => {
    modal.classList.add('hidden');
    modal.style.display = '';
    document.body.style.overflow = '';
  };

  const openModal = ({ title, eyebrow, body, points = [] }) => {
    titleNode.textContent = title || '';
    eyebrowNode.textContent = eyebrow || '';
    bodyNode.textContent = body || '';
    pointsNode.innerHTML = '';
    points.forEach((point) => {
      const li = document.createElement('li');
      li.className = 'flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3';
      li.innerHTML = '<span class="mt-1 h-2.5 w-2.5 rounded-full bg-secondary-300"></span><span class="flex-1">' + point + '</span>';
      pointsNode.appendChild(li);
    });
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  document.querySelectorAll('.content-card-trigger').forEach((card) => {
    const handler = () => {
      const title = card.dataset.cardModalTitle || card.querySelector('h3, h2')?.textContent?.trim() || 'Detalle';
      const eyebrow = card.dataset.cardModalEyebrow || '';
      const body = card.dataset.cardModalBody || card.querySelector('p')?.textContent?.trim() || '';
      const points = (card.dataset.cardModalPoints || '')
        .split(';')
        .map((point) => point.trim())
        .filter(Boolean);
      openModal({ title, eyebrow, body, points });
    };

    card.addEventListener('click', (event) => {
      if (event.target.closest('button, a')) return;
      handler();
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handler();
      }
    });
  });

  modal.querySelectorAll('[data-close-content-modal]').forEach((el) => el.addEventListener('click', closeModal));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && !modal.classList.contains('hidden')) closeModal();
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
