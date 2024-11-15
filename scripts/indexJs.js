
  //index papeleria

  document.addEventListener("DOMContentLoaded", function () {
    const products = [
      { title: "Borradores", price: "$400", imgSrc: "Img/Papeleria/borrador.png", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
      { title: "Cuaderno", price: "$4.200", imgSrc: "Img/Papeleria/cuaderno.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
      { title: "Marcadores", price: "$2.500", imgSrc: "Img/Papeleria/marcadores.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
      { title: "Fomi 1/8 paquete diversos colores", price: "$600", imgSrc: "Img/Papeleria/fomi.png", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
      { title: "Lapiceros en azul negro y rojo", price: "$1.200", imgSrc: "Img/Papeleria/lapicero-de-punta-fina-0ffi-Esco-vertical.jpg", link: "https://wa.me/message/Q4IDJZDEGDYYO1" },
      { title: "Ega en barra", price: "$2.400", imgSrc: "Img/Papeleria/ega en barra.png", link: "https://wa.me/message/Q4IDJZDEGDYYO1" }
    ];
  
    const container = document.getElementById("product-container");
  
    products.forEach(product => {
      const colDiv = document.createElement("div");
      colDiv.className = "col-md-4 mb-5";
  
      const cardDiv = document.createElement("div");
      cardDiv.className = "card tarjeta";
  
      const link = document.createElement("a");
      link.href = product.link;
      link.target = "_blank ";
      
  
      const img = document.createElement("img");
      img.className = "card-img-top ";
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
  });
  AOS.init();
  document.addEventListener("DOMContentLoaded", function () {
    var typed = new Typed('#PAPEL', {
      strings: ['BIENVENIDOS', 'A', 'PAPELERIA S'],
      typeSpeed: 150,
      backSpeed: 30,
      loop: true
    });
  });