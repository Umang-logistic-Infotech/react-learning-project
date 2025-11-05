import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';

export default function Program6() {
    const [red, setRed] = useState(0);
    const [green, setGreen] = useState(100);
    const [blue, setBlue] = useState(200);
    const [style, setStyle] = useState();

    useEffect(() => {
        setStyle({
            height: 100, width: 500,
            backgroundColor: `rgb(${red}, ${green}, ${blue})`,
        });
    }, [red, green, blue]);

    const sliderStyle = (color) => {
        if (color === 'red') {
            return {
                background: `linear-gradient(to right, rgba(255, 255, 255, 1), rgb(255, 0, 0))`
            };
        }
        if (color === 'green') {
            return {
                background: `linear-gradient(to right, rgba(255, 255, 255, 1), rgb(0, 255, 0))`
            };
        }
        if (color === 'blue') {
            return {
                background: `linear-gradient(to right, rgba(255, 255, 255, 1), rgb(0, 0, 255))`
            };
        }
    };

    return (
        <>
            <Container>
                <h1>Program 6</h1>
                <Row>
                    <Col>
                        <div style={style}></div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row className="mb-3 mt-3">
                            <Col>Red :</Col>
                            <Col><input type='number' className='form-control' value={red} onChange={(e) => setRed(parseInt(e.target.value))} min={0} max={255} /></Col>
                            <Col><Form.Range min={0} max={255} value={red} onChange={(e) => setRed(parseInt(e.target.value))} style={sliderStyle('red')} /></Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>Green :</Col>
                            <Col><input type='number' className='form-control' value={green} onChange={(e) => setGreen(parseInt(e.target.value))} min={0} max={255} /></Col>
                            <Col><Form.Range min={0} max={255} value={green} onChange={(e) => setGreen(parseInt(e.target.value))} style={sliderStyle('green')} /></Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>Blue :</Col>
                            <Col><input type='number' className='form-control' value={blue} onChange={(e) => setBlue(parseInt(e.target.value))} min={0} max={255} /></Col>
                            <Col><Form.Range min={0} max={255} value={blue} onChange={(e) => setBlue(parseInt(e.target.value))} style={sliderStyle('blue')} /></Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
