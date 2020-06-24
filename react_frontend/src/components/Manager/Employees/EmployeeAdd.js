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

export default function EmployeeAdd(props) {
  const { open, onClose } = props;
  //const [error, setError] = React.useState("");

  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [employee, setEmployee] = React.useState(null);
  //let employee = null;

  const handleClose = () => {
    console.log("handleclose");
    onClose();
    setEmailError("");
    setPasswordError("");
  };

  const handleChange = (e) => {
    console.log("handlechange");
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    if (name == "password") {
      //employee = { ...employee, ["password1"]: value };
      //employee = { ...employee, ["password2"]: value };
      setEmployee({ ...employee, ["password1"]: value });
      setEmployee({ ...employee, ["password2"]: value });
      return;
    }
    // employee = { ...employee, [name]: value };
    setEmployee({ ...employee, [name]: value });
  };

  const handleCheckBox = (e, value) => {
    const name = e.target.name;
    // employee = { ...employee, [name]: value };
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (employee) => {
    console.log("employee to submit:");
    console.log(employee);
    //apiPost("http://localhost:8000/api/accounts/", handleResponse, employee);

    apiPost(
      "http://localhost:8000/rest-auth/registration/",
      handleResponse,
      handleFail,
      employee
    );
  };

  const handleResponse = (response) => {
    console.log("handle response");
    console.log(response.data);
    //setEmployeeList(response.data);
    handleClose();
  };

  const handleFail = (response) => {
    console.log("handle fail");
    console.log(response.data);

    if (response.data.email) {
      //setError("Email address: " + response.data.email);
      setEmailError(response.data.email);
    } else {
      setEmailError(null);
    }

    if (response.data.password1) {
      //setError("Password: " + response.data.password1);
      setPasswordError(response.data.password1);
    } else {
      setPasswordError(null);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle id="form-dialog-title">Add employee</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the details of the employee.
        </DialogContentText>
        <form>
          <MyTextField
            label="Email address"
            name="email"
            onChange={handleChange}
            autoFocus
          />

          {renderError(emailError)}

          <MyTextField
            label="Password"
            name="password"
            onChange={handleChange}
          />

          {renderError(passwordError)}

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleSubmit(employee)} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
