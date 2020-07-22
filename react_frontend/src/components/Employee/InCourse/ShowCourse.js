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
    if (course.passed) {
      <TableCell style={{ color: "green", fontWeight: "bold" }}>
        Passed
      </TableCell>;
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
    //         <Checkbox checked={course.passed} />
  };

  const showCourse = () => {
    console.log("showing course");
    console.log(course);
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
