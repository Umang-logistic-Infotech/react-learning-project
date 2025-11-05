import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export default function Program3() {
    const [price,setPrice] = useState(null);
    const [quentity,setQuentity] = useState(null);
    const [total,setTotal] = useState(null);

    useEffect(function(){
        setTotal(price*quentity)
    },[price,quentity]);

    return (
        <>
            <Container className="mt-5">
                <h1> Program 3 </h1>
                <Row className='align-items-center'>
                    <Col> Price : </Col>
                    <Col> <input className='form-control m-2' type='number' onChange={(e)=>{setPrice(e.target.value)}}/> </Col>

                    <Col><b> X </b> Quentity : </Col>
                    <Col> <input className='form-control m-2' type='number'  onChange={(e)=>{setQuentity(e.target.value)}}/></Col>
                </Row>
                {total && <p>{total}</p>}
            </Container>
        </>
    )
}
