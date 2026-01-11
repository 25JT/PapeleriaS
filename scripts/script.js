//Icono Funcion
function mesj() {
  const numeroTelefono = "573014414701"// Escribe el numero sin el + del pais ejemplo 57325426421852154
  const mensaje = document.getElementById('message-text').value
  const icono = document.getElementById('fixed-icon')
  new bootstrap.Modal(document.getElementById('exampleModal'))

  if (mensaje.trim() === "") {
    icono.style.display = 'none';
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Por favor escribe en el campo",
      confirmButtonColor: "#e96e93",
    }).then(() => {
      icono.style.display = 'block';
    });
  } else {
    const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
    mensaje = document.getElementById('message-text').value = " "
    modal.hide()
  }
}


