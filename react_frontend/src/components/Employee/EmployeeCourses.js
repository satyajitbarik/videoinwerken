/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserToken } from "../../utils/authUtils";
import Table from "@material-ui/core/Table";
import { TableBody, TableCell, TableRow, Button } from "@material-ui/core";
import {
  getCourses,
  getEmployeeQuestion,
  getQuestionsAndAnswers,
} from "../Employee/employeeActions";
import EmployeeDoCourse from "../Employee/InCourse/EmployeeDoCourse";
import ShowCourse from "../Employee/InCourse/ShowCourse";

function EmployeeCourses() {
  // List of courses
  const [coursesList, setCoursesList] = useState(null);

  // Employee-Questions pairs. To check if course attempted/passed
  const [employeeQuestionList, setEmployeeQuestionList] = useState(null);

  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    if (coursesList == null) getCourses(setCoursesList);

    // if (employeeQuestionList == null)
    //   getEmployeeQuestion(setEmployeeQuestionList);
  });

  const finishedCourse = (course) => {
    // getQuestionsAndAnswers(course.id, setQuestionsAndAnswers);
    // for (let i = 0; i < employeeQuestionList.length; i++) {
    //   const question = employeeQuestionList[i].question;
    //  }
  };

  const showCourses = () => {
    console.log("coursesList:");
    console.log(coursesList);

    //console.log("employeequestionlist:");
    // console.log(employeeQuestionList);

    return (
      <div>
        <h3>Courses</h3>
        <div>Searchbar(todo)</div>
        <Table>
          <TableBody>
            {coursesList &&
              coursesList.map((course) => (
                <ShowCourse
                  key={course.id}
                  course={course}
                  setSelectedCourse={setSelectedCourse}
                />
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
