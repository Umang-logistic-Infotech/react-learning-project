import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { toggleCheckBox } from "../Redux/Slices/CheckBox";

export default function CheckBox() {
  const dispatch = useDispatch();
  const selectedFrameworks = useSelector((state) => state.checkBox);

  const frameworks = ["Angular", "React", "React Native", "iOS", "Vue", "Flutter"];

  const handleCheck = (e) => {
    const value = e.target.value;
    dispatch(toggleCheckBox(value));
  };

  return (
    <Container>
      <div className="card  m-3 p-3">
        <h5>Check Box</h5>

        <div className=" mt-3">
          {frameworks.map((framework) => (
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={framework}
                value={framework}
                checked={selectedFrameworks.includes(framework)}
                onChange={handleCheck}
              />
              <label className="form-check-label ms-1" htmlFor={framework}>
                {framework}
              </label>
            </div>
          ))}
        </div>

        <h5 className="m-4">
            Duplicating state in child component
        </h5>
        <div className=" mt-3">
          {frameworks.map((framework) => (
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={framework}
                value={framework}
                checked={selectedFrameworks.includes(framework)}
                onChange={handleCheck}
              />
              <label className="form-check-label ms-1" htmlFor={framework}>
                {framework}
              </label>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
