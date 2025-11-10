import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLab } from '../Redux/Slices/Labs';
import { Container } from 'react-bootstrap';

export default function Labs() {
  const dispatch = useDispatch();
  const activeLab = useSelector((state) => state.labs); 
  const handleSelectLab = (labId) => {
    dispatch(selectLab(labId)); 
  };

  return (
    <Container>
      <div className="card text-center m-3">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <div
                className={`nav-link ${activeLab === 1 ? 'active' : ''}`}
                aria-current="true"
                onClick={() => handleSelectLab(1)}
              >
                Lab 1
              </div>
            </li>
            <li className="nav-item">
              <div
                className={`nav-link ${activeLab === 2 ? 'active' : ''}`}
                aria-current="true"
                onClick={() => handleSelectLab(2)}
              >
                Lab 2
              </div>
            </li>
            <li className="nav-item">
              <div
                className={`nav-link ${activeLab === 3 ? 'active' : ''}`}
                aria-current="true"
                onClick={() => handleSelectLab(3)}
              >
                Lab 3
              </div>
            </li>
          </ul>
          </div>
           <div className="card-body">
          <h5 className="card-title">
            Lab {activeLab}
          </h5>
        </div>        
      </div>
          <h5>
            Duplicating state in child component
          </h5>
      <div className="card text-center m-3">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <div
                className={`nav-link ${activeLab === 1 ? 'active' : ''}`}
                aria-current="true"
                onClick={() => handleSelectLab(1)}
              >
                Lab 1
              </div>
            </li>
            <li className="nav-item">
              <div
                className={`nav-link ${activeLab === 2 ? 'active' : ''}`}
                aria-current="true"
                onClick={() => handleSelectLab(2)}
              >
                Lab 2
              </div>
            </li>
            <li className="nav-item">
              <div
                className={`nav-link ${activeLab === 3 ? 'active' : ''}`}
                aria-current="true"
                onClick={() => handleSelectLab(3)}
              >
                Lab 3
              </div>
            </li>
          </ul>
          </div>
           <div className="card-body">
          <h5 className="card-title">
            Lab {activeLab}
          </h5>
        </div>        
      </div>
    </Container>
  );
}
