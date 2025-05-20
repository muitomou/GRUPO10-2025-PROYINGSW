import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import Editor from "./Editor"
import { useTranslation } from 'react-i18next';

const AdminDashboard = () => {
  const { t: tAdmin } = useTranslation('admin');
  const { t: tCommon } = useTranslation('common');
  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">{tAdmin('administration-panel')}</h1>
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
              <Card.Title className="text-center">{tAdmin('user-management')}</Card.Title>
              <Card.Text className="text-center">
              {tAdmin('user-management-description')}
              </Card.Text>
              <div className="mt-auto d-grid gap-2">
                <Button 
                  as={Link} 
                  to="/admin/create-user" 
                  variant="primary"
                >
                  {tAdmin('create-user-btn')}
                </Button>
                <Button className="disabled"
                  as={Link} 
                  to="/admin/edit-user" 
                  variant="outline-primary"
                >
                  {tAdmin('edit-user-btn')}
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