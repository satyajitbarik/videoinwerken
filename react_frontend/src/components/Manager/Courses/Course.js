/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthUrls } from "../../../constants/urls";
import { getUserToken } from "../../../utils/authUtils";
import { apiGetByUserId } from "../../../utils/utils";
import Table from "@material-ui/core/Table";
import { TableBody, TableCell, TableRow, Button } from "@material-ui/core";
import CourseAdd from "./CourseAdd";
import CourseEdit from "./CourseEdit";
import { apiGet, apiDelete, apiGetEmp } from "../../../utils/utils";

function Course() {
  const [coursesList, setCoursesList] = useState(null);
  const [openCourseAdd, setOpenCourseAdd] = useState(false);
  const [openCourseEdit, setOpenCourseEdit] = useState(false);
  const [courseDetail, setCourseDetail] = useState(null);

  // Runs on initial render
  useEffect(() => {
    if (coursesList != null) {
      return;
    }

    refreshList();
  });

  const refreshList = () => {
    apiGet("http://localhost:8000/api/manager/mycourses/", handleResponse);
  };

  const handleResponse = (response) => {
    console.log(response);
    setCoursesList(response.data);
  };

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
                handleOpenEdit(item);
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

  const handleOpenAdd = () => {
    setOpenCourseAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenCourseAdd(false);
    refreshList();
  };

  const handleOpenEdit = (course) => {
    setCourseDetail(course);
    setOpenCourseEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenCourseEdit(false);
    refreshList();
  };

  const deleteCourse = (course) => {
    if (course.id) {
      apiDelete(
        "http://localhost:8000/api/manager/courses/",
        course,
        handleResponseDelete
      );
      // `http://localhost:8000/api/manager/courses/${course.id}/`,
      handleCloseEdit();
      return;
    }
  };

  // why doesnt this work??
  const handleDelete = (item) => {
    if (item.id) {
      axios
        .delete(`http://localhost:8000/api/manager/courses/${item.id}/`, item, {
          headers: {
            authorization: "Token " + getUserToken(),
          },
        })
        .then((response) => refreshList());
      handleCloseEdit();
      return;
    }
  };

  const handleResponseDelete = () => {
    refreshList();
  };

  const deleteAllCourses = () => {
    let i = 0;
    for (i = 0; i < coursesList.length; i++) {
      deleteCourse(coursesList[i]);
    }
  };

  return (
    <div>
      <h3>Courses</h3>
      {coursesList && renderCourses()}

      <Button
        onClick={handleOpenAdd}
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

      <CourseAdd onClose={handleCloseAdd} open={openCourseAdd} />

      {courseDetail ? (
        <CourseEdit
          item={courseDetail}
          onClose={handleCloseEdit} //not needed possibly
          handleDelete={handleDelete}
          open={openCourseEdit}
        />
      ) : null}
    </div>
  );
}

export default Course;
