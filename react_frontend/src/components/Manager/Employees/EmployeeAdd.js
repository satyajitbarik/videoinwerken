/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from "react";
import axios from "axios";

import { reduxForm, Field, propTypes } from "redux-form";
import { required } from "redux-form-validators";
import { connect } from "react-redux";

import { MyTextField, apiPost } from "../../../utils/utils";
import {
  renderError,
  myRenderField,
  myRenderCheckBoxField,
} from "../../../utils/renderUtils";
import { SubmissionError } from "redux-form";
import authActions from "../../../actions/authActions";

import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

function EmployeeAdd(props) {
  const { open, onClose, handleSubmit, error } = props; // handlesubmit & error are redux props
  const [errors, setErrors] = React.useState("");
  //const [employee, setEmployee] = React.useState(null);
  let employee = {
    email: "",
    password: "",
  };

  const handleClose = (props) => {
    onClose();
    //props.reset();??
    //error.reset();??
  };

  const handleChange = (e) => {
    console.log("handlechange");
    const { name, value } = e.target;
    if (name == "password") {
      employee = { ...employee, ["password1"]: value };
      employee = { ...employee, ["password2"]: value };
      return;
    }
    employee = { ...employee, [name]: value };
  };

  const handleCheckBox = (e, value) => {
    const name = e.target.name;
    employee = { ...employee, [name]: value };
  };

  /*const handleSubmit = (employee) => {
    console.log(employee);
    //apiPost("http://localhost:8000/api/accounts/", handleResponse, employee);

    apiPost(
      "http://localhost:8000/rest-auth/registration/",
      handleResponse,
      handleFail,
      employee
    );
  };*/

  const handleResponse = (response) => {
    console.log("handle response");
    console.log(response.data);
    //setEmployeeList(response.data);
  };

  const handleFail = (response) => {
    console.log("handle fail");
    console.log(response.data);
    for (const [key, value] of Object.entries(response.data)) {
      console.log(key, value);
    }

    console.log("end");
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle id="form-dialog-title">Add employee</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the details of the employee.
        </DialogContentText>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <MyTextField
            label="Email address"
            name="email"
            onChange={handleChange}
          />
          <MyTextField
            label="Password"
            name="password"
            onChange={handleChange}
          />
         */}

          <Field
            name="email"
            label="Email"
            component={myRenderField}
            validate={[required({ message: "This field is required." })]}
          />
          <Field
            name="password"
            label="Password"
            component={myRenderField}
            validate={[required({ message: "This field is required." })]}
          />

          {renderError(error)}

          <DialogActions>
            {/*<Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleSubmit(employee)} color="primary">
          Confirm
        </Button>*/}
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const handleResponse = (response) => {
  console.log("handle response");
  console.log(response.data);
  //setEmployeeList(response.data);
};

const handleFail = (response) => {
  console.log("handle fail");
  console.log(response.data);
  for (const [key, value] of Object.entries(response.data)) {
    console.log(key, value);
  }

  console.log("end");
};

const handleSubmit = (employee) => {
  console.log(employee);
  //apiPost("http://localhost:8000/api/accounts/", handleResponse, employee);

  apiPost(
    "http://localhost:8000/rest-auth/registration/",
    handleResponse,
    handleFail,
    employee
  );
};

// Sync field level validation for password match
const validateForm = (values) => {
  const errors = {};
  //const { password1, password2 } = values;
  //if (password1 !== password2) {
  //  errors.password2 = "Password does not match.";
  //}
  // errors.email = "Email does not match";
  return errors;
};

const onSubmit1 = (values, dispatch, props) => {
  return axios
    .post("http://localhost:8000/rest-auth/registration/", values)
    .then((response) => {
      // If request is good...
      // you can login if email verification is turned off.
      //const token = response.data.key;
      // dispatch(authLogin(token));
      // localStorage.setItem("token", token);

      // email need to be verified, so don't login and send user to signup_done page.
      // redirect to signup done page.
      //history.push("/signup_done");
      console.log(response);
    })
    .catch((error) => {
      // If request is bad...
      // Show an error to the user
      const processedError = authActions.processServerError(
        error.response.data
      );
      throw new SubmissionError(processedError);
    });
};

const onSubmit = (values, dispatch, props) => {
  //alert("yo");
  console.log(props);
  console.log("Helloooo?");

  const employee = {
    email: values.email,
    password1: values.password,
    password2: values.password,
  };

  handleSubmit(employee);

  /* const item = {
    title: values.title,
    description: values.description,
    active: values.active,
    individual_result: values.individual_result,
    course_duration: values.course_duration,
    video: values.video,
    manager_id: props.manager_id,
  };

  handleSubmit(props, item);*/
};

export default reduxForm({
  form: "signup",
  validate: validateForm,
  onSubmit1,
})(EmployeeAdd);
