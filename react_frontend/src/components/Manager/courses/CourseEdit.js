/* eslint-disable react/prop-types */
import React from "react";
import Button from "@material-ui/core/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { MyEditCheckBox } from "../../../utils/utils";
import axios from "axios";
import { getUserToken } from "../../../utils/authUtils";
import CourseQuestionAdd from "./CourseQuestionAdd";
import {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  apiGetEmp,
} from "../../../utils/utils";

export default function CourseEdit(props) {
  let { item } = props;
  const { onClose, handleDelete } = props;
  const [addQuestion, setAddQuestion] = React.useState(false);
  const [courseQuestions, setCourseQuestions] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    item = { ...item, [name]: value };
  };

  const handleCheckBox = (e, value) => {
    const name = e.target.name;
    item = { ...item, [name]: value };
  };

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (item) => {
    if (item.id) {
      apiPut(
        `http://localhost:8000/api/manager/courses/`,
        handleResponseCourseEdit,
        handleFailCourseEdit,
        item
      );
    }
  };

  const handleResponseCourseEdit = (response) => {
    handleClose();
  };

  const handleFailCourseEdit = (response) => {};

  const handleCourseQuestionAddClose = () => {
    setAddQuestion(false);
  };

  const getCourseQuestions = () => {
    apiGet(
      "http://localhost:8000/api/manager/course/questions/",
      handleResponseGetCourseQuestions
    );
  };

  const handleResponseGetCourseQuestions = (response) => {
    setCourseQuestions(response.data);
  };

  return (
    <div>
      <form>
        <TextField
          autoFocus
          name="title"
          label="Title"
          variant="outlined"
          onChange={handleChange}
          defaultValue={item.title}
          margin="normal"
          fullWidth
        />
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          onChange={handleChange}
          defaultValue={item.description}
          margin="normal"
          fullWidth
        />

        <MyEditCheckBox
          name="active"
          label="Active"
          defaultChecked={item.active}
          onChange={handleCheckBox}
        />

        <MyEditCheckBox
          name="individual_result"
          label="Allow to see individual result per question"
          defaultChecked={item.individual_result}
          onChange={handleCheckBox}
        />

        <TextField
          name="course_duration"
          label="Course duration"
          variant="outlined"
          onChange={handleChange}
          defaultValue={item.course_duration}
          margin="normal"
          fullWidth
        />

        <TextField
          name="video"
          label="Video"
          variant="outlined"
          onChange={handleChange}
          defaultValue={item.video}
          margin="normal"
          fullWidth
        />

        <br />
        <br />
        <br />

        <Button
          onClick={() => setAddQuestion(true)}
          color="primary"
          variant="contained"
        >
          Add question to course
        </Button>

        {addQuestion ? (
          <CourseQuestionAdd
            onClose={handleCourseQuestionAddClose}
            course={item}
          />
        ) : null}

        <h4>List of questions</h4>
        {courseQuestions}

        <br />
        <br />

        <Button
          onClick={() => handleDelete(item)}
          variant="contained"
          color="secondary"
          style={{ marginTop: 10 }}
        >
          Delete Course
        </Button>

        <Button
          onClick={() => handleSubmit(item)}
          color="primary"
          variant="contained"
        >
          Confirm
        </Button>

        <Button onClick={onClose} color="primary" variant="contained">
          Cancel
        </Button>
      </form>
    </div>
  );
}
