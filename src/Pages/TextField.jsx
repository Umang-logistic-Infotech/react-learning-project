import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { userInputValue } from '../Redux/Slices/TextField';

export default function TextField() {
  const dispatch = useDispatch();
  const InputValue = useSelector((state) => state.textField); 
  const handleInput = (selectedValue) => {
    dispatch(userInputValue(selectedValue)); 
  };

  return (
    <Container>
      <div className="card text-center m-3">
        <input type='text' className='form-control m-3 w-75' placeholder='Enter Some Text...' onChange={(e) => handleInput(e.target.value)} value={InputValue}/>
          <h5>
            Duplicating state in child component
          </h5>
        <input type='text' className='form-control m-3 w-75' placeholder='Enter Some Text...' onChange={(e) => handleInput(e.target.value)} value={InputValue}/>

      </div>
    </Container>
  );
}
