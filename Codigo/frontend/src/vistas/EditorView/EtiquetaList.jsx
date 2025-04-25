import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Alert, Spinner, Modal } from 'react-bootstrap';

const EtiquetaList = () => {
  const [etiquetas, setEtiquetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [etiquetaToDelete, setEtiquetaToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEtiquetas = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/etiquetas/');
        const data = response.data.results || response.data;
        setEtiquetas(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Error al cargar las etiquetas');
        setEtiquetas([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEtiquetas();
  }, []);

  const handleDelete = (etiqueta) => {
    setEtiquetaToDelete(etiqueta);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/etiquetas/${etiquetaToDelete.id}/`,{
        headers: {
          'Authorization': `Token ${token}`,
        }
      });
      setEtiquetas(etiquetas.filter(e => e.id !== etiquetaToDelete.id));
      setShowDeleteModal(false);
    } catch (err) {
      setError('Error al eliminar la etiqueta');
    }
  };

  if (loading) return (
      <div className="text-center mt-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
  );

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Listado de Etiquetas</h2>
        <Button as={Link} to="/admin/etiquetas/nueva" variant="success">
          + Nueva Etiqueta
        </Button>
      </div>

      {etiquetas.length === 0 ? (
        <Alert variant="info">No hay categorías disponibles</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {etiquetas.map(etiqueta => (
              <tr key={etiqueta.id}>
                <td>{etiqueta.id}</td>
                <td>{etiqueta.nombre}</td>
                <td>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={() => navigate(`/admin/etiquetas/editar/${etiqueta.id}`)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => handleDelete(etiqueta)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal de confirmación para eliminar */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar la etiqueta "{etiquetaToDelete?.nombre}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EtiquetaList;