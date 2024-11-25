function loadCategorias() {
    fetch('/api/categorias/')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener las categorías: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const categoriaSelect = document.getElementById('categoriaSelect');
            if (!categoriaSelect) {
                console.error("Elemento 'categoriaSelect' no encontrado en el DOM.");
                return;
            }

            categoriaSelect.innerHTML = ''; // Limpia el select
            data.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.id;
                option.textContent = categoria.nombre;
                categoriaSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar categorías:', error));
}

function loadRegiones() {
    fetch('/api/regiones/')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener las regiones: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const regionSelect = document.getElementById('lista-categorias');
            if (!regionSelect) {
                console.error("Elemento 'lista-categorias' no encontrado en el DOM.");
                return;
            }

            regionSelect.innerHTML = ''; // Limpia el select
            data.forEach(region => {
                const option = document.createElement('option');
                option.value = region.id;
                option.textContent = region.nombre;
                regionSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar regiones:', error));
}



document.getElementById('categoriaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('categoria_nombre').value;
    fetch('/api/categorias/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': '{{ csrf_token }}' // Asegúrate de incluir el token CSRF si es necesario
        },
        body: JSON.stringify({ nombre })
    })
    .then(response => response.json())
    .then(() => {
        loadCategorias(); // Recargar las categorías
        document.getElementById('categoriaForm').reset(); // Limpiar el formulario
    });
});

// Función para eliminar una categoría
function deleteCategoria(categoriaId) {
    fetch(`/api/categorias/${categoriaId}/`, {
        method: 'DELETE',
        headers: {
            'X-CSRFToken': '{{ csrf_token }}'
        }
    })
    .then(() => {
        loadCategorias(); // Recargar las categorías después de eliminar
    });
}

function renderizarRegiones(regiones) {
    const regionList = document.getElementById('regionList');
    if (!regionList) {
        console.error("Elemento 'regionList' no encontrado en el DOM.");
        return;
    }

    regionList.innerHTML = ''; // Limpia la lista existente

    regiones.forEach(region => {
        const div = document.createElement('div');
        div.classList.add('form-check');
        div.innerHTML = `
            <input 
                class="form-check-input" 
                type="checkbox" 
                name="regiones[]" 
                value="${region.id}" 
                id="region${region.id}">
            <label class="form-check-label" for="region${region.id}">
                ${region.nombre}
            </label>
        `;
        regionList.appendChild(div);
    });
}

function obtenerRegiones() {
    fetch('/api/regiones/')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener las regiones: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const regionSelect = document.getElementById('lista-categorias');
            if (!regionSelect) {
                console.error("Elemento 'lista-categorias' no encontrado en el DOM.");
                return;
            }

            regionSelect.innerHTML = ''; // Limpia el select
            data.forEach(region => {
                const option = document.createElement('option');
                option.value = region.id;
                option.textContent = region.nombre;
                regionSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar regiones:', error));
}
// Función para guardar las regiones seleccionadas



function obtenerCategorias() {
    fetch('/api/categorias/') // Reemplaza con el endpoint correcto de tu API
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener las categorías: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Categorías obtenidas:', data); // Aquí puedes inspeccionar los datos recibidos
            mostrarCategorias(data); // Llama a una función para mostrar las categorías (opcional)
        })
        .catch(error => {
            console.error('Error al obtener categorías:', error);
        });
}

// Función opcional para renderizar categorías en el DOM
function mostrarCategorias(categorias) {
    const categoriaList = document.getElementById('lista-categorias');
    categoriaList.innerHTML = '';
    categorias.forEach(categoria => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.innerHTML = `
            ${categoria.nombre}
            <button class="btn btn-danger btn-sm" onclick="deleteCategoria(${categoria.id})">Eliminar</button>
        `;
        categoriaList.appendChild(li);
    });
}

// Llama a la función al cargar la página
document.addEventListener('DOMContentLoaded', obtenerCategorias);
document.addEventListener('DOMContentLoaded', obtenerRegiones);
document.addEventListener('DOMContentLoaded', loadCategorias);
document.addEventListener('DOMContentLoaded', loadRegiones);




