/* eslint-disable react/prop-types */
import React from "react";

import { reduxForm, Field } from "redux-form";
import { required } from "redux-form-validators";
import { renderField, renderError } from "../../../utils/renderUtils";

import { Button, Link } from "@material-ui/core";

const onSubmit = (values) => {
  alert("hi" + values.email);
};

const ReduxForm = (props) => {
  const { handleSubmit, error } = props;
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h4>Please Log In</h4>
        <hr />

        <fieldset className="form-group">
          <Field
            name="email"
            label="Email"
            component={renderField}
            type="text"
            validate={[required({ message: "This field is required." })]}
          />
        </fieldset>

        <fieldset className="form-group">
          <Field
            name="password"
            label="Password"
            component={renderField}
            type="password"
            validate={[required({ message: "This field is required." })]}
          />
        </fieldset>

        <fieldset className="form-group">
          {renderError(error)}

          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </fieldset>

        <p>
          Not registered yet? <Link to="/signup">Signup Here!</Link>
        </p>
        <Link to="/reset_password">Forgot password?</Link>
      </form>
    </div>
  );
};

export default reduxForm({
  form: "test-redux",
  onSubmit /*: loginUser*/,
})(ReduxForm);
