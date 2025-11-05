import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export default function Program4() {
    const [celsius, setCelsius] = useState('');
    const [fahrenheit, setFahrenheit] = useState('');

    const handleCelsius = (e) => {
        const celsiusValue = e.target.value;
        setCelsius(celsiusValue);
        if (!isNaN(celsiusValue) && celsiusValue !== '') {
            setFahrenheit((celsiusValue * 9 / 5) + 32);
        } else {
            setFahrenheit('');
        }
    };

    const handleFahrenheit = (e) => {
        const fahrenheitValue = e.target.value;
        setFahrenheit(fahrenheitValue);
        if (!isNaN(fahrenheitValue) && fahrenheitValue !== '') {
            setCelsius((fahrenheitValue - 32) * 5 / 9);
        } else {
            setCelsius('');
        }
    };

    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <input
                            className="form-control m-1"
                            onChange={handleCelsius}
                            value={celsius}
                            placeholder="Celsius"
                            type="number"
                        />
                    </Col>
                    <Col>
                        <input
                            className="form-control m-1"
                            onChange={handleFahrenheit}
                            value={fahrenheit}
                            placeholder="Fahrenheit"
                            type="number"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <select className="form-control m-1" disabled>
                            <option>Celsius</option>
                        </select>
                    </Col>
                    =
                    <Col>
                        <select className="form-control m-1" disabled>
                            <option>Fahrenheit</option>
                        </select>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
