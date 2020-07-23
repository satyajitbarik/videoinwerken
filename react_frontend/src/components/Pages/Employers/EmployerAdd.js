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

import { submitEmployer } from "./actions";

export default function EmployerAdd(props) {
  const { open, onClose } = props;

  const [employer, setEmployer] = React.useState({
    email: "",
    password: "",
  });

  // Errors
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

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
    setEmployer({ ...employer, [name]: value });
    console.log(employer);
  };

  const handleCheckBox = (e, value) => {
    const name = e.target.name;
    setEmployer({ ...employer, [name]: value });
  };

  const handleSubmit = (employer) => {
    submitEmployer(employer, handleClose, setEmailError, setPasswordError);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle id="form-dialog-title">Add employee</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the details of the employer.
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
            <Button onClick={() => handleSubmit(employer)} color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
