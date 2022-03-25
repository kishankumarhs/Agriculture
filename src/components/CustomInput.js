import React, { useState } from "react";

const CustomInput = (props) => {
  const [inputType, setInputType] = useState(
    props?.inputType ? props.inputType : "input"
  );
  return (
    <div>
      {inputType === "input" ? (
        <>
          <div
            className="form-group"
            style={{
              ...props.style,
            }}
          >
            <label style={{ ...props.labelStyle }} htmlFor={props.input?.id}>
              {props.label}
            </label>
            <input {...props.input} className="form-control" />
          </div>
          <span className="helper" style={{ ...props.errStyle }}>
            {props.err}
          </span>
        </>
      ) : inputType === "textarea" ? (
        <>
          <div
            className="form-group"
            style={{
              ...props.style,
            }}
          >
            <label style={{ ...props.labelStyle }} htmlFor={props.input?.id}>
              {props.label}
            </label>
            <textarea
              {...{
                ...props.input,
                style: {
                  height: 150,
                  ...props.style,
                },
              }}
              className="form-control"
            />
          </div>
          <span className="helper" style={{ ...props.errStyle }}>
            {props.err}
          </span>
        </>
      ) : null}
    </div>
  );
};

export default CustomInput;
