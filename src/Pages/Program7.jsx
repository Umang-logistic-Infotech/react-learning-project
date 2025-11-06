import React, {   useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export default function Program7() {
    const [list1,setList1] = useState(['Milk1','Tea1','Coffee1']);
    const [list2,setList2] = useState(['Water2','Milk2']);
    
    function handleClone1() {
        setList2((prev) => [...prev, list1[list1.length - 1]]);
    }
    function handleClone2() {
        setList1((prev) => [...prev, list2[list2.length - 1]]);
    }

  return (
    <>
    <Container className='mt-5'>
        <h1> Program 7 </h1>
        <Row>
            <Col>
                <h4> List 1</h4>
                <ol>
                    {list1.map((item,index)=>(
                        <li key={index}>{item}</li>
                    ))}
                </ol>
            </Col>
            <Col>
                <h4> List 2</h4>
                <ol>
                    {list2.map((item,index)=>(
                        <li key={index}>{item}</li>
                    ))}
                </ol>
            </Col>
        </Row>
        <Row>
            <Col>    
              <button className='btn btn-primary m-3' onClick={handleClone1}> Clone TO List 2</button>
            </Col>
            <Col>    
              <button className='btn btn-primary m-3' onClick={handleClone2}> Clone TO List 1</button>
            </Col>
        </Row>
    </Container>
      
    </>
  )
}
