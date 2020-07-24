/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { getCourseQuestions, submitCourse } from "./courseActions";
import { getQuestionsAndAnswers } from "../../Employee/employeeActions";
import { TextField } from "@material-ui/core";
import { MyEditCheckBox } from "../../../utils/utils";
import CourseQuestionAdd from "./CourseQuestionAdd";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";

export default function CourseEdit(props) {
  let { course } = props;
  const { onClose, handleDelete } = props;
  const [addQuestion, setAddQuestion] = React.useState(false);

  //const [courseQuestions, setCourseQuestions] = React.useState(null);
  const [questionsAndAnswers, setQuestionsAndAnswers] = React.useState(null);

  // Runs on initial render
  useEffect(() => {
    if (questionsAndAnswers != null) {
      return;
    }
    console.log("USEEFFECT: get questions and answers");
    getQuestionsAndAnswers(course.id, setQuestionsAndAnswers);
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    course = { ...course, [name]: value };
  };

  const handleCheckBox = (e, value) => {
    const name = e.target.name;
    course = { ...course, [name]: value };
  };

  const handleCourseQuestionAddClose = () => {
    setAddQuestion(false);
  };

  const courseDetails = () => {
    return (
      <div>
        <form>
          <TextField
            autoFocus
            name="title"
            label="Title"
            variant="outlined"
            onChange={handleChange}
            defaultValue={course.title}
            margin="normal"
            fullWidth
          />
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            onChange={handleChange}
            defaultValue={course.description}
            margin="normal"
            fullWidth
          />

          <MyEditCheckBox
            name="active"
            label="Active"
            defaultChecked={course.active}
            onChange={handleCheckBox}
          />

          <MyEditCheckBox
            name="individual_result"
            label="Allow to see individual result per question"
            defaultChecked={course.individual_result}
            onChange={handleCheckBox}
          />

          <TextField
            name="course_duration"
            label="Course duration"
            variant="outlined"
            onChange={handleChange}
            defaultValue={course.course_duration}
            margin="normal"
            fullWidth
          />

          <TextField
            name="video"
            label="Video"
            variant="outlined"
            onChange={handleChange}
            defaultValue={course.video}
            margin="normal"
            fullWidth
          />
        </form>

        <Button
          onClick={() => setAddQuestion(true)}
          color="primary"
          variant="contained"
          style={{ marginTop: 10 }}
        >
          Add questions to course
        </Button>

        <Button
          onClick={() => submitCourse(course, onClose)}
          color="primary"
          variant="contained"
          style={{ marginTop: 10, marginLeft: 10 }}
        >
          Save
        </Button>

        <Button
          onClick={onClose}
          color="primary"
          variant="contained"
          style={{ marginTop: 10, marginLeft: 10 }}
        >
          Cancel
        </Button>

        <Button
          onClick={() => handleDelete(course)}
          variant="contained"
          color="secondary"
          style={{ marginTop: 10, marginLeft: 10 }}
        >
          Delete Course
        </Button>
      </div>
    );
  };

  return (
    <div>
      {addQuestion ? (
        <CourseQuestionAdd
          onClose={handleCourseQuestionAddClose}
          course={course}
          questionsAndAnswers={questionsAndAnswers}
        />
      ) : (
        courseDetails()
      )}
    </div>
  );
}
