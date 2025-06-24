import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BoletinCard = ({ data }) => {
  // Valores por defecto para evitar errores
  const safeData = data || {};
  const {
    id,
    titulo = 'Sin título',
    descripcion = '',
    imagen = null,
    fecha_publicacion = new Date().toISOString(),
    regiones = [],
    categorias = []
  } = safeData;
 /*
  // Manejo seguro de la descripción
  const shortDescription = descripcion 
    ? `${descripcion.substring(0, 100)}${descripcion.length > 100 ? '...' : ''}`
    : 'Sin descripción';
 */
  
  let shortDescription = 'Sin descripción';

  if (descripcion) {
    const recorte = descripcion.substring(0, 100);
    const sufijo = descripcion.length > 100 ? '...' : '';
    shortDescription = `${recorte}${sufijo}`;
  }

  // Formatear fecha
  const formattedDate = new Date(fecha_publicacion).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="card h-100 shadow-sm">
      {imagen && (
        <img 
          src={imagen} 
          className="card-img-top" 
          alt={`Portada ${titulo}`}
          style={{ height: '200px', objectFit: 'cover' }}
          onError={(e) => {
            e.target.style.display = 'none'; // Oculta la imagen si falla
          }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text text-muted">{shortDescription}</p>
        <div className="mt-auto">
          <div className="d-flex flex-wrap gap-1 mb-2">
            {/* Render seguro de regiones */}
            {Array.isArray(regiones) && regiones.map(region => (
              <span key={region?.id || region} className="badge bg-secondary">
                {region?.nombre || region}
              </span>
            ))}
            
            {/* Render seguro de categorías */}
            {Array.isArray(categorias) && categorias.map(categoria => (
              <span key={categoria?.id || categoria} className="badge bg-primary">
                {categoria?.nombre || categoria}
              </span>
            ))}
          </div>
          {id && (
            <Link to={`/boletines/${id}`} className="btn btn-outline-primary w-100">
              Ver detalles
            </Link>
          )}
        </div>
      </div>
      <div className="card-footer text-muted">
        Publicado el: {formattedDate}
      </div>
    </div>
  );
};

// Validación de props
BoletinCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    titulo: PropTypes.string,
    descripcion: PropTypes.string,
    imagen: PropTypes.string,
    fecha_publicacion: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    regiones: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          nombre: PropTypes.string
        })
      ])
    ),
    categorias: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          nombre: PropTypes.string
        })
      ])
    )
  })
};

BoletinCard.defaultProps = {
  data: {}
};

export default BoletinCard;