import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import Editor from "./Editor"

const AdminDashboard = () => {
  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Panel de Administración</h1>
      <Row className="justify-content-center g-4">
        {/* Gestión de Usuarios */}
        <Col md={6} lg={4}>
          <Card className="h-100 shadow">
            <Card.Img 
              variant="top" 
              src="/images/ejemplo_boletin.jpg" 
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title className="text-center">Gestión de Usuarios</Card.Title>
              <Card.Text className="text-center">
                Administra todos los usuarios del sistema
              </Card.Text>
              <div className="mt-auto d-grid gap-2">
                <Button 
                  as={Link} 
                  to="/admin/create-user" 
                  variant="primary"
                >
                  Crear Nuevo Usuario
                </Button>
                <Button 
                  as={Link} 
                  to="/admin/edit-user" 
                  variant="outline-primary"
                >
                  Editar Usuario
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Editor/>
    </Container>

  );
};

export default AdminDashboard;