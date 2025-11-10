import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'

export default function ButtonDiv({ number, handleChildNumber }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        handleChildNumber(number)
        // eslint-disable-next-line
    }, [])

    return (
        <Container className='mt-5'>
            <Row className='bg-dark text-light d-flex justify-content-center align-items-center' style={{ width: '200px', borderRadius: '10px' }}>
                <Col className='p-0'>
                    <Button
                        onClick={() => setCount(count - 1)}
                        className="w-75 m-1 text-black bg-light"
                        style={{ fontSize: '2rem', height: '50px' }}>
                        -
                    </Button>
                </Col>
                <Col className='d-flex flex-column justify-content-center align-items-center'>
                    <p className='h1 text-white' style={{ width: '60px', height: '60px', lineHeight: '65px', textAlign: 'center' }}>
                        {count}
                    </p>
                    <p className='text-info'>#{number}</p>
                </Col>
                <Col className='p-0'>
                    <Button
                        onClick={() => setCount(count + 1)}
                        className="w-75 m-1 text-black bg-light"
                        style={{ fontSize: '2rem', height: '50px' }}>
                        +
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}
