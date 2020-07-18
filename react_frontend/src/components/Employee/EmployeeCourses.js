/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserToken } from "../../utils/authUtils";
import Table from "@material-ui/core/Table";
import { TableBody, TableCell, TableRow, Button } from "@material-ui/core";
import { getCourses } from "../Employee/employeeActions";

function EmployeeCourses() {
  // List of courses
  const [coursesList, setCoursesList] = useState(null);

  useEffect(() => {
    if (coursesList == null) getCourses(setCoursesList);
  });

  const renderCourses = () => {
    console.log("coursesList:");
    console.log(coursesList);

    return (
      <Table>
        <TableBody>
          {coursesList &&
            coursesList.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.id}</TableCell>
                <TableCell>{course.title}</TableCell>

                {/*
                <TableCell>
                  Answers:
                  {item.answers.map(
                    (answer) =>
                      answer.answer +
                      " (" +
                      (answer.correct ? "correct" : "false") +
                      ")" +
                      ", "
                  )}
                </TableCell>
                  */}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div>
      <h3>Courses</h3>
      {renderCourses()}
    </div>
  );
}

export default EmployeeCourses;
