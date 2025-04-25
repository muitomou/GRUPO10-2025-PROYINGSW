import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const EditorDashboard = () => {
  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Panel de Editor</h1>
      <Row className="justify-content-center g-4">
        {/* Gestión de Boletines */}
        <Col md={6} lg={4}>
          <Card className="h-100 shadow">
            <Card.Img 
              variant="top" 
              src="/images/ejemplo_boletin.jpg" 
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title className="text-center">Gestión de Boletines</Card.Title>
              <Card.Text className="text-center">
                Administra todos los boletines del sistema
              </Card.Text>
              <div className="mt-auto d-grid gap-2">
                <Button 
                  as={Link} 
                  to="/editar/boletines/nuevo" 
                  variant="primary"
                >
                  Crear Nuevo Boletín
                </Button>
                <Button 
                  as={Link} 
                  to="/editar/boletines" 
                  variant="outline-primary"
                >
                  Ver Todos los Boletines
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Gestión de Categorías */}
        <Col md={6} lg={4}>
          <Card className="h-100 shadow">
            <Card.Img 
              variant="top" 
              src="/images/categorias.jpg" 
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title className="text-center">Gestión de Categorías</Card.Title>
              <Card.Text className="text-center">
                Administra las categorías para clasificar boletines
              </Card.Text>
              <div className="mt-auto d-grid gap-2">
                <Button 
                  as={Link} 
                  to="/editar/categorias/nueva" 
                  variant="primary"
                >
                  Nueva Categoría
                </Button>
                <Button 
                  as={Link} 
                  to="/editar/categorias" 
                  variant="outline-primary"
                >
                  Ver Todas las Categorías
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Gestión de Regiones */}
        <Col md={6} lg={4}>
          <Card className="h-100 shadow">
            <Card.Img 
              variant="top" 
              src="/images/regiones.jpg" 
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title className="text-center">Gestión de Regiones</Card.Title>
              <Card.Text className="text-center">
                Administra las regiones disponibles
              </Card.Text>
              <div className="mt-auto d-grid gap-2">
                <Button 
                  as={Link} 
                  to="/editar/regiones/nueva" 
                  variant="primary"
                >
                  Nueva Región
                </Button>
                <Button 
                  as={Link} 
                  to="/editar/regiones" 
                  variant="outline-primary"
                >
                  Ver Todas las Regiones
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Gestión de Etiquetas */}
        <Col md={6} lg={4}>
          <Card className="h-100 shadow">
            <Card.Img 
              variant="top" 
              src="/images/etiquetas.jpg" 
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title className="text-center">Gestión de Etiquetas</Card.Title>
              <Card.Text className="text-center">
                Administra las etiquetas para boletines
              </Card.Text>
              <div className="mt-auto d-grid gap-2">
                <Button 
                  as={Link} 
                  to="/editar/etiquetas/nueva" 
                  variant="primary"
                >
                  Nueva Etiqueta
                </Button>
                <Button 
                  as={Link} 
                  to="/editar/etiquetas" 
                  variant="outline-primary"
                >
                  Ver Todas las Etiquetas
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditorDashboard;