/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from "react";
import axios from "axios";

import { reduxForm, Field, propTypes } from "redux-form";
import { required } from "redux-form-validators";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getUserToken } from "../../../utils/authUtils";
import {
  myRenderField,
  myRenderCheckBoxField,
} from "../../../utils/renderUtils";
import { AuthUrls } from "../../../constants/urls";

function CourseAdd(props) {
  const { manager_id, open, onClose, handleSubmit /*redux*/, error } = props;

  const test = 1;

  const handleClose = () => {
    onClose();
    props.reset();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
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
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const handleSubmit = (props, item) => {
  const { onClose } = props;

  axios
    .post(AuthUrls.COURSES, item, {
      headers: {
        authorization: "Token " + getUserToken(),
      },
    })
    .then((response) => {
      onClose();
      props.reset();
    })
    .catch((error) => {
      console.log(error.response);
    });
};

const onSubmit = (values, dispatch, props) => {
  //const { manager_id, handleClose } = props;

  const item = {
    title: values.title,
    description: values.description,
    active: values.active,
    individual_result: values.individual_result,
    course_duration: values.course_duration,
    video: values.video,
    manager_id: props.manager_id,
  };

  handleSubmit(props, item);
};

// state
const mapStateToProps = (state) => {
  return { manager_id: state.manager_id };
};

export default reduxForm({
  form: "course-create-form",
  onSubmit,
})(connect(mapStateToProps)(CourseAdd));
