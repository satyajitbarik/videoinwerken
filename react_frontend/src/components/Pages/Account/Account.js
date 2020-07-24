/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { updateEmployer } from "./actions";
import { getUser } from "../Account/actions";
import GreenSnackbar from "../Snackbar";
import AccountEmployee from "./AccountEmployee";
import AccountEmployer from "./AccountEmployer";

export default function Account() {
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

  if (user.is_employer) {
    return (
      <AccountEmployer
        user={user}
        success={success}
        setSuccess={setSuccess}
        handleChange={handleChange}
        onSave={onSave}
      />
    );
  } else if (user.is_employee) {
    return (
      <AccountEmployee
        user={user}
        success={success}
        setSuccess={setSuccess}
        handleChange={handleChange}
        onSave={onSave}
      />
    );
  }
}
