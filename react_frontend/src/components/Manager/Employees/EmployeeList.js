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

  const refreshList = () => {
    apiGet("http://localhost:8000/api/accounts", handleResponse);
  };

  const handleResponse = (response) => {
    setEmployeeList(response.data);
    alert("hi");
  };

  const renderEmployees = () => {
    return (
      <Table>
        <TableBody>
          {employeeList.map((item) => (
            <TableRow
              key={item.id}
              onClick={() => {
                //handleOpenEdit(item);
                alert(item);
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
      <h3>Employees</h3>
      {renderEmployees()}
    </div>
  );
}

export default EmployeeList;
