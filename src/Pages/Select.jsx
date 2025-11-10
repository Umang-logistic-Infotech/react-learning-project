import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelectValue } from '../Redux/Slices/Select';
import { Container } from 'react-bootstrap';

export default function Select() {
  const dispatch = useDispatch();
  const selectedValue = useSelector((state) => state.selectField);

  const handleSelect = (e) => {
    dispatch(userSelectValue(e.target.value));
  };

  return (
    <Container>
      <div className="card text-center m-3">

        <select
          className="form-select w-75  m-3"
          value={selectedValue}
          onChange={handleSelect}
        >            
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        <h5>
          Duplicating state in child component
        </h5>

        <select
          className="form-select w-75  m-3"
          value={selectedValue}
          onChange={handleSelect}
        >           
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>
    </Container>
  );
}
