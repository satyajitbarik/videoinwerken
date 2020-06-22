import React from "react";
import { FormControlLabel, TextField, Checkbox } from "@material-ui/core";

export const myRenderField = ({
  input,
  label,
  type,
  autoFocus,
  meta: { touched, error },
}) => (
  <div>
    <TextField
      autoFocus={autoFocus}
      label={label}
      variant="outlined"
      {...input}
    />

    {touched && error && (
      <div className="alert alert-danger p-1">
        <small>{error}</small>
      </div>
    )}
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
