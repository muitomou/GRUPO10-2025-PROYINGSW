import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Alert, Spinner, Modal } from 'react-bootstrap';

const EditBoletin = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Aquí haces la petición al backend si es necesario
        const fetchData = async () => {
          try {
            const res = await fetch('http://localhost:8000/api/boletines/');
            const json = await res.json();
            setData(json);
          } catch (error) {
            console.error('Error al cargar datos:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
    
    return (
        <div>
            editar
        </div>
    );
}

export default EditBoletin;