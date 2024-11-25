// Hacer la petición a la API para obtener los boletines
function obtenerBoletines() {
    fetch('/api/boletines/') // No es necesario agregar "api" si ya está configurado en el router
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los boletines');
            }
            return response.json();
        })
        .then(data => {
            mostrarBoletines(data); // Función para mostrar los boletines en la vista
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
        });
}

// Función para mostrar los boletines en la vista
function mostrarBoletines(boletines) {
    const listaBoletines = document.getElementById('lista-boletines');
    listaBoletines.innerHTML = ''; // Limpiar la lista actual

    boletines.forEach(boletin => {
        const card = document.createElement('a');
        card.href = `/boletines/${boletin.id}/`;
        card.style.textDecoration = 'none';

        const cardBody = document.createElement('div');
        cardBody.classList.add('card', 'mb-3');
        
        const row = document.createElement('div');
        row.classList.add('row', 'g-0');
        
        // Columna para la imagen
        const colImagen = document.createElement('div');
        colImagen.classList.add('col-md-1', 'p-1');
        const imagen = document.createElement('img');
        imagen.src = boletin.imagen; // Asegúrate de que el campo imagen sea una URL
        imagen.classList.add('img-fluid', 'rounded-start');
        imagen.alt = 'Imagen del boletín';
        colImagen.appendChild(imagen);
        
        // Columna para los detalles del boletín
        const colDetalle = document.createElement('div');
        colDetalle.classList.add('col-md-11');
        
        const cardBodyInner = document.createElement('div');
        cardBodyInner.classList.add('card-body');
        
        const titulo = document.createElement('h5');
        titulo.classList.add('card-title');
        titulo.textContent = boletin.titulo; // Título del boletín

        const descripcion = document.createElement('p');
        descripcion.classList.add('card-text');
        descripcion.textContent = boletin.descripcion; // Descripción del boletín
        
        const fecha = document.createElement('small');
        fecha.classList.add('text-body-secondary');
        fecha.textContent = boletin.fecha_publicacion; // Fecha de publicación
        
        cardBodyInner.appendChild(titulo);
        cardBodyInner.appendChild(descripcion);
        cardBodyInner.appendChild(fecha);

        
        colDetalle.appendChild(cardBodyInner);
        
        // Añadir columnas a la fila
        row.appendChild(colImagen);
        row.appendChild(colDetalle);
        
        // Añadir la fila al cuerpo de la tarjeta
        cardBody.appendChild(row);

        // Añadir la tarjeta a la lista de boletines
        card.appendChild(cardBody);
        listaBoletines.appendChild(card);
    });
}

// Función para cargar las regiones en el select
function cargarRegiones() {
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

// Llamar a las funciones para cargar datos en los select
window.onload = function() {
    cargarRegiones();
    cargarCategorias();
    obtenerBoletines(); // Ya definida para los boletines
};
