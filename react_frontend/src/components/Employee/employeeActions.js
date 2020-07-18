/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserToken } from "../../utils/authUtils";
import Table from "@material-ui/core/Table";
import { TableBody, TableCell, TableRow, Button } from "@material-ui/core";

export function getCourses(setCoursesList) {
  axios
    .get("http://localhost:8000/api/employee/courses/", {
      headers: {
        authorization: "Token " + getUserToken(),
      },
    })
    .then((response) => {
      setCoursesList(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
