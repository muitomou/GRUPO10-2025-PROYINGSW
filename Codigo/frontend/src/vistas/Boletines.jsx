import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import bannerImage from '../images/banner-boletines.jpg';
import BoletinCard from '../components/BoletinCard'; // Asumo que tienes este componente
import regiones from '../data/regiones.json';

const Boletines = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [boletines, setBoletines] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Cargar categorías al montar el componente
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/categorias/');
        setCategorias(response.data.results || response.data);
      } catch (err) {
        console.error("Error cargando categorías:", err);
      }
    };
    fetchCategorias();
  }, []);

  // Cargar boletines basados en los filtros
  useEffect(() => {
    const fetchBoletines = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams(location.search);
        const search = params.get('search') || '';
        const region = params.get('region') || '';
        const category = params.get('category') || '';

        // Actualizar el estado con los valores de los parámetros
        setSearchTerm(search);
        setSelectedRegion(region);
        setSelectedCategory(category);

        // Construir la URL de la API con los parámetros
        let apiUrl = 'http://localhost:8000/api/boletines/?';
        if (search) apiUrl += `search=${search}&`;
        if (region) apiUrl += `region=${region}&`;
        if (category) apiUrl += `categoria=${category}`;

        const response = await axios.get(apiUrl);
        setBoletines(response.data.results || response.data);
      } catch (err) {
        setError(err.message || 'Error al cargar los boletines');
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoletines();
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construir los query params
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (selectedRegion) params.append('region', selectedRegion);
    if (selectedCategory) params.append('category', selectedCategory);
    
    navigate(`?${params.toString()}`);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedRegion('');
    setSelectedCategory('');
    navigate('/boletines');
  };

  return (
    <div className="boletines-container">
      {/* Banner con imagen de fondo */}
      <div className="card text-bg-dark">
        <img 
          src={bannerImage} 
          className="card-img" 
          alt="Banner de boletines" 
          style={{ objectFit: 'cover', maxHeight: '40vh' }} 
        />
        <div className="card-img-overlay d-flex align-items-center justify-content-center">
          <h5 
            className="card-title fs-1 text-center" 
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
          >
            Boletines de Vigilancia e Inteligencia en Innovación
          </h5>
        </div>
      </div>

      {/* Formulario de filtros */}
      <div className="container pt-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Filtro de búsqueda */}
            <div className="col-md-4">
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Buscar boletín por título o descripción" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Buscar boletín"
                />
              </div>
            </div>

            {/* Filtro de región */}
            <div className="col-md-3">
              <div className="input-group">
                <label className="input-group-text" htmlFor="regionSelect">Región</label>
                <select 
                  className="form-select" 
                  id="regionSelect" 
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  <option value="">Todas las regiones</option>
                  {regiones.map((region, index) => (
                    <option key={index} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filtro de categoría */}
            <div className="col-md-3">
              <div className="input-group">
                <label className="input-group-text" htmlFor="categoriaSelect">Categoría</label>
                <select 
                  className="form-select" 
                  id="categoriaSelect" 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Todas las categorías</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="col-md-2 d-flex gap-2">
              <button className="btn btn-primary flex-grow-1" type="submit">
                {loading ? 'Buscando...' : 'Buscar'}
              </button>
              <button 
                className="btn btn-outline-secondary" 
                type="button"
                onClick={resetFilters}
              >
                Limpiar
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Lista de boletines */}
      <div className="container py-4">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2">Cargando boletines...</p>
          </div>
        ) : boletines.length === 0 ? (
          <div className="alert alert-info mt-4" role="alert">
            No se encontraron boletines con los filtros seleccionados
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {boletines.map(boletin => (
              <div key={boletin.id} className="col">
                <BoletinCard data={boletin} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Boletines;