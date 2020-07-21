/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserToken } from "../../utils/authUtils";
import Table from "@material-ui/core/Table";
import { TableBody, TableCell, TableRow, Button } from "@material-ui/core";
import { getCourses, getEmployeeQuestion } from "../Employee/employeeActions";
import EmployeeDoCourse from "../Employee/InCourse/EmployeeDoCourse";

function EmployeeCourses() {
  // List of courses
  const [coursesList, setCoursesList] = useState(null);

  const [selectedCourse, setSelectedCourse] = useState(null);

  // Employee-Questions pairs. To check if course attempted/passed
  const [employeeQuestionList, setEmployeeQuestionList] = useState(null);

  useEffect(() => {
    if (coursesList == null) getCourses(setCoursesList);

    if (employeeQuestionList == null)
      getEmployeeQuestion(setEmployeeQuestionList);
  });

  const showCourses = () => {
    console.log("coursesList:");
    console.log(coursesList);

    console.log("employeequestionlist:");
    console.log(employeeQuestionList);

    return (
      <div>
        <h3>Courses</h3>
        <div>Searchbar(todo)</div>
        <Table>
          <TableBody>
            {coursesList &&
              coursesList.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>FinishedCheckbox(todo)</TableCell>
                  <TableCell>{course.id}</TableCell>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>Progress(todo)</TableCell>
                  <TableCell>
                    <Button onClick={() => setSelectedCourse(course)}>
                      Play
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  if (selectedCourse) {
    return (
      <EmployeeDoCourse
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    );
  } else {
    return showCourses();
  }
}

export default EmployeeCourses;
