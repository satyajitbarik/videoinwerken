/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import { TableBody, TableCell, TableRow, Button } from "@material-ui/core";
import {
  getCourses,
  getEmployeeQuestion,
  getQuestionsAndAnswers,
  getCourseQuestions,
} from "../employeeActions";
import EmployeeDoCourse from "../../Employee/InCourse/EmployeeDoCourse";

function ShowCourse(props) {
  const { course, setSelectedCourse, employeeQuestionList } = props;

  // course-questions pairs
  const [passed, setPassed] = React.useState(null);

  const [attempted, setAttempted] = React.useState(null);

  const finishedCourse = () => {
    getCourseQuestions(course.id, setPassed, setAttempted);

    return <TableCell>Course started: {attempted}</TableCell>;
  };

  const coursePassed = () => {
    return <TableCell>Course passed: {passed}</TableCell>;
  };

  const showCourse = () => {
    return (
      <TableRow key={course.id}>
        {finishedCourse()}
        <TableCell>{course.id}</TableCell>
        <TableCell>{course.title}</TableCell>
        {coursePassed()}
        <TableCell>
          <Button onClick={() => setSelectedCourse(course)}>Play</Button>
        </TableCell>
      </TableRow>
    );
  };

  return showCourse();
}

export default ShowCourse;
