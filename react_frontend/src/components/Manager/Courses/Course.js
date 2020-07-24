/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserToken } from "../../../utils/authUtils";
import Table from "@material-ui/core/Table";
import { TableBody, TableCell, TableRow, Button } from "@material-ui/core";

import { AuthUrls } from "../../../constants/urls";
import { apiGetByUserId } from "../../../utils/utils";
import CourseEdit from "./CourseEdit";
import { apiGet, apiDelete, apiGetEmp } from "../../../utils/utils";
import CourseCreate from "./CourseCreate";
import { getUser } from "../../Pages/Account/actions";

function Course() {
  // The displayed list of courses
  const [coursesList, setCoursesList] = useState(null);

  // The course that is selected (null if none selected)
  const [courseDetail, setCourseDetail] = useState(null);

  // Are we in creating course screen?
  const [creatingCourse, setCreatingCourse] = useState(false);
  const [user, setUser] = React.useState(null);
  // Initial run
  useEffect(() => {
    if (user == null) {
      console.log("retrieving user courses list");
      getUser(setUser);
    }
    if (coursesList == null) {
      retrieveCourses();
      return;
    }
  }, [user]);

  // Retrieve courses from database
  const retrieveCourses = () => {
    apiGet("http://localhost:8000/api/manager/mycourses/", handleResponse);
  };
  const handleResponse = (response) => {
    console.log(response);
    setCoursesList(response.data);
  };
  ///

  // Render courses
  const renderCourses = () => {
    if (coursesList.length == 0) {
      return <div>You have no courses!</div>;
    }

    return (
      <Table>
        <TableBody>
          {coursesList.map((item) => (
            <TableRow
              key={item.id}
              onClick={() => {
                setCourseDetail(item);
              }}
              style={{ cursor: "pointer" }}
            >
              <TableCell style={{ width: 50 }}>{item.id}</TableCell>
              <TableCell>{item.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const handleCloseAdd = () => {
    setCreatingCourse(false);
    setCourseDetail(null);
    retrieveCourses();
  };

  const handleCloseEdit = () => {
    setCourseDetail(false);
    retrieveCourses();
  };

  // Delete course
  const deleteCourse = (item) => {
    if (item.id) {
      apiDelete(
        "http://localhost:8000/api/manager/courses/",
        item,
        handleResponseDelete
      );
    }
  };
  const handleResponseDelete = () => {
    retrieveCourses();
    handleCloseEdit();
  };
  ///

  const deleteAllCourses = () => {
    let i = 0;
    for (i = 0; i < coursesList.length; i++) {
      deleteCourse(coursesList[i]);
    }
  };

  const renderCoursesList = () => {
    return (
      <div>
        <h3>Courses</h3>
        {coursesList && renderCourses()}

        <Button
          onClick={() => setCreatingCourse(true)}
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
        >
          Make new course
        </Button>

        <Button
          onClick={deleteAllCourses}
          variant="contained"
          color="primary"
          style={{ marginTop: 20, marginLeft: 10 }}
        >
          Delete all courses
        </Button>
      </div>
    );
  };

  if (user == null) {
    return <div>Loading...</div>;
  }
  if (!user.is_employer) {
    return <div>This page can only be accessed by employers.</div>;
  }

  if (creatingCourse) {
    console.log("creating course");
    return <CourseCreate onClose={handleCloseAdd} />;
  } else if (courseDetail) {
    console.log("course detail");
    return (
      <CourseEdit
        course={courseDetail}
        onClose={handleCloseEdit} //not needed possibly
        handleDelete={deleteCourse}
      />
    );
  } else {
    console.log("render courses list");
    return renderCoursesList();
  }
}

export default Course;
