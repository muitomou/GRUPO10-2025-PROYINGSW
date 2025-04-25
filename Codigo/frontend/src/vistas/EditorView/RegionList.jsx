import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Alert, Spinner, Modal } from 'react-bootstrap';

const RegionList = () => {
  const [regiones, setRegiones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [regionToDelete, setRegionToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegiones = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/regiones/');
        const data = response.data.results || response.data;
        setRegiones(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Error al cargar las regiones');
        setRegiones([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRegiones();
  }, []);

  const handleDelete = (region) => {
    setRegionToDelete(region);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/regiones/${regionToDelete.id}/`,{
        headers: {
          'Authorization': `Token ${token}`,
        }
      });
      setRegiones(regiones.filter(r => r.id !== regionToDelete.id));
      setShowDeleteModal(false);
    } catch (err) {
      setError('Error al eliminar la región');
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Listado de Regiones</h2>
        <Button as={Link} to="/admin/regiones/nueva" variant="success">
          + Nueva Región
        </Button>
      </div>

      {regiones.length === 0 ? (
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
          {regiones.map(region => (
            <tr key={region.id}>
              <td>{region.id}</td>
              <td>{region.nombre}</td>
              <td>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={() => navigate(`/admin/regiones/editar/${region.id}`)}
                  className="me-2"
                >
                  Editar
                </Button>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => handleDelete(region)}
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
          ¿Estás seguro de que deseas eliminar la región "{regionToDelete?.nombre}"?
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

export default RegionList;