// Sistema de Animaciones Premium - Papelería S
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // 1. Animación de entrada para el Hero (títulos y texto principal)
  gsap.from("h1", {
    duration: 1.2,
    y: 30,
    opacity: 0,
    ease: "power3.out",
    delay: 0.2
  });

  gsap.from("h1 + p", {
    duration: 1,
    y: 20,
    opacity: 0,
    ease: "power3.out",
    delay: 0.4
  });

  // 2. Revelación de Secciones al hacer Scroll
  const fadeUpElements = document.querySelectorAll('.animate-fade-up, section, .product-card, .soft-ui-card');
  
  fadeUpElements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%", // Comienza cuando el elemento está al 85% de la vista
        toggleActions: "play none none none"
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });
  });

  // 3. Efecto Stagger para Grillas (Productos, Servicios)
  const grids = document.querySelectorAll('.grid');
  grids.forEach((grid) => {
    const items = grid.children;
    if (items.length > 0) {
      gsap.from(items, {
        scrollTrigger: {
          trigger: grid,
          start: "top 80%"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15, // Los elementos aparecen uno tras otro
        ease: "power2.out"
      });
    }
  });

  // 4. Animación suave para la navegación al cargar
  gsap.from(".shared-nav-wrapper", {
    y: -100,
    duration: 1,
    ease: "expo.out"
  });
});
