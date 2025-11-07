import React, { useReducer, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'

const initialState = {count:0};

const reducer = (state,action)=>{   
    switch(action.type){
        case "increase":
                return {count:state.count+1};
        case "decrease":
                return {count:state.count-1};
        default:
                return state;

    }
}
export default function Program8() {
    const [state, dispatch] = useReducer(reducer,initialState);
    
    return (
        <>
            <Container className='mt-5'>
                <h1>Program 8</h1>
                <Row className='bg-dark text-light d-flex justify-content-center align-items-center' style={{ width: '200px', borderRadius: '10px' }}>
                    <Col className='p-0'>
                        <Button
                            onClick={() => dispatch({type:"decrease"})}
                            className="w-75 m-1  text-black bg-light"
                            style={{ fontSize: '2rem', height: '50px' }}>
                            -
                        </Button>
                    </Col>

                    <Col className='d-flex justify-content-center align-items-center'>
                        <p className='h1  text-white' style={{ width: '60px', height: '60px', lineHeight: '65px', textAlign: 'center' }}>
                            {state.count}
                        </p>
                    </Col>

                    <Col className='p-0'>
                        <Button
                            onClick={() =>dispatch({type:"increase"})}
                            className="w-75  m-1 text-black bg-light"
                            style={{ fontSize: '2rem', height: '50px' }}>
                            +
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
