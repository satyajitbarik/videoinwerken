import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthUrls } from "../../../constants/urls";
import { Button } from "@material-ui/core";
import { getUserToken1 } from "../../../utils/authUtils";
import CourseCreate from "./CourseCreate";
import CourseEdit from "./CourseEdit";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

function Course() {
  const [detailItem, setDetailItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [coursesList, setCoursesList] = useState([]);
  const [activeItemAdd, setActiveItemAdd] = useState(null);
  const [current_user, setCurrent_user] = useState({});
  //const timeToChangeIngredients = 0;
  //let current_user = {};

  // useEffect will run on initial render, and after update on current_user
  /*useEffect(() => {
    console.log("hello");
    getCurrentUser();
    console.log("hello2");
  }, [timeToChangeIngredients]);
*/
  const getCurrentUser = () => {
    axios
      .get(AuthUrls.USER_PROFILE, {
        headers: {
          authorization: "Token " + getUserToken1(),
        },
      })
      .then((response) => {
        setCurrent_user(response.data);
        //current_user = response.data;
        console.log(current_user.pk);
        refreshList();
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
    const courses = coursesList;
    //console.log(courses);
    return (
      <Table>
        <TableBody>
          {courses.map((item) => (
            <TableRow
              key={item.id}
              onClick={() => {
                setDetailItem(item);
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

  const createItem = () => {
    const currentUserID = current_user.pk;
    console.log("current user id:" + currentUserID);

    const item = {
      title: "",
      description: "",
      active: false,
      individual_result: false,
      course_duration: "",
      video: "",
      manager_id: currentUserID,
    };
    setActiveItemAdd(item);
    setShowModal(true);
  };

  const detailItem1 = (item) => {
    const currentUserID = current_user.pk;
    console.log("current user id:" + currentUserID);

    return (
      <CourseEdit
        item={detailItem}
        onSave={handleSubmit} //not needed
        onClose={handleCloseEdit} //not needed possibly
      />
    );
  };

  const handleCloseAdd = () => {
    setShowModal(false);
  };

  const handleCloseEdit = () => {
    setDetailItem(null);
  };

  const handleSubmit = (item) => {
    console.log("handlesubmit");
    console.log(item);
    // Edit item
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/manager/courses/${item.id}/`, item, {
          headers: {
            authorization: "Token " + getUserToken1(),
          },
        })
        .then((response) => refreshList());
      handleCloseEdit();
      return;
    }
    // Create item
    axios
      .post(AuthUrls.COURSES, item, {
        headers: {
          authorization: "Token " + getUserToken1(),
        },
      })
      .then((response) => {
        refreshList();
        handleCloseAdd();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <div>
      <h3>Courses</h3>
      {renderCourses()}

      <Button
        onClick={createItem}
        variant="contained"
        color="primary"
        style={{ marginTop: 20 }}
      >
        Make new course
      </Button>
      {showModal ? (
        <CourseCreate
          item={activeItemAdd}
          onSave={handleSubmit}
          onClose={handleCloseAdd}
          showModal={showModal}
        />
      ) : null}

      {detailItem ? detailItem1(detailItem) : null}
    </div>
  );
}

export default Course;
