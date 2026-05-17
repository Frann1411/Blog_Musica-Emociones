// Cargar navbar
async function loadNavbar() {
  try {
    const response = await fetch('/Components/navbar.html');
    if (!response.ok) throw new Error('Error al cargar navbar');
    const navbarHTML = await response.text();

    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
      navbarContainer.innerHTML = navbarHTML;
      // Inicializar funcionalidad del navbar si es necesaria
      initNavbar();
      adjustNavbarOffset();
      window.addEventListener('resize', adjustNavbarOffset);
      if (typeof setActiveNavLink === 'function') {
        setActiveNavLink();
      }
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });
    }
  } catch (error) {
    console.error('Error cargando navbar:', error);
  }
}

function adjustNavbarOffset() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const navbarHeight = navbar.getBoundingClientRect().height;
  const extraSpacing = window.innerWidth >= 768 ? 0:0 ; // Espacio extra para evitar solapamiento
  document.body.style.paddingTop = `${Math.ceil(navbarHeight + extraSpacing)}px`;
}

// Cargar footer
async function loadFooter() {
  try {
    const response = await fetch('/Components/footer.html');
    if (!response.ok) throw new Error('Error al cargar footer');
    const footerHTML = await response.text();

    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
      footerContainer.innerHTML = footerHTML;
      if (typeof initFooter === 'function') initFooter();
    }
  } catch (error) {
    console.error('Error cargando footer:', error);
  }
}

// Inicializar funcionalidad del navbar (menú móvil)
function initNavbar() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
    });

    // Cerrar menú al hacer click en un link
    const navLinks = mobileMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

// Inicializar funcionalidades del footer (frase rotativa)
function initFooter() {
  const phraseEl = document.getElementById('footer-phrase');
  if (!phraseEl) return;
  const phrases = [
    'También se recuerda.',
    'También se siente.',
    'También nos acompaña.',
    'También nos transforma.'
  ];
  let idx = 0;
  phraseEl.classList.add('footer-phrase-animate');
  setInterval(() => {
    // fade out
    phraseEl.style.opacity = '0';
    phraseEl.style.transform = 'translateY(6px)';
    setTimeout(() => {
      idx = (idx + 1) % phrases.length;
      phraseEl.textContent = phrases[idx];
      // fade in
      phraseEl.style.opacity = '';
      phraseEl.style.transform = '';
    }, 320);
  }, 4200);
}

// Ejecutar al cargar el documento
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', function () {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  loadNavbar();
  loadFooter();
});
