/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { updateEmployer } from "./actions";
import { getUser } from "./actions";
import GreenSnackbar from "../Snackbar";

export default function AccountEmployee(props) {
  const { user, success, setSuccess, handleChange, onSave } = props;

  if (!user.is_employee) {
    return <div>This page can only be accessed by employers.</div>;
  }

  return (
    <form>
      <TextField
        autoFocus
        name="email"
        label="Email"
        variant="outlined"
        onChange={handleChange}
        defaultValue={user.email}
        margin="normal"
        //disabled
        fullWidth
      />

      <TextField
        name="iban"
        label="IBAN"
        variant="outlined"
        onChange={handleChange}
        defaultValue={user.iban}
        margin="normal"
        fullWidth
      />

      <Button
        style={{ marginTop: 20 }}
        onClick={() => updateEmployer(user, onSave)}
        variant="contained"
        color="primary"
      >
        Save
      </Button>

      <Button
        style={{ marginTop: 20, marginLeft: 10 }}
        href="/change_password"
        variant="contained"
        color="primary"
      >
        Change Password
      </Button>

      <GreenSnackbar
        open={success}
        setOpen={setSuccess}
        text="Account saved!"
      />
    </form>
  );
}
