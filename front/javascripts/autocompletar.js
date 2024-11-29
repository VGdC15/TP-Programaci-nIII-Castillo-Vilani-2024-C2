import Swal from "../node_modules/sweetalert2/dist/sweetalert2.esm.all.js";

document.addEventListener("DOMContentLoaded", () => {
    const autocompletarBoton = document.getElementById("Autocompletar");
    autocompletarBoton.addEventListener("click", autocompletar);
});

async function autocompletar() {
    try {
        const response = await fetch("http://localhost:3000/usuario/autocompletar");
        console.log("Response status:", response.status);
        if (!response.ok) {
            throw new Error("Error al autocompletar.");
        }

        const data = await response.json();
        if (data.success) {
            // Rellena los campos del formulario
            document.getElementById("email").value = data.email;
            document.getElementById("password").value = data.password;
        } else {
            Swal.fire({
                icon: "info",
                title: "Sin datos",
                text: "No se encontraron usuarios para autocompletar.",
                confirmButtonText: "Aceptar",
            });
        }
    } catch (error) {
        console.error("Error:", error);
        Swal.fire({
            icon: "error",
            title: "Error al autocompletar",
            text: error.message || "Ocurrió un error al intentar autocompletar los datos.",
            confirmButtonText: "Aceptar",
        });
    }
}