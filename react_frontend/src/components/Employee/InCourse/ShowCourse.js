/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import { TableBody, TableCell, TableRow, Button } from "@material-ui/core";
import { getCourses, getQuestionsAndAnswers } from "../employeeActions";
import EmployeeDoCourse from "../../Employee/InCourse/EmployeeDoCourse";

function ShowCourse(props) {
  const { course, setSelectedCourse } = props;

  const showCourse = () => {
    console.log("showing course");
    console.log(course);
    return (
      <TableRow key={course.id}>
        <TableCell>{course.id}</TableCell>
        <TableCell>{course.title}</TableCell>
        <TableCell>
          Course attempted: {course.attempted ? "Yes" : "No"}
        </TableCell>
        <TableCell>Course passed: {course.passed ? "Yes" : "No"}</TableCell>
        <TableCell>
          <Button onClick={() => setSelectedCourse(course)}>Play</Button>
        </TableCell>
      </TableRow>
    );
  };

  return showCourse();
}

export default ShowCourse;
