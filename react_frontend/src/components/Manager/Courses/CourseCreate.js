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
import CourseQuestionAdd from "./CourseQuestionAdd";

export default function CourseCreate(props) {
  const { onClose } = props;
  const [course, setCourse] = React.useState({
    title: "",
    description: "",
    active: true,
    individual_result: false,
    course_duration: "",
    video: "",
  });
  const [titleError, setTitleError] = React.useState("");
  const [addQuestion, setAddQuestion] = React.useState(false);

  const handleClose = () => {
    setAddQuestion(false);
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

  const handleSubmit = () => {
    apiPost(
      "http://localhost:8000/api/manager/courses/",
      handleResponse,
      handleFail,
      course
    );
    console.log(course);
  };

  const handleResponse = (response) => {
    console.log("handle response adding course");
    course.id = response.data.id;
    course.manager_id = response.data.manager_id;
    console.log(course);

    // Go to add questions page
    setAddQuestion(true);
  };

  const handleFail = (response) => {
    console.log("handle fail adding course");
    console.log(response.data);

    if (response.data.title) {
      setTitleError(response.data.title);
    } else {
      setTitleError(null);
    }
  };

  const courseDetailsPage = () => {
    return (
      <form>
        <MyTextField
          name="title"
          label="Title"
          onChange={handleChange}
          value={course.title}
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
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          style={{ marginTop: 20 }}
        >
          Add questions
        </Button>

        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          style={{ marginTop: 20, marginLeft: 10 }}
        >
          Done
        </Button>

        <Button
          onClick={onClose}
          color="primary"
          variant="contained"
          style={{ marginTop: 20, marginLeft: 10 }}
        >
          Cancel
        </Button>
      </form>
    );
  };

  if (course) {
    console.log(course);
    console.log("course title:" + course.title);
  } else {
    console.log("course is null");
  }

  // MAIN PAGE
  if (addQuestion) {
    return <CourseQuestionAdd onClose={handleClose} course={course} />;
  } else {
    return courseDetailsPage();
  }
}
