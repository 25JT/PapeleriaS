// Sistema de Animaciones Robusto - Papelería S
// Registramos el plugin solo si GSAP está cargado
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  const initAnimations = () => {
    // 1. Animación del Hero (solo si existe h1)
    const h1 = document.querySelector("h1");
    if (h1) {
      gsap.from(h1, {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power3.out",
        delay: 0.3
      });
    }

    // 2. Animación de revelación para secciones y tarjetas
    // Usamos selectores genéricos pero seguros
    const revealSelectors = ".product-card, .soft-ui-card, section > div";
    const elements = document.querySelectorAll(revealSelectors);
    
    elements.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    });

    // 3. Animación para el footer (cuando cargue)
    const footer = document.querySelector("footer");
    if (footer) {
      gsap.from(footer, {
        scrollTrigger: {
          trigger: footer,
          start: "top 95%"
        },
        opacity: 0,
        duration: 1
      });
    }
  };

  // Esperamos un poco después de DOMContentLoaded para dar tiempo a loadNav y loadFooter
  window.addEventListener("load", () => {
    // No animar en what.html
    if (window.location.pathname.includes("what.html")) return;
    initAnimations();
  });
}
