/* eslint-disable react/prop-types */
import React from "react";
import { TextField } from "@material-ui/core";
import { MyCheckBox } from "../utils/utils";

export const myRenderField = ({
  input,
  label,
  //type,
  autoFocus,
  meta: { touched, error },
}) => (
  <div>
    <TextField
      autoFocus={autoFocus}
      label={label}
      variant="outlined"
      fullWidth
      margin="normal"
      {...input}
    />

    {touched && error && (
      <div className="alert alert-danger p-1">
        <small>{error}</small>
      </div>
    )}
  </div>
);

export const myRenderCheckBoxField = ({ input, label, name }) => (
  <div>
    <MyCheckBox label={label} name={name} onChange={input.onChange} />
  </div>
);

export const renderField = ({
  input,
  label,
  type,
  meta: { touched, error },
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input className="form-control" {...input} type={type} />
    </div>
    {touched && error && (
      <div className="alert alert-danger p-1">
        <small>{error}</small>
      </div>
    )}
  </div>
);

export const renderTextAreaField = ({
  input,
  label,
  type,
  meta: { touched, error },
}) => (
  <div>
    <label>{label}</label>
    <div>
      <textarea className="form-control" {...input} type={type} />
    </div>
    {touched && error && (
      <div className="alert alert-danger p-1">
        <small>{error}</small>
      </div>
    )}
  </div>
);

export const renderError = (errorMessages) => {
  if (errorMessages) {
    return <div className="alert alert-danger">{errorMessages}</div>;
  }
};
