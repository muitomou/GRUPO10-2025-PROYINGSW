import React from 'react';
import { Link } from 'react-router-dom';
import bannerImage from '../images/banner-inicio.jpeg';
import boletinesImage from '../images/boletines.jpg';

const Home = () => {
  return (
    <div className="home-container">
      {/* Banner con imagen de fondo */}
      <div className="card text-bg-dark">
        <img 
          src={bannerImage} 
          className="card-img" 
          alt="Banner de vigilancia e inteligencia" 
          style={{ objectFit: 'cover', maxHeight: '40vh' }} 
        />
        <div className="card-img-overlay">
          <h5 
            className="card-title fs-1" 
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
          >
            Vigilancia e Inteligencia en Innovación
          </h5>
          <p className="card-text"></p>
          <p 
            className="card-text" 
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 1)' }}
          >
            <small>
              Es un espacio que entrega información resultante del proceso de vigilancia, que realiza FIA, con la finalidad de aportar al conocimiento y toma de decisiones de los distintos actores de la cadena agroalimentaria y forestal. Aquí encontrarás información en formato o del tipo Boletines, Panoramas y Estudios, los que contienen distintos tipos de información tales como; noticias, publicaciones científicas, patentes, proyectos, políticas públicas, entre otras.
            </small>
          </p>
        </div>
      </div>

      {/* Tarjetas de navegación */}
      <div className="container-fluid p-4"> {/* Cambiado a container-fluid */}
        <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-around">
          <div className="col-md-6">
            <Link to="/boletines" style={{ textDecoration: 'none' }}>
              <div className="card">
                <img 
                  src={boletinesImage} 
                  className="card-img-top" 
                  alt="Boletines de vigilancia" 
                  style={{ objectFit: 'cover', maxHeight: '30vh' }} 
                />
                <div className="card-body">
                  <h5 className="card-title">Boletines de Vigilancia e Inteligencia en Innovación</h5>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;