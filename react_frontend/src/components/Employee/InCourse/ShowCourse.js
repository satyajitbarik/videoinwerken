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
} from "../employeeActions";
import EmployeeDoCourse from "../../Employee/InCourse/EmployeeDoCourse";

function ShowCourse(props) {
  const { course, setSelectedCourse } = props;

  const showCourse = () => {
    return (
      <TableRow key={course.id}>
        <TableCell>FinishedCheckbox(todo)</TableCell>
        <TableCell>{course.id}</TableCell>
        <TableCell>{course.title}</TableCell>
        <TableCell>Passed: (todo)</TableCell>
        <TableCell>
          <Button onClick={() => setSelectedCourse(course)}>Play</Button>
        </TableCell>
      </TableRow>
    );
  };

  return showCourse();
}

export default ShowCourse;
