import React, { useState, useCallback } from 'react'
import ButtonDiv from '../components/ButtonDiv'
import { Container, Row, Col, Button } from 'react-bootstrap'

export default function Program9() {
    const [clonedButtonDivs, setClonedButtonDivs] = useState([{ id: 0, number: 1 }])
    const [childNumbers, setChildNumbers] = useState([])

    const handleCloneClick = () => {
        setClonedButtonDivs(prev => [
            ...prev,
            { id: prev.length, number: prev.length + 1 }
        ])
    }

    const handleChildNumber = useCallback((num) => {
        setChildNumbers(prev => {
            if (!prev.includes(num)) return [...prev, num]
            return prev
        })
    }, [])

    return (
        <Container className='mt-5'>
            <h1>Program 9</h1>
            <Row>
                {clonedButtonDivs.map(({ id, number }) => (
                    <Col key={id}>
                        <ButtonDiv number={number} handleChildNumber={handleChildNumber} />
                    </Col>
                ))}
            </Row>
            <Row className='mt-4'>
                <Col>
                    <Button onClick={handleCloneClick}>Clone</Button>
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col>
                    <h4>Child count: <p>{childNumbers.length}</p></h4>                    
                </Col>
            </Row>
        </Container>
    )
}
