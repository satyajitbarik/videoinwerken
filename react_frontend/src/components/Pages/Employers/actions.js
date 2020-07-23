/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserToken } from "../../../utils/authUtils";

// get list of employees of current user (the manager)
export function retrieveEmployers(setEmployerList) {
  axios
    .get("http://localhost:8000/api/employers/", {
      headers: {
        authorization: "Token " + getUserToken(),
      },
    })
    .then((response) => {
      setEmployerList(response.data);
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response);
    });
}

// delete employer
export function deleteEmployer(employer, setEmployerList, onClose) {
  if (employer.id) {
    axios
      .delete(`http://localhost:8000/api/employers/${employer.id}/`, employer, {
        headers: {
          authorization: "Token " + getUserToken(),
        },
      })
      .then((response) => retrieveEmployers(setEmployerList));
    onClose();
    return;
  }
}
