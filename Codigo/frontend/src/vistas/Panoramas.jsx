import React from "react";

const Panoramas = () => {
  return (
    <div>
      <div className="card text-bg-dark">
        <img
          src="/static/images/panoramas.jpg"
          className="card-img"
          alt="..."
          style={{ objectFit: "cover", maxHeight: "40vh" }}
        />
        <div className="card-img-overlay">
          <h5
            className="card-title fs-1"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          >
            Panoramas de Vigilancia
          </h5>
        </div>
      </div>
      <form className="row p-2 pe-4 ps-4">
        <h6>Filtrar Búsqueda:</h6>
        <div className="col-md-4">
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="regionSelect">
              Región
            </label>
            <select className="form-select" id="regionSelect">
              <option value="">Seleccione una región...</option>
              <option value="1">Metropolitana</option>
              <option value="2">Valparaíso</option>
              <option value="3">Ñuble</option>
            </select>
          </div>
        </div>
        <div className="col-md-4">
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="stationSelect">
              Estación
            </label>
            <select className="form-select" id="stationSelect">
              <option value="">Seleccione una estación...</option>
              <option value="1">Verano</option>
              <option value="2">Otoño</option>
              <option value="3">Invierno</option>
              <option value="4">Primavera</option>
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="eventSelect">
              Evento
            </label>
            <select className="form-select" id="eventSelect">
              <option value="">Seleccione un evento...</option>
              <option value="1">Incendio</option>
              <option value="2">Sequía</option>
              <option value="3">Inundación</option>
              <option value="4">Heladas</option>
            </select>
          </div>
        </div>
        <div className="col-1">
          <button className="btn btn-primary" type="submit">
            Buscar
          </button>
        </div>
      </form>
      <div className="container p-2">
        <a href="#" style={{ textDecoration: "none" }}>
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-1 p-1">
                <img
                  src="/static/images/boletin-prueba.jpg"
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-11">
                <div className="card-body">
                  <h5 className="card-title">
                    Adaptación y Mitigación al Cambio Climático. Boletín de
                    Vigilancia e Inteligencia en Innovación, N°10 septiembre
                    2024
                  </h5>
                  <p className="card-text">
                    <small className="text-body-secondary">26-sep-2024</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Panoramas;
