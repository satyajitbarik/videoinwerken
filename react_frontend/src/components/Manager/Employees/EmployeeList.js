/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthUrls } from "../../../constants/urls";
import { getUserToken } from "../../../utils/authUtils";
import EmployeeAdd from "./EmployeeAdd";
import EmployeeEdit from "./EmployeeEdit";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from "@material-ui/core";
import { apiGet, apiDelete, apiGetEmp } from "../../../utils/utils";

function EmployeeList() {
  const [employeeList, setEmployeeList] = React.useState(null);
  const [openEmployeeAdd, setOpenEmployeeAdd] = React.useState(false);
  const [openEmployeeEdit, setOpenEmployeeEdit] = React.useState(false);
  const [employeeDetail, setEmployeeDetail] = React.useState(null);

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

  const renderEmployees = () => {
    if (employeeList.length == 0) {
      return <div>You have no courses!</div>;
    }

    return (
      <Table>
        <TableBody>
          {employeeList.map((emp) => (
            <TableRow
              key={emp.id}
              onClick={() => {
                handleOpenEdit(emp);
              }}
              style={{ cursor: "pointer" }}
            >
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

  const handleOpenEdit = (employee) => {
    setEmployeeDetail(employee);
    setOpenEmployeeEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEmployeeEdit(false);
    refreshList();
  };

  const handleDelete = (employee) => {
    if (employee.id) {
      axios
        .delete(
          `http://localhost:8000/api/manager/employees/${employee.id}/`,
          employee,
          {
            headers: {
              authorization: "Token " + getUserToken(),
            },
          }
        )
        .then((response) => refreshList());
      handleCloseEdit();
      return;
    }
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

      {employeeDetail ? (
        <EmployeeEdit
          open={openEmployeeEdit}
          employee={employeeDetail}
          onClose={handleCloseEdit}
          handleDelete={handleDelete}
        />
      ) : null}
    </div>
  );
}

export default EmployeeList;
