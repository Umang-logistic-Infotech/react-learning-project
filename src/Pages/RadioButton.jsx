import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { selectRadioOption } from "../Redux/Slices/Radio";

export default function RadioButton() {
  const dispatch = useDispatch();
  const selectedFramework = useSelector((state) => state.radio);

  const frameworks = ["Angular", "React", "React Native", "iOS", "Vue", "Flutter"];

  const handleRadio = (e) => {
    dispatch(selectRadioOption(e.target.value));
  };

  return (
    <Container>
      <div className="cardm-3 p-3">

        <div className=" mt-3">
          {frameworks.map((framework) => (
            <div key={framework} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="framework1"
                id={framework}
                value={framework}
                checked={selectedFramework === framework}
                onChange={handleRadio}
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
            <div key={framework} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="framework2"
                id={framework}
                value={framework}
                checked={selectedFramework === framework}
                onChange={handleRadio}
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
