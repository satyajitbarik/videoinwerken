/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { updateEmployer } from "./actions";
import { getUser } from "../Account/actions";
import GreenSnackbar from "../Snackbar";

export default function EmployerAccount() {
  const [user, setUser] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  // Get logged in user
  useEffect(() => {
    if (user == null) {
      console.log("retrieving user");
      getUser(setUser);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const handleCheckBox = (e, value) => {
    const name = e.target.name;
    setUser({ ...user, [name]: value });
  };

  const onSave = () => {
    // send message update profile succesful!
    console.log("Saved!");
    setSuccess(true);
  };

  if (user == null) {
    return <div>Loading...</div>;
  }
  if (!user.is_employer) {
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

      <Button onClick={() => updateEmployer(user, onSave)} color="primary">
        Save
      </Button>

      <GreenSnackbar
        open={success}
        setOpen={setSuccess}
        text="Account saved!"
      />
    </form>
  );
}
