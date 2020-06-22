/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthUrls } from "../../../constants/urls";
import { getUserToken } from "../../../utils/authUtils";
import Table from "@material-ui/core/Table";
import { TableBody, TableCell, TableRow, Button } from "@material-ui/core";
import CourseAdd from "./CourseAdd";
import CourseEdit from "./CourseEdit";
import { apiGet } from "../../../utils/utils";

function EmployeeList() {
  const [employeeList, setEmployeeList] = React.useState(null);

  const handleResponse = (response) => {
    setEmployeeList(response.data);
    alert("hi");
  };
  const refreshList = () => {
    const token = getUserToken();
    if (!token) {
      return;
    }
    axios
      .get(AuthUrls.COURSES, {
        headers: {
          authorization: "Token " + token,
        },
        /*params: {
          manager_id: current_user.pk,
        },*/
      })
      .then((response) => {
        handleResponse(response);
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

  return (
    <div>
      <h3>Courses</h3>
      {renderCourses()}
    </div>
  );
}

export default EmployeeList;
