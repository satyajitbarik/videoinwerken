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

// Get questions and answers for course
export function getQuestionsAndAnswers(courseId, setQuestionsAndAnswers) {
  const questionsAndAnswers = [];

  axios
    .get("http://localhost:8000/api/manager/course/questions/", {
      headers: {
        authorization: "Token " + getUserToken(),
      },
      params: {
        course_id: courseId,
      },
    })
    .then((response) => {
      console.log("getQuestionandAnswers");
      const questions = response.data;

      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        questionsAndAnswers.push({ question: question, answers: [] });
        getAnswers(question.id, questionsAndAnswers, i, setQuestionsAndAnswers);
      }
      console.log(questionsAndAnswers);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Get answers of question
function getAnswers(
  questionId,
  questionsAndAnswers,
  index,
  setQuestionsAndAnswers
) {
  axios
    .get("http://localhost:8000/api/manager/course/question/answers/", {
      headers: {
        authorization: "Token " + getUserToken(),
      },
      params: {
        question_id: questionId,
      },
    })
    .then((response) => {
      const answers = response.data;
      questionsAndAnswers[index].answers = questionsAndAnswers[
        index
      ].answers.concat(answers);
      console.log(questionsAndAnswers);
      console.log("done loading questions and answers");
      setQuestionsAndAnswers(questionsAndAnswers);
    })
    .catch((error) => {
      console.log(error);
    });
}
