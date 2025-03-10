const container = document.getElementById("product-container");

const categories = [ "Lociones",   "Desodorantes", "Cremas","Talco" ,"Shampoo" , "Productos"];

function displayProductsByCategory(products) {
    container.innerHTML = "";

    categories.forEach(category => {
        const categoryProducts = products.filter(product => product.tipo === category);
        if (categoryProducts.length === 0) return;

        const categoryDiv = document.createElement("div");
        categoryDiv.className = "category-section";
        categoryDiv.innerHTML = `<h2 class="category-title" style="text-transform: uppercase;" id = "${category}">${category}</h2> <br>`;
        const rowDiv = document.createElement("div");
        rowDiv.className = "row";

        categoryProducts.forEach(product => {
            const colDiv = document.createElement("div");
            colDiv.className = "col-md-4 mb-4 container-card";

            const cardDiv = document.createElement("div");
            cardDiv.className = "card h-100 shadow-sm";

            const img = document.createElement("img");
            img.className = "card-img-top";
            img.src = fixDriveUrl(product.imgSrc);
            img.alt = product.title;
            img.style.height = "300px";
            img.style.width = "100%";

            const cardBody = document.createElement("div");
            cardBody.className = "card-body text-center";

            const cardTitle = document.createElement("h5");
            cardTitle.className = "card-title";
            cardTitle.style.textTransform = "uppercase";
            cardTitle.style.fontSize = "1.2rem";
            cardTitle.innerText = product.title;

            const cardText = document.createElement("p");
            cardText.className = "card-text fw-italic";
            cardText.innerText = product.price;

            const whatsappButton = document.createElement("button");
            whatsappButton.className = "btn_wpp";
            whatsappButton.innerText = "COMPRA POR WHATSAPP";
            whatsappButton.onclick = () => sendWhatsAppMessage(product.title);

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            cardBody.appendChild(whatsappButton);
            cardDiv.appendChild(img);
            cardDiv.appendChild(cardBody);
            colDiv.appendChild(cardDiv);
            rowDiv.appendChild(colDiv);
        });

        categoryDiv.appendChild(rowDiv);
        container.appendChild(categoryDiv);
    });
}

function sendWhatsAppMessage(productName) {
    const phoneNumber = "3014414701";
    const message = encodeURIComponent(`Hola, estoy interesado en comprar: ${productName}. ¿Está disponible?`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
}

function fixDriveUrl(driveUrl) {
    if (!driveUrl) return "";
    let match = driveUrl.match(/(?:id=|\/d\/)([a-zA-Z0-9_-]+)(?:\/view|\?|$)/);
    return match && match[1] ? `https://drive.google.com/thumbnail?export=view&id=${match[1]}` : driveUrl;
}

let products = [];
fetch("http://localhost:3000/inventario/productos")
    .then(response => response.json())
    .then(data => {
        if (!Array.isArray(data)) {
            console.error("❌ No se encontraron datos válidos en la API.");
            return;
        }
        
        products = data.map(item => ({
          
          
            title: item.title?.trim() || "Sin nombre",
            price: item.price?.trim() || "N/A",
            tipo: item.tipo?.trim() || "Desconocido",
            imgSrc: item.imgSrc?.trim() || ""
        })).filter(p => categories.includes(p.tipo));
        
        
        displayProductsByCategory(products);
    })
    .catch(error => console.error("🚨 Error con la API:", error));

searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm));
    displayProductsByCategory(filteredProducts);
});
