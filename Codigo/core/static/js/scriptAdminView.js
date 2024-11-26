document.getElementById('subirBoletinForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    const formData = new FormData();
    formData.append('titulo', document.getElementById('titulo').value);
    formData.append('descripcion', document.getElementById('descripcion').value);

    const archivoPdf = document.getElementById('archivo_pdf').files[0];
    const imagen = document.getElementById('imagen').files[0];
    if (archivoPdf) formData.append('archivo_pdf', archivoPdf);
    if (imagen) formData.append('imagen', imagen);

    // Añadir categorías como valores individuales
    const categoriasSeleccionadas = Array.from(document.getElementById('categoriaSelect').selectedOptions).map(option => option.value);
    categoriasSeleccionadas.forEach(categoria => formData.append('categorias', categoria));
    
    const regionesSeleccionadas = Array.from(document.getElementById('regionSelect').selectedOptions).map(option => option.value);
    regionesSeleccionadas.forEach(region => formData.append('regiones', region));

    try {
        const response = await fetch('http://localhost:8000/api/boletines/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            },
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Respuesta del servidor:', errorText);
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
