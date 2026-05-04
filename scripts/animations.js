// Sistema de Animaciones Premium - Papelería S
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  window.addEventListener("load", () => {
    // 1. Animación de entrada para el Hero (títulos y texto principal)
    gsap.from("h1", {
      duration: 1,
      y: 20,
      opacity: 0,
      ease: "power3.out",
      delay: 0.1
    });

    gsap.from("h1 + p", {
      duration: 0.8,
      y: 15,
      opacity: 0,
      ease: "power3.out",
      delay: 0.3
    });

    // 2. Revelación de Secciones (Solo las que tengan la clase explícita)
    const fadeUpElements = document.querySelectorAll('.animate-fade-up');
    
    fadeUpElements.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 95%", // Se activa mucho antes para evitar que se quede invisible
          toggleActions: "play none none none"
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    });

    // 3. Efecto Stagger para Grillas de Productos/Servicios (Solo si tienen la clase .animate-grid)
    const animatedGrids = document.querySelectorAll('.animate-grid');
    animatedGrids.forEach((grid) => {
      const items = grid.children;
      if (items.length > 0) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: grid,
            start: "top 90%"
          },
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        });
      }
    });

    // 4. Animación suave para la navegación al cargar
    const nav = document.querySelector('.shared-nav-wrapper');
    if (nav) {
      gsap.from(nav, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out"
      });
    }
  });
}
