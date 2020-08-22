/* eslint-disable no-console */
import axios from "axios";
import { getUserToken } from "./../utils/authUtils";

/*export function getQuestions(courseId) {
  const token = getUserToken();
  if (!token) {
    return;
  }
  axios
    .get("http://localhost:8000/api/manager/course/questions/", {
      headers: {
        authorization: "Token " + token,
      },
      params: {
        course_id: courseId,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.response);
    });
}*/

/*
export function getQuestions(courseId) {
  return function (dispatch) {
    const token = getUserToken();
    if (token) {
      axios
        .get("http://localhost:8000/api/manager/course/questions/", {
          headers: {
            authorization: "Token " + token,
          },
          params: {
            course_id: courseId,
          },
        })
        .then((response) => {
          dispatch(response.data);
        })
        .catch((error) => {
          // If request is bad...
          // Show an error to the user
          console.log(error);
          // TODO: send notification and redirect
        });
    }
  };
}*/
