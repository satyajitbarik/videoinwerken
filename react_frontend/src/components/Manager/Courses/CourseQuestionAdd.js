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

export default function CourseQuestionAdd(props) {
  const { onClose, course } = props;
  const [courseQuestion, setCourseQuestion] = React.useState(null); //course question
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
    setCourseQuestion({ ...courseQuestion, [name]: value });
    console.log(courseQuestion);
  };

  const handleCheckBox = (e, value) => {
    const name = e.target.name;
    setCourseQuestion({ ...courseQuestion, [name]: value });
  };

  const handleSubmit = (courseQuestion) => {
    courseQuestion.course = course.id;
    apiPost(
      "http://localhost:8000/api/manager/course/questions/",
      handleResponse,
      handleFail,
      courseQuestion
    );
    console.log(courseQuestion);
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
    <Dialog open={true} onClose={handleClose} fullWidth>
      <DialogTitle id="form-dialog-title">Add question</DialogTitle>
      <DialogContent>
        <form>
          <MyTextField
            name="question"
            label="Question"
            onChange={handleChange}
            autoFocus
          />

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => handleSubmit(courseQuestion)}
              color="primary"
            >
              Add
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
