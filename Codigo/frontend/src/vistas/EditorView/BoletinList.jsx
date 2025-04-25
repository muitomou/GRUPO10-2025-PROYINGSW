import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Alert, Spinner, Modal } from 'react-bootstrap';

const BoletinList = () => {
  const [boletines, setBoletines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [boletinToDelete, setBoletinToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoletines = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/boletines/');
        const data = response.data.results || response.data;
        setBoletines(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Error al cargar los boletines');
        setBoletines([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBoletines();
  }, []);

  const handleDelete = (boletin) => {
    setBoletinToDelete(boletin);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/boletines/${boletinToDelete.id}/`,
        {
            headers: {
                'Authorization': `Token ${token}`,
            }
        }
      );
      setBoletines(boletines.filter(b => b.id !== boletinToDelete.id));
      setShowDeleteModal(false);
    } catch (err) {
      setError('Error al eliminar el boletín');
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Listado de Boletines</h2>
        <Button as={Link} to="/admin/boletines/nuevo" variant="success">
          + Nuevo Boletín
        </Button>
      </div>

      {boletines.length === 0 ? (
        <Alert variant="info">No hay boletines disponibles</Alert>
      ) : (
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {boletines.map(boletin => (
            <tr key={boletin.id}>
              <td>{boletin.id}</td>
              <td>{boletin.titulo}</td>
              <td>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={() => navigate(`/admin/boletines/editar/${boletin.id}`)}
                  className="me-2"
                >
                  Editar
                </Button>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => handleDelete(boletin)}
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
          ¿Estás seguro de que deseas eliminar el boletín "{boletinToDelete?.titulo}"?
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

export default BoletinList;
