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
import { Redirect } from "react-router-dom";

export default function CourseCreate(props) {
  const { onClose } = props;

  const [course, setCourse] = React.useState(null);

  const [titleError, setTitleError] = React.useState("");

  const handleClose = () => {
    onClose();
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

      <Button
        onClick={() => handleSubmit(course)}
        color="primary"
        variant="contained"
        style={{ marginTop: 20 }}
      >
        Add
      </Button>

      <Button
        onClick={handleClose}
        color="primary"
        variant="contained"
        style={{ marginTop: 20, marginLeft: 10 }}
        //href="../manager/courses"
      >
        Cancel
      </Button>
    </form>
  );
}
