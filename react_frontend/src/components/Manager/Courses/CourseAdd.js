/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from "react";
import { MyTextField, apiPost } from "../../../utils/utils";

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
import { renderError } from "../../../utils/renderUtils";

export default function CourseAdd(props) {
  const { open, onClose } = props;

  const [course, setCourse] = React.useState({
    title: "",
  });

  const [titleError, setTitleError] = React.useState("");

  const handleClose = () => {
    onClose();
    // reset errors
  };

  const handleChange = (e) => {
    console.log("handlechange");
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setCourse({ ...course, [name]: value });
    console.log(course);
  };

  const handleCheckBox = (e, value) => {
    const name = e.target.name;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = (course) => {
    const token = getUserToken();

    apiPost(
      "http://localhost:8000/api/manager/courses/",
      handleResponse,
      handleFail,
      course
    );
    console.log(course);
  };

  const handleResponse = (response) => {
    console.log("handle response");
    console.log(response.data);
    handleClose();
  };

  const handleFail = (response) => {
    console.log("handle fail");
    console.log(response.data);

    if (response.data.title) {
      setTitleError(response.data.title);
    } else {
      setTitleError(null);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle id="form-dialog-title">Add course</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the details of the course.
        </DialogContentText>

        <form>
          <MyTextField
            name="title"
            label="Title"
            onChange={handleChange}
            autoFocus
          />

          {renderError(titleError)}

          <MyTextField
            name="description"
            label="Description"
            onChange={handleChange}
          />

          <MyTextField
            label="Active result"
            name="active"
            onChange={handleChange}
          />

          <MyTextField
            label="Individual result"
            name="individual_result"
            onChange={handleChange}
          />

          <MyTextField
            name="course_duration"
            label="Course duration"
            onChange={handleChange}
          />

          <MyTextField name="video" label="Video" onChange={handleChange} />

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleSubmit(course)} color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const onSubmit = (values, dispatch, props) => {
  const item = {
    title: values.title,
    description: values.description,
    active: values.active,
    individual_result: values.individual_result,
    course_duration: values.course_duration,
    video: values.video,
  };
};
