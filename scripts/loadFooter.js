const footerHtml = `
<footer class="w-full border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950">
    <div class="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-7xl mx-auto w-full gap-8">
      <div class="flex flex-col items-center md:items-start gap-4">
        <span class="text-lg font-bold text-pink-500 font-h2">Papelería S</span>
        <p class="font-['Plus_Jakarta_Sans'] text-sm text-gray-500">© 2026 Papelería S. Todos los derechos reservados.
        </p>
      </div>
      <div class="flex items-center gap-8">
        <a class="font-['Plus_Jakarta_Sans'] text-sm text-gray-400 hover:text-pink-500 transition-colors"
          href="#">Privacidad</a>
        <a class="font-['Plus_Jakarta_Sans'] text-sm text-gray-400 hover:text-pink-500 transition-colors"
          href="#">Términos</a>
        <a class="font-['Plus_Jakarta_Sans'] text-sm text-gray-400 hover:text-pink-500 transition-colors"
          href="#">Envíos</a>
        <a class="font-['Plus_Jakarta_Sans'] text-sm text-gray-400 hover:text-pink-500 transition-colors"
          href="#">FAQs</a>
      </div>
      <div class="flex items-center gap-4">
        <button class="material-symbols-outlined text-gray-400 hover:text-pink-500 transition-colors"
          data-icon="facebook">facebook</button>
        <button class="material-symbols-outlined text-gray-400 hover:text-pink-500 transition-colors"
          data-icon="camera_alt">camera_alt</button>
        <button class="material-symbols-outlined text-gray-400 hover:text-pink-500 transition-colors"
          data-icon="share">share</button>
      </div>
    </div>
  </footer>
`;

document.addEventListener("DOMContentLoaded", () => {
  // Verificar si estamos en what.html para no cargar el footer
  const currentPath = window.location.pathname.split("/").pop();
  if (currentPath === "what.html") return;

  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = footerHtml;
  } else {
    // Si no existe el placeholder, lo creamos al final del body
    const div = document.createElement("div");
    div.id = "footer-placeholder";
    div.innerHTML = footerHtml;
    document.body.appendChild(div);
  }
});
