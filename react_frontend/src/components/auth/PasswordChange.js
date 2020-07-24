import React, { Component } from "react";
// import PropTypes from "prop-types";
import { reduxForm, Field, propTypes } from "redux-form";
import { required } from "redux-form-validators";
import { changePassword } from "../../actions/authActions";
import { renderField, renderError } from "../../utils/renderUtils";

import Button from "@material-ui/core/Button";
class PasswordChange extends Component {
  static propTypes = {
    ...propTypes,
  };

  render() {
    const { handleSubmit, error } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <h4>Change Password</h4>
        <hr />

        <fieldset className="form-group">
          <Field
            name="old_password"
            label="Old Password"
            component={renderField}
            type="password"
            variant="outlined"
            validate={[required({ message: "This field is required." })]}
          />
        </fieldset>

        <fieldset className="form-group">
          <Field
            name="new_password1"
            label="New Password"
            component={renderField}
            type="password"
            validate={[required({ message: "This field is required." })]}
          />
        </fieldset>

        <fieldset className="form-group">
          <Field
            name="new_password2"
            label="Confirm New Password"
            component={renderField}
            type="password"
            validate={[required({ message: "This field is required." })]}
          />
        </fieldset>

        {error && error.length > 0 && renderError(error)}

        <fieldset className="form-group">
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>

          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: 10 }}
            href="../account"
          >
            Cancel
          </Button>
        </fieldset>
      </form>
    );
  }
}

// Sync field level validation for password match
const validateForm = (values) => {
  const errors = {};
  const { new_password1, new_password2 } = values;
  if (new_password1 !== new_password2) {
    errors.new_password2 = "Password does not match.";
  }
  console.log(values);
  return errors;
};

export default reduxForm({
  form: "change_password",
  onSubmit: changePassword,
  validate: validateForm,
})(PasswordChange);
