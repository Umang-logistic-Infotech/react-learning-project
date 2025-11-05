import  { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Program1() {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <Container className="mt-5">
      <h1>Program 1</h1>
      <Row>
        <Col>
          <input
            type="text" 
            placeholder="Type something..." 
            value={text}
            className='form-control' 
            onChange={handleChange} 
          />
        </Col>
      </Row>
      
      <Row className="mt-3">
        <Col>
          <p>{text}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Program1;
