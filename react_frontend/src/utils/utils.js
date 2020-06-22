/* eslint-disable react/prop-types */
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import { FormControlLabel, Checkbox } from "@material-ui/core";

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
