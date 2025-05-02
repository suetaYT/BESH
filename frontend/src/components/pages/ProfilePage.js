import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const ProfilePage = () => {
  return (
    <Container fluid className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center p-5">
              <div className="mb-4">
                <img 
                  src="https://via.placeholder.com/150" 
                  alt="Profile" 
                  className="rounded-circle img-fluid" 
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              </div>
              <h2 className="mb-3">Иван Иванов</h2>
              
              <div className="mt-5">
                <h5 className="text-start mb-2">Прогресс обучения</h5>
                <div className="progress" style={{ height: '25px' }}>
                  <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{ 
                      width: '30%', 
                      backgroundColor: '#754A21'
                    }} 
                    aria-valuenow="30" 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  >
                    30%
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage; 