/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from "react";

import { MyTextField, apiPost } from "../../../utils/utils";
import { renderError } from "../../../utils/renderUtils";

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
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [employee, setEmployee] = React.useState({
    email: "",
    password: "",
  });

  const handleClose = () => {
    onClose();
    setEmailError("");
    setPasswordError("");
  };

  const handleChange = (e) => {
    console.log("handlechange");
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setEmployee({ ...employee, [name]: value });
    console.log(employee);
  };

  const handleCheckBox = (e, value) => {
    const name = e.target.name;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (employee) => {
    console.log("employee to submit:");
    console.log(employee);

    apiPost(
      "http://localhost:8000/api/manager/employees/",
      handleResponse,
      handleFail,
      employee
    );

    console.log("patch");
    console.log(employee);
  };

  const handleResponse = (response) => {
    console.log("handle response");
    console.log(response.data);
    handleClose();
  };

  const handleFail = (response) => {
    console.log(response.data);

    if (response.data.email) {
      setEmailError(response.data.email);
    } else {
      setEmailError(null);
    }

    if (response.data.password1) {
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
              Add
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
