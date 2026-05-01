
document.addEventListener("DOMContentLoaded", function () {
  initPage();
});

async function initPage() {
  await Promise.all([
    loadHtmlFragment("nav-include", "nav.html"),
    loadHtmlFragment("footer-include", "footer.html"),
  ]);

  bindMobileMenu();
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }
  await populateFeaturedProducts();
  populateProductCards();
  animateHero();
  animateScrollSections();
}

async function loadHtmlFragment(containerId, url) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    container.innerHTML = await response.text();
  } catch (error) {
    console.error(`No se pudo cargar ${url}:`, error);
  }
}

function bindMobileMenu() {
  const button = document.getElementById("mobile-menu-button");
  const closeButton = document.getElementById("mobile-menu-close");
  const menu = document.getElementById("mobile-menu");

  if (!button || !menu) return;

  button.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  closeButton?.addEventListener("click", () => {
    menu.classList.add("hidden");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => menu.classList.add("hidden"));
  });
}

function animateHero() {
  if (!window.gsap) return;

  gsap.from("#inicio .font-h1", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#inicio .bg-primary-fixed", {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 0.2,
    ease: "power3.out",
  });

  gsap.from("#inicio .group img", {
    opacity: 0,
    x: 80,
    duration: 1,
    delay: 0.3,
    ease: "power3.out",
  });
}

function animateScrollSections() {
  if (!window.gsap) return;

  gsap.utils.toArray(".animate-fade-up").forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
      },
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: "power3.out",
    });
  });
}

function fixDriveUrl(driveUrl) {
  if (!driveUrl) return "";
  const match = driveUrl.match(/(?:id=|\/d\/)([a-zA-Z0-9_-]+)(?:\/view|\?|$)/);
  return match && match[1] ? `https://drive.google.com/thumbnail?export=view&id=${match[1]}` : driveUrl;
}

async function populateFeaturedProducts() {
  const container = document.getElementById("featured-products");
  if (!container) return;

  try {
    const [papeleraRes, cosmeticosRes] = await Promise.all([
      fetch("https://api-protection-cnkp.vercel.app/inventario/papeleria"),
      fetch("https://api-protection-cnkp.vercel.app/inventario/productos")
    ]);

    const papeleraData = await papeleraRes.json();
    const cosmeticosData = await cosmeticosRes.json();

    // Procesar papelería (Toda la lista)
    const papeleraValues = Array.isArray(papeleraData) ? papeleraData :
      (papeleraData.values && Array.isArray(papeleraData.values)) ? papeleraData.values.slice(1) :
        Object.values(papeleraData);

    let paperProducts = papeleraValues
      .map(item => ({
        title: item.title?.trim() || "Producto",
        price: item.price?.trim() || "N/A",
        imgSrc: fixDriveUrl(item.imgSrc?.trim() || ""),
        type: "papeleria",
        label: item.colores?.trim() || "Papelería"
      }))
      .filter(p => p.imgSrc && p.title !== "Producto");

    // Procesar cosméticos (Toda la lista)
    const cosmeticosValues = Array.isArray(cosmeticosData) ? cosmeticosData :
      (cosmeticosData.values && Array.isArray(cosmeticosData.values)) ? cosmeticosData.values.slice(1) :
        Object.values(cosmeticosData);

    let cosmeticItems = cosmeticosValues
      .map(item => ({
        title: item.title?.trim() || "Producto",
        price: item.price?.trim() || "N/A",
        imgSrc: fixDriveUrl(item.imgSrc?.trim() || ""),
        type: "cosmeticos",
        label: item.tipo?.trim() || "Cosméticos"
      }))
      .filter(p => p.imgSrc && p.title !== "Producto");

    // Lógica de Selección Aleatoria Equilibrada (3 y 3)
    let selectedPaper = randomizeArray(paperProducts);
    let selectedCosmetic = randomizeArray(cosmeticItems);

    let featuredProducts = [];

    // Intentamos tomar 3 de cada uno
    const paperCount = Math.min(3, selectedPaper.length);
    const cosmeticCount = Math.min(3, selectedCosmetic.length);

    featuredProducts.push(...selectedPaper.splice(0, paperCount));
    featuredProducts.push(...selectedCosmetic.splice(0, cosmeticCount));

    // Si faltan para llegar a 6, tomamos lo que sobre de cualquiera de las dos listas
    let remaining = 6 - featuredProducts.length;
    if (remaining > 0) {
      const leftover = [...selectedPaper, ...selectedCosmetic];
      featuredProducts.push(...randomizeArray(leftover).splice(0, remaining));
    }

    // Mezcla final para que el orden no sea siempre Papelería primero
    const finalSelection = randomizeArray(featuredProducts);

    if (finalSelection.length === 0) {
      container.innerHTML = '<p class="text-center py-8 text-slate-500">No se encontraron productos</p>';
      return;
    }

    container.innerHTML = "";
    finalSelection.forEach((product) => {
      container.appendChild(createFeaturedCard(product));
    });

    // Agregar funcionalidad a las flechas de navegación
    setupCarouselNavigation();
  } catch (error) {
    console.error("Error cargando productos destacados:", error);
    container.innerHTML = '<p class="text-center py-8 text-red-500">Error al cargar productos</p>';
  }
}

function setupCarouselNavigation() {
  const container = document.getElementById("featured-products");
  const prevButton = document.querySelector('[data-icon="chevron_left"]')?.closest("button");
  const nextButton = document.querySelector('[data-icon="chevron_right"]')?.closest("button");

  if (!container || !prevButton || !nextButton) return;

  const scrollDistance = 320; // min-w-[300px] + gap-8

  prevButton.addEventListener("click", () => {
    container.scrollBy({
      left: -scrollDistance,
      behavior: "smooth",
    });
  });

  nextButton.addEventListener("click", () => {
    container.scrollBy({
      left: scrollDistance,
      behavior: "smooth",
    });
  });
}

function createFeaturedCard(product) {
  const link = product.type === "cosmeticos" ? "Cosmeticos.html" : "Productos.html";
  const card = document.createElement("a");
  card.href = link;
  card.className = "group bg-white rounded-xl overflow-hidden soft-shadow transition-all hover:premium-shadow min-w-[300px] w-[300px] snap-start block";
  card.innerHTML = `
    <div class="relative aspect-square overflow-hidden bg-slate-50">
      <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="${product.imgSrc || 'https://via.placeholder.com/300'}" alt="${product.title}" />
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-white text-on-background px-6 py-2 rounded-full font-button shadow-lg flex items-center justify-center gap-2">
        <span class="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
        <span class="text-sm font-button">Ver producto</span>
      </div>
    </div>
    <div class="p-6">
      <h4 class="font-h3 text-lg mb-1">${product.title}</h4>
      <p class="text-secondary font-bold text-lg">${product.price}</p>
      
    </div>
  `;
  return card;
}

function randomizeArray(array) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
