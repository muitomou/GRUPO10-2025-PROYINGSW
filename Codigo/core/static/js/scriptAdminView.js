document.getElementById('subirBoletinForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Evita que el formulario se envíe de la manera tradicional

    // Obtiene la URL base dinámicamente
    const baseUrl = window.location.origin;

    // Crea un objeto FormData con los datos del formulario
    const formData = new FormData();
    formData.append('titulo', document.getElementById('titulo').value);
    formData.append('descripcion', document.getElementById('descripcion').value);
    formData.append('archivo_pdf', document.getElementById('archivo_pdf').files[0]);
    formData.append('imagen', document.getElementById('imagen').files[0]);

    try {
        const response = await fetch('0.0.0.0:8000/api/boletines/', {
            method: 'POST',
            headers: {
                // El CSRF token no es necesario en headers cuando usas FormData
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error al enviar el formulario');
        }

        const result = await response.json();
        document.getElementById('responseMessage').innerText = `Boletín creado: ${result.titulo}`;
    } catch (error) {
        document.getElementById('responseMessage').innerText = `Error: ${error.message}`;
    }
});

// Función para obtener el CSRF token del cookie
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
