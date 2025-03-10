const container = document.getElementById("product-container");
const searchInput = document.getElementById("search-input");

function displayProducts(filteredProducts) {
    container.innerHTML = "";

    if (filteredProducts.length === 0) {
        const noResultDiv = document.createElement("div");
        noResultDiv.className = "col-12 text-center mt-4";
        noResultDiv.innerHTML = `<h5 class="text-danger">❌ No se encontraron productos con ese nombre.</h5>`;
        container.appendChild(noResultDiv);
        return;
    }

    filteredProducts.forEach(product => {
        const colDiv = document.createElement("div");
        colDiv.className = "col-md-4 mb-4 container-card";  


        const cardDiv = document.createElement("div");
        cardDiv.className = "card h-100 shadow-sm";
      
        const img = document.createElement("img");
        img.className = "card-img-top";
        img.src = product.imgSrc;
        img.alt = product.title;
        img.style.height = "300px";
        
        img.style.width = "100%";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body text-center";
        


        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.style.textTransform = "uppercase";
        cardTitle.innerText = product.title;
        
        
        const cardText = document.createElement("p");
        cardText.className = "card-text fw-italic";
        cardText.style.textTransform = "uppercase";
        cardText.style.fontStyle = "italic";
        cardText.innerText = product.price;
        
        // Botón de WhatsApp
        const whatsappButton = document.createElement("button");
        whatsappButton.className = "btn_wpp"; // Clase personalizada
        whatsappButton.onclick = () => sendWhatsAppMessage(product.title);
        
        // Crear el párrafo con el texto dentro del botón
        const buttonText = document.createElement("p");
        buttonText.innerText = "COMPRA POR WHATSAPP";
        buttonText.style.fontStyle = "italic";
        buttonText.style.fontWeight = "bold";
        // Crear el icono de WhatsApp en SVG
        const whatsappIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        whatsappIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        whatsappIcon.setAttribute("width", "16");
        whatsappIcon.setAttribute("height", "16");
        whatsappIcon.setAttribute("fill", "currentColor");
        whatsappIcon.setAttribute("class", "bi bi-whatsapp");
        whatsappIcon.setAttribute("viewBox", "0 0 16 16");

        // Agregar el `path` dentro del SVG
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z");
        whatsappIcon.appendChild(path);
        // Agregar los elementos dentro del botón
        whatsappButton.appendChild(buttonText);
        whatsappButton.appendChild(whatsappIcon);
        
        // Agregar el botón al documento (ajusta esto según donde quieras mostrarlo)
        document.body.appendChild(whatsappButton);
        

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(whatsappButton); // Agregar botón a la tarjeta
        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBody);
        colDiv.appendChild(cardDiv);
        container.appendChild(colDiv);
    });
}

// Función para abrir WhatsApp con el mensaje prellenado
function sendWhatsAppMessage(productName) {
    const phoneNumber = "xxxxxxxx"; // Reemplaza con el número de WhatsApp del negocio
    const message = encodeURIComponent(`Hola, estoy interesado en comprar: ${productName}. ¿Está disponible?`);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, "_blank");
}

let products = [];

fetch("http://localhost:3000/inventario/papeleria")//node index.js 

    .then(response => response.json())
    .then(data => {
        //  console.log("🔍 Respuesta de la API:", data);

        if (!data || typeof data !== "object") {
            console.error("❌ No se encontraron datos válidos en la API.");
            return;
        }

        const values = Array.isArray(data.values) ? data.values : Object.values(data);
        //  console.log("✅ Datos organizados en filas:", values);

        if (!Array.isArray(values) || values.length === 0) {
            console.error("❌ No hay datos válidos en la respuesta.");
            return;
        }

        const headers = values[0] && typeof values[0] === "object" ? Object.keys(values[0]) : [];
        //   console.log("📝 Encabezados detectados:", headers);

        const productoIndex = headers.indexOf("title");
        const coloresIndex = headers.indexOf("colores");
        const paquetesIndex = headers.indexOf("paquetes");
        const precioIndex = headers.indexOf("price");
        const urlIndex = headers.indexOf("imgSrc");

        if ([productoIndex, coloresIndex, paquetesIndex, precioIndex, urlIndex].includes(-1)) {
            console.error("❌ Error: Algunos nombres de columnas no coinciden.");
            return;
        }

        function fixDriveUrl(driveUrl) {
            if (!driveUrl) return "";
            let match = driveUrl.match(/(?:id=|\/d\/)([a-zA-Z0-9_-]+)(?:\/view|\?|$)/);
            return match && match[1] ? `https://drive.google.com/thumbnail?export=view&id=${match[1]}` : driveUrl;
        }

        products = values.slice(1).map(row => ({
            title: row['title']?.trim() || "Sin nombre",
            colores: row['colores']?.trim() || "N/A",
            paquetes: row['paquetes']?.trim() || "N/A",
            price: `${row['price']?.trim() || "N/A"}`,
            imgSrc: fixDriveUrl(row['imgSrc']?.trim() || ""),
        }));

        //  console.log("📦 Productos procesados:", products);
        products.sort((a, b) => a.title.localeCompare(b.title));
        displayProducts(products);
    })
    .catch(error => console.error("🚨 Error con la API:", error));

searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
});

