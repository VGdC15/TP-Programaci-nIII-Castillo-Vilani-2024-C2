//document.addEventListener("DOMContentLoaded",()=>{
//    document.getElementById("Ingresar").addEventListener("click",()=>{
//       //Validar credenciales
//        console.log("apreto el boton");
//        window.location.href = "./abm-admin.html";
//    });
//});
import Swal from "../node_modules/sweetalert2/dist/sweetalert2.esm.all.js";


document.addEventListener("DOMContentLoaded", () => {
    // Asignar evento al botón
    const ingresarBoton = document.getElementById("Ingresar");
    ingresarBoton.addEventListener("click", ingresar);
});

async function ingresar() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validar si los campos están completos
    if (!email || !password) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Por favor, completa todos los campos.',
        });
        return;
    }

    try {
        //envío de datos al servidor
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email, password 
            })
        });

        if (response.ok) {
            const result = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Ingreso exitoso',
                text: `Bienvenido, ${result.email}`,
                confirmButtonColor: '#ee7410',
                showConfirmButton: true
            }).then(() => {
                window.location.href = "./abm-admin.html"; // Redirige a la página ABM
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error de ingreso',
                text: errorText,
            });
        }

    } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', 'No se pudo conectar con el servidor. Intenta más tarde.', 'error');
    }
       
}





