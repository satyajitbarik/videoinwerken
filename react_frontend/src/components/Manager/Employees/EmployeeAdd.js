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
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

export default function EmployeeAdd(props) {
  const { open, onClose } = props; // handlesubmit & error are redux props
  //const [employee, setEmployee] = React.useState(null);
  let employee = {
    email: null,
    password: null,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    employee = { ...employee, [name]: value };
  };

  const handleCheckBox = (e, value) => {
    const name = e.target.name;
    employee = { ...employee, [name]: value };
  };

  const handleSubmit = (employee) => {
    apiPost(
      "http://localhost:8000/api/manager/employees/",
      handleResponse,
      employee
    );
  };

  const handleResponse = (response) => {
    console.log(response);
    //setEmployeeList(response.data);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
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
          />
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleSubmit(employee)} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
