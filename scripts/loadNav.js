const fallbackNavHtml = `
<header class="shared-nav-wrapper">
  <div class="shared-nav">
    <a href="index.html" class="shared-nav-brand">Papelería S</a>
    <div class="shared-nav-menu" id="desktop-nav-links">
      <a class="shared-nav-link" href="index.html">Inicio</a>
      <a class="shared-nav-link" href="Productos.html">Papelería</a>
      <a class="shared-nav-link" href="Cosmeticos.html">Cosméticos</a>
      <a class="shared-nav-link" href="Servicios.html">Servicios</a>
      <span class="nav-slider" id="nav-slider"></span>
    </div>
    <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Menu">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>
    <div class="shared-nav-actions">
      <a href="Productos.html">Ver productos</a>
    </div>
  </div>
  <div class="mobile-nav-container" id="mobile-nav">
    <a class="mobile-nav-link" href="index.html">Inicio</a>
    <a class="mobile-nav-link" href="Productos.html">Papelería</a>
    <a class="mobile-nav-link" href="Cosmeticos.html">Cosméticos</a>
    <a class="mobile-nav-link" href="Servicios.html">Servicios</a>
    <a class="mobile-nav-btn" href="Productos.html">Ver productos</a>
  </div>
</header>
`;

function initNavSlider() {
  const navLinks = Array.from(document.querySelectorAll("#desktop-nav-links .shared-nav-link"));
  const slider = document.getElementById("nav-slider");
  if (!navLinks.length || !slider) return;

  function setSliderToLink(link) {
    const rect = link.getBoundingClientRect();
    const menuRect = link.parentElement.getBoundingClientRect();
    slider.style.width = `${rect.width}px`;
    slider.style.left = `${rect.left - menuRect.left}px`;
  }

  function setActiveLink(link) {
    navLinks.forEach(item => item.classList.toggle("active", item === link));
    setSliderToLink(link);
  }

  function getCurrentLink() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    return navLinks.find(link => {
      const href = link.getAttribute("href");
      if (!href) return false;
      return href === currentPath || href === `./${currentPath}`;
    }) || navLinks[0];
  }

  const currentLink = getCurrentLink();
  if (currentLink) setActiveLink(currentLink);

  navLinks.forEach(link => {
    link.addEventListener("click", () => setActiveLink(link));
  });
}

function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuBtn && mobileNav) {
    const originalIcon = menuBtn.innerHTML;
    const closeIcon = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = mobileNav.classList.toggle('active');
      menuBtn.innerHTML = isActive ? closeIcon : originalIcon;
    });

    document.addEventListener('click', (e) => {
      if (!mobileNav.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileNav.classList.remove('active');
        menuBtn.innerHTML = originalIcon;
      }
    });

    mobileNav.querySelectorAll('.mobile-nav-link, .mobile-nav-btn').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        menuBtn.innerHTML = originalIcon;
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const navPlaceholder = document.getElementById("nav-placeholder");
  if (!navPlaceholder) return;

  fetch("nav.html")
    .then(response => {
      if (!response.ok) throw new Error("No se pudo cargar nav.html");
      return response.text();
    })
    .then(html => {
      // Eliminar todo el bloque de estilos (etiquetas y contenido) para evitar que se vea como texto
      const cleanHtml = html.replace(/<style>[\s\S]*?<\/style>/gi, "");
      navPlaceholder.innerHTML = cleanHtml;
      initNavSlider();
      initMobileMenu();
    })
    .catch(error => {
      console.warn("Usando nav fallback:", error);
      navPlaceholder.innerHTML = fallbackNavHtml;
      initNavSlider();
      initMobileMenu();
    });
});
