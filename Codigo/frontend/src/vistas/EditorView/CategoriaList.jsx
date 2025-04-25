import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Alert, Spinner, Modal } from 'react-bootstrap';

const CategoriaList = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoriaToDelete, setCategoriaToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/categorias/');
        const data = response.data;
  
        console.log('Respuesta de la API:', data); // Agrega esto para depuración
  
        if (Array.isArray(data)) {
          setCategorias(data);
        } else if (data.results && Array.isArray(data.results)) {
          setCategorias(data.results);
        } else {
          setCategorias([]);
          setError('La respuesta de la API no tiene el formato esperado. Se recibió: ' + JSON.stringify(data));
        }
      } catch (err) {
        setError('Error al cargar las categorías: ' + err.message);
        setCategorias([]);
        console.error('Error al cargar categorías:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategorias();
  }, []);

  const handleDelete = (categoria) => {
    setCategoriaToDelete(categoria);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/categorias/${categoriaToDelete.id}/`, {
        headers: {
          'Authorization': `Token ${token}`,
      }
       });
      setCategorias(categorias.filter(c => c.id !== categoriaToDelete.id));
      setShowDeleteModal(false);
    } catch (err) {
      setError('Error al eliminar la categoría');
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
        <h2>Listado de Categorías</h2>
        <Button as={Link} to="/admin/categorias/nueva" variant="success">
          + Nueva Categoría
        </Button>
      </div>

      {categorias.length === 0 ? (
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
            {categorias.map(categoria => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.nombre}</td>
                <td>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={() => navigate(`/admin/categorias/editar/${categoria.id}`)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => handleDelete(categoria)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar la categoría "{categoriaToDelete?.nombre}"?
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

export default CategoriaList;