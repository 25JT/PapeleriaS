
const container = document.getElementById("product-container");
const searchInput = document.getElementById("search-input");
const loadMoreButton = document.getElementById("load-more-button");
const PRODUCTS_PER_PAGE = 6;
const categories = ["Lociones", "Desodorantes", "Cremas", "Talco", "Shampoo", "Productos"];

let products = [];
let filteredProducts = [];
let visibleCount = PRODUCTS_PER_PAGE;
let currentCategory = 'todos';

function renderCategoryFilters() {
  const filterContainer = document.getElementById("category-filters");
  if (!filterContainer) return;

  filterContainer.innerHTML = "";

  // Opción "Todos"
  const allBtn = createFilterButton("Todos", "todos");
  filterContainer.appendChild(allBtn);

  // Generar botones para las categorías definidas
  categories.sort().forEach(cat => {
    const label = cat.charAt(0).toUpperCase() + cat.slice(1);
    const btn = createFilterButton(label, cat.toLowerCase());
    filterContainer.appendChild(btn);
  });
}

function createFilterButton(label, value) {
  const btn = document.createElement("button");
  const isActive = currentCategory === value;
  btn.className = `px-6 py-2 rounded-full text-sm font-semibold transition-all border-2 whitespace-nowrap ${isActive
    ? "bg-rose-500 text-white border-rose-500 shadow-md"
    : "bg-white text-slate-600 border-slate-200 hover:border-rose-200 hover:bg-rose-50"
    }`;
  btn.textContent = label;
  btn.onclick = () => {
    currentCategory = value;
    renderCategoryFilters();
    applySearch();
  };
  return btn;
}

function createWhatsAppButton(productTitle) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-600";
  button.textContent = "Compra por WhatsApp";
  button.onclick = () => sendWhatsAppMessage(productTitle);
  return button;
}

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "rounded-[2rem] border border-slate-200 bg-white shadow-[0_25px_60px_-30px_rgba(15,23,42,0.35)] overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_-20px_rgba(15,23,42,0.25)]";

  const imageWrapper = document.createElement("div");
  imageWrapper.className = "relative aspect-[4/3] overflow-hidden bg-slate-100";

  const img = document.createElement("img");
  img.className = "h-full w-full object-cover";
  img.src = product.imgSrc || "Img/fondos/cosmeticos.webp";
  img.alt = product.title;
  imageWrapper.appendChild(img);

  const cardBody = document.createElement("div");
  cardBody.className = "p-6";

  const badge = document.createElement("span");
  badge.className = "inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700";
  badge.textContent = product.tipo.charAt(0).toUpperCase() + product.tipo.slice(1);

  const title = document.createElement("h3");
  title.className = "mt-4 text-lg font-semibold text-slate-900";
  title.textContent = product.title;

  const description = document.createElement("p");
  description.className = "mt-3 text-sm leading-6 text-slate-600";
  description.textContent = product.description || "Descripción no disponible.";

  const price = document.createElement("p");
  price.className = "mt-4 text-lg font-bold text-slate-900";
  price.textContent = product.price;

  const button = createWhatsAppButton(product.title);

  cardBody.appendChild(badge);
  cardBody.appendChild(title);
  cardBody.appendChild(description);
  cardBody.appendChild(price);
  cardBody.appendChild(button);

  card.appendChild(imageWrapper);
  card.appendChild(cardBody);
  return card;
}

function updateLoadMoreButton(totalItems) {
  if (!loadMoreButton) return;
  loadMoreButton.style.display = totalItems > visibleCount ? "inline-flex" : "none";
}

function displayProducts(items) {
  if (!container) return;
  container.innerHTML = "";

  if (!items.length) {
    const emptyState = document.createElement("div");
    emptyState.className = "col-span-3 text-center py-16";
    emptyState.innerHTML = `<p class="text-base font-semibold text-slate-500">No se encontraron productos con ese nombre.</p>`;
    container.appendChild(emptyState);
    updateLoadMoreButton(0);
    return;
  }

  const visibleItems = items.slice(0, visibleCount);
  visibleItems.forEach(product => container.appendChild(createProductCard(product)));
  updateLoadMoreButton(items.length);
}

function sendWhatsAppMessage(productName) {
  const phoneNumber = "3014414701";
  const message = encodeURIComponent(`Hola, estoy interesado en comprar: ${productName}. ¿Está disponible?`);
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
}

function fixDriveUrl(driveUrl) {
  if (!driveUrl) return "";
  const match = driveUrl.match(/(?:id=|\/d\/)([a-zA-Z0-9_-]+)(?:\/view|\?|$)/);
  return match && match[1] ? `https://drive.google.com/thumbnail?export=view&id=${match[1]}` : driveUrl;
}

function applySearch() {
  if (!searchInput) return;
  const searchTerm = searchInput.value.trim().toLowerCase();
  visibleCount = PRODUCTS_PER_PAGE;

  filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm);
    const matchesCategory = currentCategory === 'todos' || product.tipo.toLowerCase() === currentCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  displayProducts(filteredProducts);
}

function loadMoreProducts() {
  visibleCount += PRODUCTS_PER_PAGE;
  displayProducts(filteredProducts.length ? filteredProducts : products);
}

if (searchInput) {
  searchInput.addEventListener("input", applySearch);
}

if (loadMoreButton) {
  loadMoreButton.addEventListener("click", loadMoreProducts);

  // Implementación de Scroll Infinito
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && loadMoreButton.style.display !== "none") {
        loadMoreProducts();
      }
    });
  }, observerOptions);

  observer.observe(loadMoreButton);
}

fetch("https://api-protection-cnkp.vercel.app/inventario/productos")
  .then(response => response.json())
  .then(data => {


    const items = Array.isArray(data)

      ? data
      : Array.isArray(data.values)
        ? data.values.slice(1)
        : Object.values(data);
    console.log(items.value);
    if (!Array.isArray(items) || items.length === 0) {
      console.error("❌ No se encontraron datos válidos en la API.");
      if (container) {
        container.innerHTML = `<div class="col-span-3 text-center py-16"><p class="text-base font-semibold text-slate-500">No hay productos disponibles en este momento.</p></div>`;
      }
      return;
    }

    products = items
      .map(item => ({
        title: item.title?.trim() || "Sin nombre",
        price: item.price?.trim() || "N/A",
        tipo: item.tipo?.trim() || "Productos",
        imgSrc: fixDriveUrl(item.imgSrc?.trim() || ""),
        description: item.paquetes?.trim() || item.colores?.trim() || "Cuida tu piel con la mejor calidad Yanbal.",
      }))
      .filter(product => categories.some(cat =>
        cat.toLowerCase() === product.tipo.toLowerCase() ||
        product.tipo.toLowerCase().includes(cat.toLowerCase().replace(/s$/, ''))
      ));

    filteredProducts = products.slice();
    renderCategoryFilters();
    displayProducts(products);
  })
  .catch(error => {
    console.error("🚨 Error con la API:", error);
    if (container) {
      container.innerHTML = `<div class="col-span-3 text-center py-16"><p class="text-base font-semibold text-slate-500">Error al cargar los productos. Intenta nuevamente más tarde.</p></div>`;
    }
  });


