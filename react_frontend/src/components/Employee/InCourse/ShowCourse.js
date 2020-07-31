/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import { TableBody, TableCell, TableRow, Button } from "@material-ui/core";
import { getCourses, getQuestionsAndAnswers } from "../employeeActions";
import EmployeeDoCourse from "../../Employee/InCourse/EmployeeDoCourse";
import { Checkbox } from "@material-ui/core";

function ShowCourse(props) {
  const { course, setSelectedCourse } = props;

  const status = () => {
    console.log("STATUS");
    console.log(course);
    console.log(course.id);
    console.log(course.attempted);
    console.log(course.passed);

    if (course.passed) {
      return (
        <TableCell style={{ color: "green", fontWeight: "bold" }}>
          Passed
        </TableCell>
      );
    } else if (course.attempted) {
      return (
        <TableCell style={{ color: "purple", fontWeight: "bold" }}>
          Attempted
        </TableCell>
      );
    } else {
      return (
        <TableCell style={{ color: "black", fontWeight: "bold" }}>
          Not started
        </TableCell>
      );
    }
  };

  const showCourse = () => {
    return (
      <TableRow key={course.id}>
        <TableCell>{course.id}</TableCell>
        <TableCell>{course.title}</TableCell>
        {status()}
        <TableCell>
          <Button onClick={() => setSelectedCourse(course)}>Play</Button>
        </TableCell>
      </TableRow>
    );
  };

  return showCourse();
}

export default ShowCourse;
