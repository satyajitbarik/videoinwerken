/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthUrls } from "../../../constants/urls";
import { getUserToken } from "../../../utils/authUtils";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from "@material-ui/core";
import { apiGet, apiGetEmp } from "../../../utils/utils";

function EmployeeList() {
  const [employeeList, setEmployeeList] = React.useState(null);

  // Runs on initial render
  useEffect(() => {
    if (employeeList != null) {
      return;
    }
    refreshList();
  });

  // get list of employees of current user (the manager)
  const refreshList = () => {
    apiGet("http://localhost:8000/api/manager/employees/", handleResponse);
  };

  const handleResponse = (response) => {
    console.log(response);
    setEmployeeList(response.data);
  };

  // WHAT TO DO ABOUT THE WARNINGGGG????
  const renderEmployees = () => {
    return (
      <Table>
        <TableBody>
          {employeeList.map((emp) => (
            <TableRow key={emp.pk} style={{ cursor: "pointer" }}>
              <TableCell style={{ width: 50 }}>{emp.pk}</TableCell>
              <TableCell style={{ width: 50 }}>{emp.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div>
      <h3>Employees</h3>
      {employeeList && renderEmployees()}
    </div>
  );
}

export default EmployeeList;
