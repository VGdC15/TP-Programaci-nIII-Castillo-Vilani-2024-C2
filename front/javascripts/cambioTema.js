let modeToggler = document.getElementById("mode-toggler");
let html = document.getElementsByTagName("html")[0];

// OBTENEMOS LAS HOJAS DE ESTILO DINÁMICAMENTE
let hojasEstiloClaras = document.querySelectorAll("link[href*='stylesheets/']");
let hojasEstiloOscuras = document.querySelectorAll("link[href*='stylesheetsOscuro/']");


window.onload = () => {
  const theme = localStorage.getItem("theme");

  switch (theme) {
    case "dark":
      html.setAttribute("data-bs-theme", "dark");

      hojasEstiloClaras.forEach((hoja) => (hoja.disabled = true));
      hojasEstiloOscuras.forEach((hoja) => (hoja.disabled = false));
      break;
    case "light":
      html.setAttribute("data-bs-theme", "light");

      hojasEstiloClaras.forEach((hoja) => (hoja.disabled = false));
      hojasEstiloOscuras.forEach((hoja) => (hoja.disabled = true));
      break;
    default:

      html.setAttribute("data-bs-theme", "light");

      hojasEstiloClaras.forEach((hoja) => (hoja.disabled = false));
      hojasEstiloOscuras.forEach((hoja) => (hoja.disabled = true));
      break;
  }
};

modeToggler.addEventListener("click", () => {
  if (html.getAttribute("data-bs-theme") == "light") {
    html.setAttribute("data-bs-theme", "dark");

    hojasEstiloClaras.forEach((hoja) => (hoja.disabled = true));
    hojasEstiloOscuras.forEach((hoja) => (hoja.disabled = false));
    localStorage.setItem("theme", "dark");
  } else {

    html.setAttribute("data-bs-theme", "light");
    hojasEstiloClaras.forEach((hoja) => (hoja.disabled = false));
    hojasEstiloOscuras.forEach((hoja) => (hoja.disabled = true));

    localStorage.setItem("theme", "light");
  }
});



