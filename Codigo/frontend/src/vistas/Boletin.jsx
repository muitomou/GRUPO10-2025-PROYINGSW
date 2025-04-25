import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BoletinDetalle = () => {
  const { id } = useParams(); // Get the boletin ID from the URL
  const [boletin, setBoletin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBoletin = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/boletines/${id}/`);
        setBoletin(response.data);
      } catch (err) {
        setError(err.message || "Error al cargar el boletín");
      } finally {
        setLoading(false);
      }
    };

    fetchBoletin();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando boletín...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mt-3">{boletin.titulo}</h1>
      <p>
        <strong>Categorías:</strong>{" "}
        {boletin.categorias.map((categoria, index) => (
          <span key={index} className="badge bg-primary me-1">
            {categoria}
          </span>
        ))}
      </p>
      <p>
        <strong>Regiones:</strong>{" "}
        {boletin.regiones.map((region, index) => (
          <span key={index}>
            {region}
            {index < boletin.regiones.length - 1 && ", "}
          </span>
        ))}
      </p>

      <div className="row mt-4">
        <div className="col-md-4">
          <img
            src={boletin.imagen}
            alt="Portada del boletín"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-8">
          <p>
            <strong>Tipo de recurso:</strong> Boletín de vigilancia
          </p>
          <p>
            <strong>Año de publicación:</strong> {boletin.fecha_publicacion}
          </p>
          <a
            href={boletin.archivo_pdf}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Descargar PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default BoletinDetalle;
