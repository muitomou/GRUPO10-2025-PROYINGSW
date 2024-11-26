function cargarRegiones() {
    console.log("Cargando Regiones")
    fetch('/api/regiones/') // Asegúrate de que esta ruta esté correctamente configurada en tu backend
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener las regiones');
            }
            return response.json();
        })
        .then(data => {
            const selectRegiones = document.getElementById('regionSelect'); // ID del select en el HTML
            selectRegiones.innerHTML = '<option value="">Seleccione una región...</option>'; // Opción inicial
            
            data.forEach(region => {
                const option = document.createElement('option');
                option.value = region.id; // Usar el ID de la región
                option.textContent = region.nombre; // Usar el nombre de la región
                selectRegiones.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Hubo un problema al cargar las regiones:', error);
        });
}

// Función para cargar las categorías en el select
function cargarCategorias() {
    console.log("Cargando Categorias")
    fetch('/api/categorias/') // Asegúrate de que esta ruta esté correctamente configurada en tu backend
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener las categorías');
            }
            return response.json();
        })
        .then(data => {
            const selectCategorias = document.getElementById('categoriaSelect'); // ID del select en el HTML
            selectCategorias.innerHTML = '<option value="">Seleccione una categoría...</option>'; // Opción inicial
            
            data.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.id; // Usar el ID de la categoría
                option.textContent = categoria.nombre; // Usar el nombre de la categoría
                selectCategorias.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Hubo un problema al cargar las categorías:', error);
        });
}


document.addEventListener('DOMContentLoaded', function() {
    cargarRegiones();
    cargarCategorias();
});