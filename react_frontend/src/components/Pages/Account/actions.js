/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserToken } from "../../../utils/authUtils";

// get current logged in user
export function getUser(setUser) {
  axios
    .get("http://localhost:8000/api/getuser/", {
      headers: {
        authorization: "Token " + getUserToken(),
      },
    })
    .then((response) => {
      setUser(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response);
    });
}

export function updateEmployer(employer, onSave) {
  if (employer.id) {
    // prevent manipulation
    employer.is_employer = true;
    employer.is_employee = false;
    employer.is_admin = false;
    employer.employer = null;
    axios
      .put(`http://localhost:8000/api/employers/${employer.id}/`, employer, {
        headers: {
          authorization: "Token " + getUserToken(),
        },
      })
      .then((response) => {
        onSave();
      })
      .catch((error) => {
        console.log(error.response);
      });
    return;
  }
}

export function updateEmployee(employee, onSave) {
  if (employee.id) {
    // prevent manipulation
    employer.is_employer = false;
    employer.is_employee = true;
    employer.is_admin = false;
    axios
      .put(`http://localhost:8000/api/employers/${employee.id}/`, employee, {
        headers: {
          authorization: "Token " + getUserToken(),
        },
      })
      .then((response) => {
        onSave();
      })
      .catch((error) => {
        console.log(error.response);
      });
    return;
  }
}

/*
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
export function deleteEmployer(employer, onClose) {
  if (employer.id) {
    axios
      .delete(`http://localhost:8000/api/employers/${employer.id}/`, employer, {
        headers: {
          authorization: "Token " + getUserToken(),
        },
      })
      .then((response) => {
        onClose();
      });

    return;
  }
}

export function updateEmployer(employer, onSave) {
  if (employer.id) {
    axios
      .put(`http://localhost:8000/api/employers/${employer.id}/`, employer, {
        headers: {
          authorization: "Token " + getUserToken(),
        },
      })
      .then((response) => {
        onSave();
      })
      .catch((error) => {
        console.log(error.response);
      });
    return;
  }
}

export function submitEmployer(
  employer,
  onClose,
  setEmailError,
  setPasswordError
) {
  axios
    .post("http://localhost:8000/api/employers/", employer, {
      headers: {
        authorization: "Token " + getUserToken(),
      },
    })
    .then((response) => {
      console.log("handle response");
      console.log(response.data);
      onClose();
    })
    .catch((error) => {
      const response = error.response;
      console.log(response.data);

      if (response.data.email) {
        setEmailError(response.data.email);
      } else {
        setEmailError(null);
      }

      if (response.data.password) {
        setPasswordError(response.data.password);
      } else {
        setPasswordError(null);
      }
    });
}*/
