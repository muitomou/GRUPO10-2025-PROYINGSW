import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CrearBoletin() {
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        archivo_pdf: null,
        imagen: null,
        regiones: [],
        categorias: []
    });
    const [regionesOptions, setRegionesOptions] = useState([]);
    const [categoriasOptions, setCategoriasOptions] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Cargar opciones al montar el componente
    React.useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [regionesRes, categoriasRes] = await Promise.all([
                    axios.get('http://localhost:8000/api/regiones/'),
                    axios.get('http://localhost:8000/api/categorias/')
                ]);
                // Manejar tanto paginación como listas simples
                setRegionesOptions(regionesRes.data.results || regionesRes.data);
                setCategoriasOptions(categoriasRes.data.results || categoriasRes.data);
            } catch (err) {
                console.error("Error cargando opciones:", err);
                setError('Error al cargar las opciones de regiones y categorías');
            }
        };
        fetchOptions();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData(prev => ({ ...prev, [name]: files[0] }));
    };

    const handleMultiSelect = (e) => {
        const { name, options } = e.target;
        const selected = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);
        setFormData(prev => ({ ...prev, [name]: selected }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validación básica
        if (!formData.titulo.trim()) {
            setError('El título es obligatorio');
            setLoading(false);
            return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('titulo', formData.titulo);
            formDataToSend.append('descripcion', formData.descripcion);
            
            if (formData.archivo_pdf) {
                formDataToSend.append('archivo_pdf', formData.archivo_pdf);
            }
            
            if (formData.imagen) {
                formDataToSend.append('imagen', formData.imagen);
            }
            
            // Añadir cada región y categoría individualmente
            formData.regiones.forEach(regionId => {
                formDataToSend.append('regiones', regionId);
            });
            
            formData.categorias.forEach(categoriaId => {
                formDataToSend.append('categorias', categoriaId);
            });

            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8000/api/boletines/crear/', formDataToSend, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            navigate('/boletines', { state: { success: 'Boletín creado exitosamente' } });
        } catch (err) {
            let errorMessage = 'Error al crear el boletín';
            if (err.response) {
                if (err.response.data) {
                    errorMessage = typeof err.response.data === 'object' 
                        ? JSON.stringify(err.response.data) 
                        : err.response.data;
                }
                if (err.response.status === 401) {
                    errorMessage = 'No autorizado - Por favor inicie sesión nuevamente';
                }
            }
            setError(errorMessage);
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Crear Nuevo Boletín</h2>
                            
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="titulo" className="form-label">Título *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="titulo"
                                        name="titulo"
                                        value={formData.titulo}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                                    <textarea
                                        className="form-control"
                                        id="descripcion"
                                        name="descripcion"
                                        rows="4"
                                        value={formData.descripcion}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="archivo_pdf" className="form-label">Archivo PDF</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="archivo_pdf"
                                        name="archivo_pdf"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="imagen" className="form-label">Imagen</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="imagen"
                                        name="imagen"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="regiones" className="form-label">Regiones</label>
                                    <select
                                        multiple
                                        className="form-select"
                                        id="regiones"
                                        name="regiones"
                                        size="3"
                                        onChange={handleMultiSelect}
                                        value={formData.regiones}
                                    >
                                        {regionesOptions.map(region => (
                                            <option key={region.id} value={region.id}>
                                                {region.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    <small className="text-muted">Mantén presionado Ctrl (Windows) o Command (Mac) para seleccionar múltiples opciones</small>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="categorias" className="form-label">Categorías</label>
                                    <select
                                        multiple
                                        className="form-select"
                                        id="categorias"
                                        name="categorias"
                                        size="3"
                                        onChange={handleMultiSelect}
                                        value={formData.categorias}
                                    >
                                        {categoriasOptions.map(categoria => (
                                            <option key={categoria.id} value={categoria.id}>
                                                {categoria.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="d-grid gap-2">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Creando...
                                            </>
                                        ) : 'Crear Boletín'}
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-secondary"
                                        onClick={() => navigate('/boletines')}
                                        disabled={loading}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}