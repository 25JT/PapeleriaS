document.addEventListener("DOMContentLoaded", function() {
    const products = [
        { title: "Borradores", price: "$400", imgSrc: "Img/Papeleria/borrador.png", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Cuaderno", price: "$4.200", imgSrc: "Img/Papeleria/cuaderno.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Marcadores", price: "$3.200", imgSrc: "Img/Papeleria/marcadores.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Fomi 1/8 paquete diversos colores", price: "$600", imgSrc: "Img/Papeleria/fomi.png", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Lapiceros en azul negro y rojo", price: "$1.200", imgSrc: "Img/Papeleria/lapicero-de-punta-fina-0ffi-Esco-vertical.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Ega en barra", price: "$2.400", imgSrc: "Img/Papeleria/ega en barra.png", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Carton Paja", price: "$500", imgSrc: "Img/Papeleria/cartonpaja.webp", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Plastilina por Unidad", price: "$800", imgSrc: "Img/Papeleria/plasuni.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Carpeta Blanca", price: "$500", imgSrc: "Img/Papeleria/carpeta.png", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Carpeta", price: "$5.000", imgSrc: "Img/Papeleria/carpetas.webp", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Cartuchera", price: "$2.500", imgSrc: "Img/Papeleria/cartuchera.webp", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Cartulina", price: "$200", imgSrc: "Img/Papeleria/cartulina.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Cartulina plana", price: "$500", imgSrc: "Img/Papeleria/cartulina-fuertes.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Cintas", price: "$2.500", imgSrc: "Img/Papeleria/cinta.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Colores", price: "$8.500", imgSrc: "Img/Papeleria/colores.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Corrector", price: "$1.600", imgSrc: "Img/Papeleria/corrector.webp", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Hoja de vida", price: "$800", imgSrc: "Img/Papeleria/Hoja de vida.webp", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Lapiz", price: "$1.200", imgSrc: "Img/Papeleria/lapiz.webp", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },        
        { title: "Papelillo", price: "$200", imgSrc: "Img/Papeleria/papelillo.webp", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Papel Regalo", price: "$800", imgSrc: "Img/Papeleria/papelR.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Plumones", price: "$3.000", imgSrc: "Img/Papeleria/plumones.webp", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Talonario de rifa", price: "$1.000", imgSrc: "Img/Papeleria/rifa.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Sacapuntas", price: "$300", imgSrc: "Img/Papeleria/sacapunta.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Sobre de manila carta", price: "$400", imgSrc: "Img/Papeleria/sobreM.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Sobre de manila oficio", price: "$500", imgSrc: "Img/Papeleria/oficio.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Temperas por unidad", price: "$1.100", imgSrc: "Img/Papeleria/temperas.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Temperas en caja", price: "$3.000", imgSrc: "Img/Papeleria/cajatemp.webp", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Alcancias", price: "$1.000", imgSrc: "Img/Papeleria/alcancia.webp", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Block carta", price: "$3.500", imgSrc: "Img/Papeleria/blockCarta.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Block oficio", price: "$4.700", imgSrc: "Img/Papeleria/blockOficio.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Recibo de caja menor", price: "$1.000", imgSrc: "Img/Papeleria/cajamenor.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Carpeta Cafe", price: "$500", imgSrc: "Img/Papeleria/carpetacafe.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Escuadras", price: "$2.500", imgSrc: "Img/Papeleria/escuadras.webp", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Formato comercial", price: "$2.500", imgSrc: "Img/Papeleria/formato comercial.webp", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Tablas periodicas", price: "$2.000", imgSrc: "Img/Papeleria/image.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Lapiz rojo", price: "$1.600", imgSrc: "Img/Papeleria/lapizrojo.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Marcadores borrables", price: "$2.500", imgSrc: "Img/Papeleria/mbpelikan.webp", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Grapadora pequeña", price: "$2.600", imgSrc: "Img/Papeleria/mini-grap.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Papel bond", price: "$2.500", imgSrc: "Img/Papeleria/papel bond.webp", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Papel carbon", price: "$800", imgSrc: "Img/Papeleria/papel carbon.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Papel Crepe", price: "$1.000", imgSrc: "Img/Papeleria/papelcrepe.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Papel Fotografico", price: "$2.000", imgSrc: "Img/Papeleria/papelfoto.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Papel Kraft", price: "$1.200", imgSrc: "Img/Papeleria/papelkraft.png", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },          
        { title: "Block milimetrado", price: "$14.000", imgSrc: "Img/Papeleria/papelmilimetrado.webp", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Resaltadores", price: "$2.500", imgSrc: "Img/Papeleria/resaltadores.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Silicona delgada", price: "$600", imgSrc: "Img/Papeleria/silicona delgada.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Silicona gruesa", price: "$800", imgSrc: "Img/Papeleria/silicona gruesa.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Silicona liquida", price: "$3.200", imgSrc: "Img/Papeleria/siliconaliquida.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Sobre de regalo", price: "$200", imgSrc: "Img/Papeleria/sobre de regalo.png", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Sobre de regalo con diseño", price: "$1.200", imgSrc: "Img/Papeleria/sobreDise.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Tabla de plastilina", price: "$5.000", imgSrc: "Img/Papeleria/tabla-plastilina.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Talonario de recibo", price: "$1.000", imgSrc: "Img/Papeleria/talon.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Caja de tapa bocas", price: "$10.000", imgSrc: "Img/Papeleria/tapabocas.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Tijeras", price: "$1.000", imgSrc: "Img/Papeleria/tijeras.webp", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Escarchas en tubos", price: "$800", imgSrc: "Img/Papeleria/tubosdeescarcha.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Huellero", price: "$3.000", imgSrc: "Img/Papeleria/huellero.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Sacapunta doble", price: "$1.000", imgSrc: "Img/Papeleria/sacaputa doble.webp", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "Cinta de enmascarar", price: "$2.600", imgSrc: "Img/Papeleria/citnaMas.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
        { title: "plastilinas en unidad 12 ", price: "$2.600", imgSrc: "Img/Papeleria/citnaMas.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
    ];

    products.sort((a, b) => a.title.localeCompare(b.title));

    const container = document.getElementById("product-container");
    const searchInput = document.getElementById("search-input");

    function displayProducts(filteredProducts) {
        container.innerHTML = "";
        filteredProducts.forEach(product => {
            const colDiv = document.createElement("div");
            colDiv.className = "col-md-4 mb-4";

            const cardDiv = document.createElement("div");
            cardDiv.className = "card";

            const link = document.createElement("a");
            link.href = product.link;
            link.target = "_blank";

            const img = document.createElement("img");
            img.className = "card-img-top";
            img.src = product.imgSrc;
            img.alt = product.title;

            const cardBody = document.createElement("div");
            cardBody.className = "card-body text-center";

            const cardTitle = document.createElement("h5");
            cardTitle.className = "card-title";
            cardTitle.innerText = product.title;

            const cardText = document.createElement("p");
            cardText.className = "card-text";
            cardText.innerText = product.price;

            link.appendChild(img);
            cardDiv.appendChild(link);
            cardDiv.appendChild(cardBody);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            colDiv.appendChild(cardDiv);
            container.appendChild(colDiv);
        });
    }

    searchInput.addEventListener("input", function() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.title.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });

    displayProducts(products);
});