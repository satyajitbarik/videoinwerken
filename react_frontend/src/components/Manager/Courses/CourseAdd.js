/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormControlLabel, TextField, Checkbox } from "@material-ui/core";
import { MyCheckBox } from "../../../utils/utils";
import axios from "axios";
import { getUserToken1 } from "../../../utils/authUtils";
import { renderField, renderError } from "../../../utils/renderUtils";
import { AuthUrls } from "../../../constants/urls";

import { reduxForm, Field, propTypes } from "redux-form";

import { required } from "redux-form-validators";

function CourseCreate(props) {
  let { item } = props;
  const { open, onSave, onClose, handleSubmit /*redux*/ } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    item = { ...item, [name]: value };
    console.log(item);
  };

  const handleCheckBox = (e, value) => {
    const name = e.target.name;
    console.log(name);
    console.log(value);
    item = { ...item, [name]: value };
    console.log(item);
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add course</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the details of the course.
        </DialogContentText>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="form-group">
            <Field
              name="title"
              label="title"
              component={renderField}
              type="text"
              validate={[required({ message: "This field i." })]}
            />
          </fieldset>

          <TextField
            name="description"
            label="Description"
            variant="outlined"
            onChange={handleChange}
            margin="normal"
            fullWidth
          />

          <MyCheckBox onChange={handleCheckBox} label="Active" name="active" />

          <MyCheckBox
            onChange={handleCheckBox}
            label="Individual result"
            name="individual_result"
          />

          <TextField
            name="course_duration"
            label="Course duration"
            variant="outlined"
            onChange={handleChange}
            margin="normal"
            fullWidth
          />

          <TextField
            name="video"
            label="Video"
            variant="outlined"
            onChange={handleChange}
            margin="normal"
            fullWidth
          />

          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => onSave(item)} color="primary">
              Add
            </Button>
            <Button type="submit" color="primary">
              Terst Redux
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const handleSubmit = (onClose, item) => {
  console.log("handleSubmit:");

  console.log(item);
  console.log("1");
  // Create item
  axios
    .post(AuthUrls.COURSES, item, {
      headers: {
        authorization: "Token " + getUserToken1(),
      },
    })
    .then((response) => {
      onClose();
    })
    .catch((error) => {
      console.log(error.response.data);
    });
};

const onSubmit = (values, dispath, props) => {
  const { onClose, item } = props;
  // console.log("hi");
  console.log(values.title);
  console.log("onsubmit item");
  console.log((item.title = values.title));
  handleSubmit(onClose, item);
  props.onClose();
};

export default reduxForm({
  form: "course-create-form",
  onSubmit,
})(CourseCreate);
