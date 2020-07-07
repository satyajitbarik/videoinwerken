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

export default function EmployeeEdit(props) {
  let { employee } = props;
  const { onClose, handleDelete, open } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    employee = { ...employee, [name]: value };
  };

  const handleCheckBox = (e, value) => {
    const name = e.target.name;
    employee = { ...employee, [name]: value };
  };

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (employee) => {
    if (employee.id) {
      axios
        .put(
          `http://localhost:8000/api/manager/courses/${employee.id}/`,
          employee,
          {
            headers: {
              authorization: "Token " + getUserToken(),
            },
          }
        )
        .then((response) => {
          handleClose();
        })
        .catch((error) => {
          console.log(error.response);
        });
      return;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit employee</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the details of the course.
        </DialogContentText>

        {console.log(employee)}

        <form>
          <TextField
            autoFocus
            name="title"
            label="Title"
            variant="outlined"
            onChange={handleChange}
            defaultValue={employee.email}
            margin="normal"
            fullWidth
          />
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            onChange={handleChange}
            defaultValue={employee.iban}
            margin="normal"
            fullWidth
          />

          <Button
            onClick={() => handleDelete(employee)}
            variant="contained"
            color="secondary"
            style={{ marginTop: 10 }}
          >
            Delete Course
          </Button>
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
