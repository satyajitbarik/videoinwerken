/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect } from "react";
import { MyTextField, apiPost, MyCheckBox } from "../../../utils/utils";

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
import { getUser } from "../../Pages/Account/actions";
import VideoUpload from "../../Pages/Youtube/VideoUpload";

export default function CourseCreate(props) {
  const { onClose } = props;
  const [user, setUser] = React.useState(null);

  const [course, setCourse] = React.useState({
    title: "",
    description: "",
    active: true,
    individual_result: false,
    course_duration: "",
    video: null,
  });
  const [titleError, setTitleError] = React.useState("");
  const [addQuestion, setAddQuestion] = React.useState(false);

  //const [selectedVideo, setSelectedVideo] = React.useState(null);

  // Get logged in user
  useEffect(() => {
    if (user == null) {
      console.log("retrieving user");
      getUser(setUser);
    }
  });

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

  const handleUpdateVideo = (name) => {
    setCourse({ ...course, ["video"]: name });
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
        <MyCheckBox name="active" label="Active" onChange={handleCheckBox} />
        <MyCheckBox
          name="individual_result"
          label="Allow to see individual result per question"
          onChange={handleCheckBox}
        />
        <MyTextField
          name="course_duration"
          label="Course duration"
          onChange={handleChange}
        />
        Video: {course.video ? course.video : "None"}
        <VideoUpload handleUpdateVideo={handleUpdateVideo} />
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          style={{ marginTop: 20 }}
        >
          Add questions
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

  if (user == null) {
    return <div>Loading...</div>;
  }
  if (!user.is_employer) {
    return <div>This page can only be accessed by employers.</div>;
  }

  // MAIN PAGE
  if (addQuestion) {
    return (
      <CourseQuestionAdd
        onClose={handleClose}
        course={course}
        questionsAndAnswers={[]}
      />
    );
  } else {
    return courseDetailsPage();
  }
}
