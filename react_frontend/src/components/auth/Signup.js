/* eslint-disable react/prop-types */
import React from "react";
import { reduxForm, Field } from "redux-form";
import { required } from "redux-form-validators";
import { renderField, renderError } from "../../utils/renderUtils";
import { signupUser } from "../../actions/authActions";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from "@material-ui/core";

function Signup(props) {
  const { handleSubmit, error } = props;

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h4>Sign Up</h4>
        <hr />

        <fieldset className="form-group">
          <Field
            name="email"
            label="Email"
            component={renderField}
            type="text"
          />
        </fieldset>
        {/*
        <fieldset className="form-group">
          <Field
            name="username"
            label="Username"
            component={renderField}
            type="text"
            //validate={[required({ message: "This field is required." })]}
          />
        </fieldset>
*/}

        <fieldset className="form-group">
          <Field
            name="password1"
            label="Password"
            component={renderField}
            type="password"
            validate={[required({ message: "This field is required." })]}
          />
        </fieldset>

        <fieldset className="form-group">
          <Field
            name="password2"
            label="Confirm Password"
            component={renderField}
            type="password"
            validate={[required({ message: "This field is required." })]}
          />
        </fieldset>

        <fieldset className="form-group">
          <Field name="iban" label="iban" component={renderField} type="text" />
        </fieldset>

        {renderError(error)}

        <fieldset className="form-group">
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </fieldset>
      </form>
    </div>
  );
}

// Sync field level validation for password match
const validateForm = (values) => {
  const errors = {};
  const { password1, password2 } = values;
  if (password1 !== password2) {
    errors.password2 = "Password does not match.";
  }
  return errors;
};

export default reduxForm({
  form: "signup",
  validate: validateForm,
  onSubmit: signupUser,
})(Signup);
