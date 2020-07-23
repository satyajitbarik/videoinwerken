/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from "@material-ui/core";
import { retrieveEmployers, deleteEmployer } from "./actions";
import EmployerEdit from "./EmployerEdit";
import EmployerAdd from "./EmployerAdd";

function EmployerList() {
  const [employerList, setEmployerList] = React.useState(null);
  const [selectedEmployer, setSelectedEmployer] = React.useState(null);

  const [openEmployeeAdd, setOpenEmployeeAdd] = React.useState(false);
  const [openEmployeeEdit, setOpenEmployeeEdit] = React.useState(false);

  const [employeeDetail, setEmployeeDetail] = React.useState(null);

  // Runs on initial render
  useEffect(() => {
    if (employerList != null) {
      return;
    }
    retrieveEmployers(setEmployerList);
  });

  const renderEmployers = () => {
    console.log(employerList);
    if (employerList.length == 0) {
      return <div>You have no employers!</div>;
    }

    return (
      <Table>
        <TableBody>
          {employerList.map((emp) => (
            <TableRow
              key={emp.id}
              onClick={() => setSelectedEmployer(emp)}
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
    //retrieveEmployers();
  };
  const handleCloseAdd = () => {
    setOpenEmployeeAdd(false);
    retrieveEmployers(setEmployerList);
  };

  const afterEdit = () => {
    setSelectedEmployer(null);
    retrieveEmployers(setEmployerList);
  };

  // When delete button is pressed
  const handleDelete = (employer) => {
    deleteEmployer(employer, afterDelete);
  };

  // After delete finished
  const afterDelete = () => {
    retrieveEmployers(setEmployerList);
    setSelectedEmployer(null);
  };

  return (
    <div>
      <h3>Employers</h3>
      {employerList && renderEmployers()}

      <Button
        onClick={handleOpenAdd}
        variant="contained"
        color="primary"
        style={{ marginTop: 20 }}
      >
        Add employer
      </Button>

      <EmployerAdd open={openEmployeeAdd} onClose={handleCloseAdd} />

      {selectedEmployer ? (
        <EmployerEdit
          open={selectedEmployer != null}
          employer={selectedEmployer}
          onCancel={() => setSelectedEmployer(null)}
          onSave={afterEdit}
          handleDelete={handleDelete}
        />
      ) : null}
    </div>
  );
}

export default EmployerList;
