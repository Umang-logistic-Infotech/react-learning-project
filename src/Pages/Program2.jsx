import  { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Program2() {
  const [visible, setVisible] = useState(true);

  const handleShow = (e) => {
    setVisible(true);
  };
  const handleHide = (e) => {
    setVisible(false);
  };

  return (
    <Container className="mt-5">
      <h1>Program 2</h1>

      <Row>
        <Col md={6}>
          {visible && <p > The Text is shown </p>}
        </Col>
      </Row>
      
      <Row className="mt-3">
        <Col>
            <Button onClick={handleShow}> Show </Button>
        </Col>
        <Col>
            <Button onClick={handleHide}> Hide </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Program2;
