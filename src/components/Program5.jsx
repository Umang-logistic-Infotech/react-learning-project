import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export default function Program5() {
    const [category, setCategory] = useState('Temperature');
    const [unit1, setUnit1] = useState('');
    const [unit2, setUnit2] = useState('');

    const handleSelect = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        setUnit1('');
        setUnit2('');
    };

    function handleInput1 (e)  {
        const inputValue1 = e.target.value;
        setUnit1(inputValue1);
        if (category === 'Temperature' && !isNaN(inputValue1) && inputValue1 !== '') {
            setUnit2((inputValue1 * 9 / 5) + 32);
        } else if (category === 'Time' && !isNaN(inputValue1) && inputValue1 !== '') {
            setUnit2(inputValue1 / 60);
        } else if (category === 'Speed' && !isNaN(inputValue1) && inputValue1 !== '') {
            setUnit2(inputValue1 * 1000 / 60);
        } else {
            setUnit2('');
        }
    };

    function handleInput2(e) {
        const inputValue2 = e.target.value;
        setUnit2(inputValue2);
        if (category === 'Temperature' && !isNaN(inputValue2) && inputValue2 !== '') {
            setUnit1((inputValue2 - 32) * 5 / 9);
        } else if (category === 'Time' && !isNaN(inputValue2) && inputValue2 !== '') {
            setUnit1(inputValue2 * 60);
        } else if (category === 'Speed' && !isNaN(inputValue2) && inputValue2 !== '') {
            setUnit1(inputValue2 * 3600 / 1000);
        } else {
            setUnit1('');
        }
    };



    return (
        <>
            <Container className="mt-5">
            <h1>Program 5</h1>

                <Row>
                    <Col>
                        <select className="form-control m-1" onChange={handleSelect} value={category}>
                            <option value="Temperature">Temperature</option>
                            <option value="Time">Time</option>
                            <option value="Speed">Speed</option>
                            <option value="Volume">Volume</option>
                        </select>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <input
                            className="form-control m-1"
                            onChange={handleInput1}
                            value={unit1}
                            placeholder={category === 'Temperature' ? 'Celsius' : category === 'Time' ? 'Seconds' : category === 'Speed' ? 'KM/h' : 'Liters'}
                            type="number"
                        />
                    </Col>

                    <Col>
                        <input
                            className="form-control m-1"
                            onChange={handleInput2}
                            value={unit2}
                            placeholder={category === 'Temperature' ? 'Fahrenheit' : category === 'Time' ? 'Minutes' : category === 'Speed' ? 'M/s' : 'Gallons'}
                            type="number"
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <select className="form-control m-1" disabled>
                            <option>{category === 'Temperature' ? 'Celsius' : category === 'Time' ? 'Seconds' : category === 'Speed' ? 'KM/h' : 'Liters'}</option>
                        </select>
                    </Col>

                    <Col>
                        <select className="form-control m-1" disabled>
                            <option>{category === 'Temperature' ? 'Fahrenheit' : category === 'Time' ? 'Minutes' : category === 'Speed' ? 'M/s' : 'Gallons'}</option>
                        </select>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
