/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserToken } from "../../utils/authUtils";
import Table from "@material-ui/core/Table";
import { TableBody, TableCell, TableRow, Button } from "@material-ui/core";
import {
  getCourses,
  getQuestionsAndAnswers,
} from "../Employee/employeeActions";
import EmployeeDoCourse from "../Employee/InCourse/EmployeeDoCourse";
import ShowCourse from "../Employee/InCourse/ShowCourse";

function EmployeeCourses() {
  const [coursesDict, setCoursesDict] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    if (coursesDict == null) {
      getCourses(setCoursesDict);
    }
  });

  const showCourses = () => {
    if (coursesDict == null) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>Courses</h3>
        <Table>
          <TableBody>
            {Object.keys(coursesDict).map((courseId) => (
              <ShowCourse
                key={coursesDict[courseId].id}
                course={coursesDict[courseId]}
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
