import React from "react";
import ListItem from "@material-ui/core/ListItem";
import { FormControlLabel, TextField, Checkbox } from "@material-ui/core";

export function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

// Checkbox with newline and proper margin
// label = name
export function MyCheckBox(props) {
  const { onChange, label, name } = props;
  return (
    <FormControlLabel
      control={<Checkbox onChange={onChange} name={name} />}
      label={label}
      style={{ display: "block", marginTop: 5 }}
    />
  );
}
