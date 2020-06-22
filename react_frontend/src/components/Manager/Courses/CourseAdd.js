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
import {
  renderField,
  renderError,
  myRenderField,
  myRenderCheckBoxField,
} from "../../../utils/renderUtils";
import { AuthUrls } from "../../../constants/urls";

import { reduxForm, Field, propTypes } from "redux-form";

import { required } from "redux-form-validators";

function CourseCreate(props) {
  const { item, open, onSave, onClose, handleSubmit /*redux*/, error } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle id="form-dialog-title">Add course</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the details of the course.
        </DialogContentText>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            name="title"
            label="Title"
            component={myRenderField}
            validate={[required({ message: "This field is required." })]}
            autoFocus={true}
          />

          <Field
            name="description"
            label="Description"
            component={myRenderField}
          />

          <Field
            label="Active result"
            name="active"
            component={myRenderCheckBoxField}
          />

          <Field
            label="Individual result"
            name="individual_result"
            component={myRenderCheckBoxField}
          />

          <Field
            name="course_duration"
            label="Course duration"
            component={myRenderField}
          />

          <Field name="video" label="Video" component={myRenderField} />

          <DialogActions>
            <Button onClick={handleClose} color="primary">
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

const handleSubmit = (handleClose, item) => {
  console.log("handlesubmit");
  console.log(item);
  axios
    .post(AuthUrls.COURSES, item, {
      headers: {
        authorization: "Token " + getUserToken1(),
      },
    })
    .then((response) => {
      handleClose();
    })
    .catch((error) => {
      console.log(error.response);
    });
};

const onSubmit = (values, dispath, props) => {
  const { onClose, item } = props;
  console.log("values");
  console.log(values);
  item.title = values.title;
  item.description = values.description;
  item.active = values.active;
  item.individual_result = values.individual_result;
  console.log("item");
  console.log(item);
  handleSubmit(onClose, item);
  props.onClose();

  console.log("individiual result:" + values.individual_result);

  props.reset(); // this is to reset the form, only needed for dialog like this
};

export default reduxForm({
  form: "course-create-form",
  onSubmit,
})(CourseCreate);
