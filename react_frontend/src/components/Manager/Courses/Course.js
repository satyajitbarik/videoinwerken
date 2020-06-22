/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthUrls } from "../../../constants/urls";
import { Button } from "@material-ui/core";
import { getUserToken1 } from "../../../utils/authUtils";
import CourseCreate from "./CourseAdd";
import CourseEdit from "./CourseEdit";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { render } from "enzyme";
import CourseAdd from "./CourseAdd";

function Course() {
  const [detailItem, setDetailItem] = useState(null);
  const [coursesList, setCoursesList] = useState(null);
  const [activeItemAdd, setActiveItemAdd] = useState(null);
  const [current_user, setCurrent_user] = useState(null);

  const [openCourseAdd, setOpenCourseAdd] = useState(false);
  const [openCourseEdit, setOpenCourseEdit] = useState(false);

  // Runs on initial render
  useEffect(() => {
    if (current_user == null) {
      getCurrentUser();
      return;
    }

    if (coursesList != null) {
      return;
    }

    refreshList();
  });

  const getCurrentUser = () => {
    axios
      .get(AuthUrls.USER_PROFILE, {
        headers: {
          authorization: "Token " + getUserToken1(),
        },
      })
      .then((response) => {
        setCurrent_user(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const refreshList = () => {
    const token = getUserToken1();
    if (!token) {
      return;
    }
    axios
      .get(AuthUrls.COURSES, {
        headers: {
          authorization: "Token " + token,
        },
        params: {
          manager_id: current_user.pk,
        },
      })
      .then((response) => {
        setCoursesList(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const renderCourses = () => {
    if (coursesList == null) {
      //console.log("huh");
      return;
    }

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

  const handleOpenEdit = (item) => {
    setDetailItem(item);
    setOpenCourseEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenCourseEdit(false);
    refreshList();
  };

  const handleDelete = (item) => {
    if (item.id) {
      axios
        .delete(`http://localhost:8000/api/manager/courses/${item.id}/`, item, {
          headers: {
            authorization: "Token " + getUserToken1(),
          },
        })
        .then((response) => refreshList());
      handleCloseEdit();
      return;
    }
  };

  const deleteAllCourses = () => {
    let i = 0;
    for (i = 0; i < coursesList.length; i++) {
      handleDelete(coursesList[i]);
    }
  };

  return (
    <div>
      <h3>Courses</h3>
      {renderCourses()}

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

      {current_user && (
        <CourseAdd
          onClose={handleCloseAdd}
          open={openCourseAdd}
          manager_id={current_user.pk}
        />
      )}

      {detailItem ? (
        <CourseEdit
          item={detailItem}
          onClose={handleCloseEdit} //not needed possibly
          handleDelete={handleDelete}
          open={openCourseEdit}
        />
      ) : null}
    </div>
  );
}

export default Course;
