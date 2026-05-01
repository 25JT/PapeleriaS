
const container = document.getElementById("product-container");
const searchInput = document.getElementById("search-input");
const loadMoreButton = document.getElementById("load-more-button");
const PRODUCTS_PER_PAGE = 6;
let products = [];
let filteredProducts = [];
let visibleCount = PRODUCTS_PER_PAGE;

function createWhatsAppButton(productTitle) {
    const whatsappButton = document.createElement("button");
    whatsappButton.type = "button";
    whatsappButton.className = "mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-600";
    whatsappButton.textContent = "Compra por WhatsApp";
    whatsappButton.onclick = () => sendWhatsAppMessage(productTitle);
    return whatsappButton;
}

function createProductCard(product) {
    const card = document.createElement("article");
    card.className = "group bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 border border-outline-variant/30";

    const imageWrapper = document.createElement("div");
    imageWrapper.className = "relative aspect-square overflow-hidden bg-surface-container";

    const img = document.createElement("img");
    img.className = "w-full h-full object-cover   border border-b  group-hover:scale-105 transition-transform duration-500";
    img.src = product.imgSrc;
    img.alt = product.title;
    imageWrapper.appendChild(img);

    const cardBody = document.createElement("div");
    cardBody.className = "p-6";

    if (product.colores && product.colores !== "N/A") {
        const badge = document.createElement("span");
        badge.className = "inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-on-secondary";
        badge.textContent = product.colores;
        cardBody.appendChild(badge);
    }

    const title = document.createElement("h3");
    title.className = "mt-4 text-xl font-semibold text-on-surface";
    title.textContent = product.title;

    const description = document.createElement("p");
    description.className = "mt-3 text-sm leading-6 text-on-surface-variant";
    description.innerHTML = product.paquetes !== "N/A" ? "Cantidad disponible: " + product.paquetes : "Descripción no disponible.";

    const price = document.createElement("p");
    price.className = "mt-4 text-lg font-bold text-primary";
    price.textContent = product.price;

    const button = createWhatsAppButton(product.title);

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
    container.innerHTML = "";

    if (items.length === 0) {
        const noResultDiv = document.createElement("div");
        noResultDiv.className = "col-span-3 text-center py-8";
        noResultDiv.innerHTML = `<p class="text-base font-semibold text-on-surface-variant">❌ No se encontraron productos con ese nombre.</p>`;
        container.appendChild(noResultDiv);
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
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, "_blank");
}

function applySearch() {
    const searchTerm = searchInput.value.toLowerCase();
    visibleCount = PRODUCTS_PER_PAGE;
    filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
    );
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

fetch("https://api-protection-cnkp.vercel.app/inventario/papeleria")
    .then(response => response.json())
    .then(data => {
        if (!data || typeof data !== "object") {
            console.error("❌ No se encontraron datos válidos en la API.");
            return;
        }

        const values = Array.isArray(data.values) ? data.values : Object.values(data);
        if (!Array.isArray(values) || values.length === 0) {
            console.error("❌ No hay datos válidos en la respuesta.");
            return;
        }

        products = values.slice(1).map(row => ({
            title: row['title']?.trim() || "Sin nombre",
            colores: row['colores']?.trim() || "N/A",
            paquetes: row['paquetes']?.trim() || "N/A",
            price: `${row['price']?.trim() || "N/A"}`,
            imgSrc: (() => {
                const driveUrl = row['imgSrc']?.trim() || "";
                if (!driveUrl) return "";
                const match = driveUrl.match(/(?:id=|\/d\/)([a-zA-Z0-9_-]+)(?:\/view|\?|$)/);
                return match && match[1] ? `https://drive.google.com/thumbnail?export=view&id=${match[1]}` : driveUrl;
            })(),
        }));

        products.sort((a, b) => a.title.localeCompare(b.title));
        filteredProducts = products;
        displayProducts(products);
    })
    .catch(error => console.error("🚨 Error con la API:", error));

