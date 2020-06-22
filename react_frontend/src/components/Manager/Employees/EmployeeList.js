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
import { apiGet } from "../../../utils/utils";

function EmployeeList() {
  const [employeeList, setEmployeeList] = React.useState(null);

  // Runs on initial render
  useEffect(() => {
    if (employeeList != null) {
      return;
    }
    refreshList();
  }, [employeeList]);

  const refreshList = () => {
    apiGet("http://localhost:8000/api/accounts/", handleResponse);
  };

  const handleResponse = (response) => {
    setEmployeeList(response.data);
    console.log(response.data);
  };

  // WHAT TO DO ABOUT THE WARNINGGGG????
  const renderEmployees = () => {
    return (
      <Table>
        <TableBody>
          {console.log(employeeList)}
          {employeeList.map((emp) => (
            <TableRow key={emp.id} style={{ cursor: "pointer" }}>
              <TableCell style={{ width: 50 }}>Hoi</TableCell>
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
