import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const EditorDashboard = () => {
  const { t: tAdmin } = useTranslation('admin');
  const { t: tCommon } = useTranslation('common');
  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">{tAdmin('editor-panel')}</h1>
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
              <Card.Title className="text-center">{tAdmin('bulletin-management')}</Card.Title>
              <Card.Text className="text-center">
              {tAdmin('bulletin-management-description')}
              </Card.Text>
              <div className="mt-auto d-grid gap-2">
                <Button 
                  as={Link} 
                  to="/editar/boletines/nuevo" 
                  variant="primary"
                >
                  {tAdmin('new-bulletin')}
                </Button>
                <Button 
                  as={Link} 
                  to="/editar/boletines" 
                  variant="outline-primary"
                >
                  {tAdmin('see-all-btn')}
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
              <Card.Title className="text-center">{tAdmin('categories-management')}</Card.Title>
              <Card.Text className="text-center">
              {tAdmin('categories-management-description')}
              </Card.Text>
              <div className="mt-auto d-grid gap-2">
                <Button 
                  as={Link} 
                  to="/editar/categorias/nueva" 
                  variant="primary"
                >
                  {tAdmin('new-category')}
                </Button>
                <Button 
                  as={Link} 
                  to="/editar/categorias" 
                  variant="outline-primary"
                >
                  {tAdmin('see-all-btn')}
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
              <Card.Title className="text-center">{tAdmin('region-management')}</Card.Title>
              <Card.Text className="text-center">
              {tAdmin('region-management-description')}
              </Card.Text>
              <div className="mt-auto d-grid gap-2">
                <Button 
                  as={Link} 
                  to="/editar/regiones/nueva" 
                  variant="primary"
                >
                  {tAdmin('new-region')}
                </Button>
                <Button 
                  as={Link} 
                  to="/editar/regiones" 
                  variant="outline-primary"
                >
                  {tAdmin('see-all-btn')}
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
              <Card.Title className="text-center">{tAdmin('tag-management')}</Card.Title>
              <Card.Text className="text-center">
              {tAdmin('tag-management-description')}
              </Card.Text>
              <div className="mt-auto d-grid gap-2">
                <Button 
                  as={Link} 
                  to="/editar/etiquetas/nueva" 
                  variant="primary"
                >
                  {tAdmin('new-tag')}
                </Button>
                <Button 
                  as={Link} 
                  to="/editar/etiquetas" 
                  variant="outline-primary"
                >
                  {tAdmin('see-all-btn')}
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