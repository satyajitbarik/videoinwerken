/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from "react";
import Button from "@material-ui/core/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { TextField } from "@material-ui/core";
import axios from "axios";
import { getUserToken } from "../../../utils/authUtils";
import { updateEmployer } from "./actions";

export default function EmployerEdit(props) {
  let { employer } = props;
  const { onCancel, onSave, handleDelete, open } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    employer = { ...employer, [name]: value };
    console.log(employer);
  };

  const handleCheckBox = (e, value) => {
    const name = e.target.name;
    employer = { ...employer, [name]: value };
  };

  return (
    <Dialog open={open} onClose={onCancel} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit employee</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the details of the employee.
        </DialogContentText>

        {console.log(employer)}

        <form>
          <TextField
            autoFocus
            name="email"
            label="Email"
            variant="outlined"
            onChange={handleChange}
            defaultValue={employer.email}
            margin="normal"
            disabled
            fullWidth
          />
          <TextField
            name="employer"
            label="Employer"
            variant="outlined"
            onChange={handleChange}
            defaultValue={employer.employer}
            margin="normal"
            fullWidth
          />

          <TextField
            name="iban"
            label="IBAN"
            variant="outlined"
            onChange={handleChange}
            defaultValue={employer.iban}
            margin="normal"
            fullWidth
          />

          <Button
            onClick={() => handleDelete(employer)}
            variant="contained"
            color="secondary"
            style={{ marginTop: 10 }}
          >
            Delete Employee
          </Button>
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => updateEmployer(employer, onSave)}
          color="primary"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
