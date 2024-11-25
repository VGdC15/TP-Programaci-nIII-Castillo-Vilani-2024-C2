// Escuchar el evento submit del formulario
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validación de campos vacíos
    if (!email || !password) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Por favor, completa todos los campos.',
        });
        return;
    }

    try {
        // Enviar los datos al servidor
        const response = await fetch('http://localhost:3000/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const result = await response.text();
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: result,
            });
        } else {
            // Manejo de errores desde el servidor
            const errorText = await response.text();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorText,
            });
        }
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: 'No se pudo conectar al servidor. Inténtalo más tarde.',
        });
    }
});
