import React, { useState } from 'react'
import ButtonDiv from '../components/ButtonDiv'
import { Container, Row, Col, Button } from 'react-bootstrap'
export default function Program9() {

    const [clonedButtonDivs, setClonedButtonDivs] = useState([<ButtonDiv key={0} />]);

    const handleCloneClick = () => {
        setClonedButtonDivs(prev => [
            ...prev,
            <ButtonDiv key={prev.length} />
        ]);
    };

    return (
        <>
            <Container className='mt-5'>
                <h1>Program 9</h1>
                <Row >
                    {clonedButtonDivs.map((buttonDiv, index) => (
                        <Col>
                            <Col key={index} >
                                {buttonDiv}
                            </Col>
                        </Col>
                    ))}

                </Row >
                <Row>
                    <Col>
                        <Button className=' mt-5' onClick={handleCloneClick}> Clone </Button>
                    </Col>
                </Row>
            </Container >
        </>
    )
}
