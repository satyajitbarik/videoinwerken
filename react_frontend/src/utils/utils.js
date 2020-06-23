/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import axios from "axios";
import { getUserToken } from "./authUtils";

export function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

// Checkbox with newline and proper margin
// label = name
export function MyCheckBox(props) {
  const { onChange, label, name } = props;
  return (
    <MyEditCheckBox
      onChange={onChange}
      label={label}
      name={name}
      defaultChecked={false}
    />
  );
}

export function MyEditCheckBox(props) {
  const { name, label, defaultChecked, onChange } = props;
  return (
    <FormControlLabel
      control={
        <Checkbox
          onChange={onChange}
          name={name}
          defaultChecked={defaultChecked}
        />
      }
      label={label}
      style={{ display: "block", marginTop: 10 }}
    />
  );
}

export function apiGet(url, handleResponse) {
  const token = getUserToken();
  if (!token) {
    return;
  }
  axios
    .get(url, {
      headers: {
        authorization: "Token " + token,
      },
    })
    .then((response) => {
      handleResponse(response);
    })
    .catch((error) => {
      console.log(error.response);
    });
}

export function apiGetEmp(url, handleResponse) {
  const token = getUserToken();
  if (!token) {
    return;
  }
  axios
    .get(url, {
      headers: {
        authorization: "Token " + token,
      },
      /*params: {
        param: true,
      },*/
    })
    .then((response) => {
      handleResponse(response);
    })
    .catch((error) => {
      console.log(error.response);
    });
}

export function apiGetByUserId(url, handleResponse, userId) {
  const token = getUserToken();
  if (!token) {
    return;
  }
  axios
    .get(url, {
      headers: {
        authorization: "Token " + token,
      },
      params: {
        user_id: userId,
      },
    })
    .then((response) => {
      handleResponse(response);
    })
    .catch((error) => {
      console.log(error.response);
    });
}
