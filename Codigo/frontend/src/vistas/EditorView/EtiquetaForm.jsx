import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

const EtiquetaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [etiqueta, setEtiqueta] = useState({
    nombre: ''
  });

  useEffect(() => {
    if (id) {
      const fetchEtiqueta = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:8000/api/etiquetas/${id}/`);
          setEtiqueta(response.data);
        } catch (err) {
          setError('Error al cargar la etiqueta');
        } finally {
          setLoading(false);
        }
      };
      fetchEtiqueta();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Configuración común de headers
      const headers = {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      };
  
      let response;
      if (id) {
        response = await axios.put(
          `http://localhost:8000/api/etiquetas/${id}/`, 
          JSON.stringify(etiqueta), // Serializa el objeto
          { headers }
        );
      } else {
        response = await axios.post(
          'http://localhost:8000/api/etiquetas/', 
          JSON.stringify(etiqueta), // Serializa el objeto
          { headers }
        );
      }
  
      console.log('Respuesta:', response.data);
      
      // Verifica explícitamente que la respuesta fue exitosa
      if (response.status >= 200 && response.status < 300) {
        navigate('/admin/etiquetas');
      } else {
        throw new Error(`Respuesta inesperada: ${response.status}`);
      }
    } catch (err) {
      console.error('Error completo:', err);
      console.error('Datos de error:', err.response?.data);
      setError(err.response?.data?.nombre?.[0] || 
               err.response?.data?.detail || 
               err.message || 
               'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEtiqueta(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Editar' : 'Nueva'} Etiqueta</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={etiqueta.nombre}
            onChange={handleChange}
            required
            placeholder="Nombre de la etiqueta"
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <Spinner size="sm" /> : 'Guardar'}
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => navigate('/admin/etiquetas')}
          >
            Cancelar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EtiquetaForm;