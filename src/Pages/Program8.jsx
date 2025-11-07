import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../Redux/Slices/Counter';

export default function Program8() {
    const count = useSelector((state) => state.counter);
    const dispatch = useDispatch();

    return (
        <>
            <Container className='mt-5'>
                <h1>Program 8</h1>
                <Row className='bg-dark text-light d-flex justify-content-center align-items-center' style={{ width: '200px', borderRadius: '10px' }}>
                    <Col className='p-0'>
                        <Button
                            onClick={() => dispatch(decrement())}
                            className="w-75 m-1  text-black bg-light"
                            style={{ fontSize: '2rem', height: '50px' }}>
                            -
                        </Button>
                    </Col>

                    <Col className='d-flex justify-content-center align-items-center'>
                        <p className='h1  text-white' style={{ width: '60px', height: '60px', lineHeight: '65px', textAlign: 'center' }}>
                            {count}
                        </p>
                    </Col>

                    <Col className='p-0'>
                        <Button
                            onClick={() => dispatch(increment())}
                            className="w-75  m-1 text-black bg-light"
                            style={{ fontSize: '2rem', height: '50px' }}>
                            +
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
