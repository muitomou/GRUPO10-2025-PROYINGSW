import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

const CategoriaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categoria, setCategoria] = useState({
    nombre: ''
  });

  useEffect(() => {
    if (id) {
      const fetchCategoria = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:8000/api/categorias/${id}/`);
          setCategoria(response.data);
        } catch (err) {
          setError('Error al cargar la categoría');
        } finally {
          setLoading(false);
        }
      };
      fetchCategoria();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (id) {
        
        await axios.put(`http://localhost:8000/api/categorias/${id}/`, categoria,{
          headers: {
            'Authorization': `Token ${token}`,
        }
        });
      } else {
        await axios.post('http://localhost:8000/api/categorias/', categoria,{
          headers: {
            'Authorization': `Token ${token}`,
        }
        });
      }
      
      navigate('/admin/categorias');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoria(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Editar' : 'Nueva'} Categoría</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={categoria.nombre}
            onChange={handleChange}
            required
            placeholder="Nombre de la categoría"
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <Spinner size="sm" /> : 'Guardar'}
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => navigate('/admin/categorias')}
          >
            Cancelar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CategoriaForm;