//Lociones
document.addEventListener("DOMContentLoaded", function () {
    const products = [
      { title: "Blue", price: "$80.000", imgSrc: "Img/Lociones/lociones/blue locion.jpg", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Musk-Fresh", price: "$40.000", imgSrc: "Img/Lociones/lociones/Musk-Fresh.jpg", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Nitro", price: "$40.000", imgSrc: "Img/Lociones/lociones/nitro.png", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Adrenaline", price: "$80.000", imgSrc: "Img/Lociones/lociones/adrenaline roja.jpg", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Adrenaline EAU DE TOILETTE", price: "$80.000", imgSrc: "Img/Lociones/lociones/adrenaline.jpg", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Alpha", price: "$80.000", imgSrc: "Img/Lociones/lociones/alpha.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Blue Glacial", price: "$80.000", imgSrc: "Img/Lociones/lociones/blueGlacial.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Comando", price: "$20.000", imgSrc: "Img/Lociones/lociones/comando.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Dancing", price: "$40.000", imgSrc: "Img/Lociones/lociones/dancing.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Dream cambiar foto", price: "$65.000", imgSrc: "Img/Lociones/lociones/dream.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Empire", price: "$80.000", imgSrc: "Img/Lociones/lociones/empire lebel.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Homme", price: "$90.000", imgSrc: "Img/Lociones/lociones/homme.jpeg", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "ID", price: "$70.000", imgSrc: "Img/Lociones/lociones/id.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Liassion", price: "$80.000", imgSrc: "Img/Lociones/lociones/liassion.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Limage", price: "$60.000", imgSrc: "Img/Lociones/lociones/limage.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Nitro Ocean", price: "$45.000", imgSrc: "Img/Lociones/lociones/nitroOcean.jpeg", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Red power", price: "$80.000", imgSrc: "Img/Lociones/lociones/real power.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Senses", price: "$20.000", imgSrc: "Img/Lociones/lociones/sense.png", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Soy Sexy", price: "$30.000", imgSrc: "Img/Lociones/lociones/soy sexy.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Sweet Black exclusive", price: "$36.000", imgSrc: "Img/Lociones/lociones/sweet black cyzone exclusive.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Vibranza", price: "$60.000", imgSrc: "Img/Lociones/lociones/vibranza.jpg", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Mitica", price: "$80.000", imgSrc: "Img/Lociones/lociones/mitica.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Minichips", price: "$20.000", imgSrc: "Img/Lociones/lociones/minichips.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Mon l'bel gold", price: "$80.000", imgSrc: "Img/Lociones/lociones/mon l'bel gold.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Dancing night", price: "$40.000", imgSrc: "Img/Lociones/lociones/dancing night.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Selecto", price: "$80.000", imgSrc: "Img/Lociones/lociones/select.jpg", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Sunset", price: "$54.000", imgSrc: "Img/Lociones/lociones/sunset.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Prinset", price: "$25.000", imgSrc: "Img/Lociones/lociones/print.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Winner", price: "$65.000", imgSrc: "Img/Lociones/lociones/winner.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Agu regrescante", price: "$55.000", imgSrc: "Img/Lociones/lociones/agur.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },

    ];

    const container = document.getElementById("loci");
    const pagination = document.getElementById("pagination");

    const itemsPerPage = 6;
    let currentPage = 1;

    function displayProducts(page) {
      container.innerHTML = "";
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedProducts = products.slice(start, end);

      paginatedProducts.forEach(product => {
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

    function updatePagination() {
      pagination.innerHTML = "";
      const pageCount = Math.ceil(products.length / itemsPerPage);
      for (let i = 1; i <= pageCount; i++) {
        const pageItem = document.createElement("li");
        pageItem.className = "page-item" + (i === currentPage ? " active" : "");
        const pageLink = document.createElement("a");
        pageLink.className = "page-link";
        pageLink.href = "#";
        pageLink.innerText = i;
        pageLink.addEventListener("click", function (event) {
          event.preventDefault();
          currentPage = i;
          displayProducts(currentPage);
          updatePagination();
        });
        pageItem.appendChild(pageLink);
        pagination.appendChild(pageItem);
      }
    }

    displayProducts(currentPage);
    updatePagination();
  });

  //Desodorante

  document.addEventListener("DOMContentLoaded", function () {
    const products = [

      { title: "You", price: "$9.000", imgSrc: "Img/Lociones/desodorante/desodorante you.jpg", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Solo", price: "$11.900", imgSrc: "Img/Lociones/desodorante/solo desodorante.jpg", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "43N°", price: "$11.900", imgSrc: "Img/Lociones/desodorante/43n.jpg", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Dendur", price: "$11.900", imgSrc: "Img/Lociones/desodorante/dendur.jpg", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "D'orsay", price: "$9.000", imgSrc: "Img/Lociones/desodorante/d'orsay.jpeg", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Effective", price: "$11.900", imgSrc: "Img/Lociones/desodorante/effective.jpeg", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Fantasia", price: "$9.000", imgSrc: "Img/Lociones/desodorante/fantaasia.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Gaia", price: "$11.900", imgSrc: "Img/Lociones/desodorante/gaia.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Leyenda", price: "$9.000", imgSrc: "Img/Lociones/desodorante/leyenda.jpeg", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Magnat", price: "$9.000", imgSrc: "Img/Lociones/desodorante/magnat deso.jpeg", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "OHM", price: "$9.000", imgSrc: "Img/Lociones/desodorante/ohm.jpg", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Pulso", price: "$9.000", imgSrc: "Img/Lociones/desodorante/puls.jpeg", link: "https://wa.me/message/OTREY67XKAE3K1" },

    ];

    const container = document.getElementById("des");
    const pagination = document.getElementById("pagdes");

    const itemsPerPage = 6;
    let currentPage = 1;

    function displayProducts(page) {
      container.innerHTML = "";
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedProducts = products.slice(start, end);

      paginatedProducts.forEach(product => {
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

    function updatePagination() {
      pagination.innerHTML = "";
      const pageCount = Math.ceil(products.length / itemsPerPage);
      for (let i = 1; i <= pageCount; i++) {
        const pageItem = document.createElement("li");
        pageItem.className = "page-item" + (i === currentPage ? " active" : "");
        const pageLink = document.createElement("a");
        pageLink.className = "page-link";
        pageLink.href = "#";
        pageLink.innerText = i;
        pageLink.addEventListener("click", function (event) {
          event.preventDefault();
          currentPage = i;
          displayProducts(currentPage);
          updatePagination();
        });
        pageItem.appendChild(pageLink);
        pagination.appendChild(pageItem);
      }
    }

    displayProducts(currentPage);
    updatePagination();
  });

  //cremas Y MAS

  document.addEventListener("DOMContentLoaded", function () {
    const products = [
      { title: "Cream durazno", price: "$38.000", imgSrc: "Img/Lociones/cremas y mas/durazno.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Bloqueador 130mg", price: "$90.000", imgSrc: "Img/Lociones/cremas y mas/bloqueador.png", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Vibranza Corporal", price: "$25.000", imgSrc: "Img/Lociones/lociones/vibranza corporal.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Botanology", price: "$16.000", imgSrc: "Img/Lociones/cremas y mas/botanology.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Cream frim", price: "$40.000", imgSrc: "Img/Lociones/lociones/cream frim.jpeg", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Demaquillador lbel", price: "$36.000", imgSrc: "Img/Lociones/cremas y mas/essential.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Jabon Intimo", price: "$10.000", imgSrc: "Img/Lociones/cremas y mas/jabon intimo.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Jabon", price: "$10.000", imgSrc: "Img/Lociones/cremas y mas/jabon.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },
      { title: "Splahs Mencoolice", price: "$25.000", imgSrc: "Img/Lociones/cremas y mas/Mencoolice.jpeg", link: "https://wa.me/message/OTREY67XKAE3K1" },

      { title: "tinturado castaño", price: "$14.000", imgSrc: "Img/Lociones/cremas y mas/tinturado.webp", link: "https://wa.me/message/OTREY67XKAE3K1" },


    ];

    const container = document.getElementById("crema");
    const pagination = document.getElementById("pagcre");

    const itemsPerPage = 6;
    let currentPage = 1;

    function displayProducts(page) {
      container.innerHTML = "";
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedProducts = products.slice(start, end);

      paginatedProducts.forEach(product => {
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

    function updatePagination() {
      pagination.innerHTML = "";
      const pageCount = Math.ceil(products.length / itemsPerPage);
      for (let i = 1; i <= pageCount; i++) {
        const pageItem = document.createElement("li");
        pageItem.className = "page-item" + (i === currentPage ? " active" : "");
        const pageLink = document.createElement("a");
        pageLink.className = "page-link";
        pageLink.href = "#";
        pageLink.innerText = i;
        pageLink.addEventListener("click", function (event) {
          event.preventDefault();
          currentPage = i;
          displayProducts(currentPage);
          updatePagination();
        });
        pageItem.appendChild(pageLink);
        pagination.appendChild(pageItem);
      }
    }

    displayProducts(currentPage);
    updatePagination();
  });