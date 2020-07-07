/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthUrls } from "../../../constants/urls";
import { getUserToken } from "../../../utils/authUtils";
import EmployeeAdd from "./EmployeeAdd";

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
  const [openEmployeeAdd, setOpenEmployeeAdd] = React.useState(false);

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
    //apiGet("http://localhost:8000/api/customusers/", handleResponse);
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
            <TableRow key={emp.id} style={{ cursor: "pointer" }}>
              <TableCell style={{ width: 50 }}>{emp.id}</TableCell>
              <TableCell style={{ width: 50 }}>{emp.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const handleOpenAdd = () => {
    setOpenEmployeeAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenEmployeeAdd(false);
    refreshList();
  };

  return (
    <div>
      <h3>Employees</h3>
      {employeeList && renderEmployees()}

      <Button
        onClick={handleOpenAdd}
        variant="contained"
        color="primary"
        style={{ marginTop: 20 }}
      >
        Add employee
      </Button>

      <EmployeeAdd open={openEmployeeAdd} onClose={handleCloseAdd} />
    </div>
  );
}

export default EmployeeList;
