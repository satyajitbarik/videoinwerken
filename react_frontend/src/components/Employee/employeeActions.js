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

export function correctlyAnswered(answers) {
  for (let i = 0; i < answers.length; i++) {
    const answer = answers[i];
    if (answer.selected != answer.correct) {
      return false;
    }
  }
  return true;
}

// Employee - Question
export function getEmployeeQuestion(setEmployeeQuestionList) {
  axios
    .get("http://localhost:8000/api/employee/employeequestion/", {
      headers: {
        authorization: "Token " + getUserToken(),
      },
    })
    .then((response) => {
      setEmployeeQuestionList(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

export function getQuestionProgress(question, answers) {
  console.log("loading question progress!");
  axios
    .get("http://localhost:8000/api/employee/employeequestion/", {
      headers: {
        authorization: "Token " + getUserToken(),
      },
      params: {
        question_id: question.id,
      },
    })
    .then((response) => {
      //setQuestionProgress(response.data);
      console.log("question progress:::::");
      console.log(response.data);

      // if question-progress exists, we PUT
      if (response.data.length) {
        updateQuestionProgress(response.data[0].id, question, answers);
        // else, we POST
      } else {
        submitQuestionProgress(question, answers);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// question object
export function submitQuestionProgress(question, answers) {
  //getQuestionProgress(question.id);

  console.log("submit question progress -> question, answers");
  console.log(question);
  console.log(answers);
  axios
    .post(
      "http://localhost:8000/api/employee/employeequestion/",
      {
        //employee: 0,
        question: question.id,
        attempted: true,
        passed: correctlyAnswered(answers),
      },
      {
        headers: {
          authorization: "Token " + getUserToken(),
        },
      }
    )
    .then((response) => {
      console.log(response);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response);
    });
}

// question object
export function updateQuestionProgress(id, question, answers) {
  console.log("UPDATE QUESTION PROGRESS!!!");
  console.log("id: " + id);
  // getQuestionProgress(question.id);
  axios
    .put(
      `http://localhost:8000/api/employee/employeequestion/${id}/`,
      {
        //employee: 0,
        question: question.id,
        attempted: true,
        passed: correctlyAnswered(answers),
      },
      {
        headers: {
          authorization: "Token " + getUserToken(),
        },
      }
    )
    .then((response) => {
      console.log(response);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response);
    });
}

// Delete question progress
/*export function deleteQuestionProgress(question) {
  axios
    .delete(`http://localhost:8000/api/employee/employeequestion/${item.id}/`, item, {
      headers: {
        authorization: "Token " + getUserToken(),
      },
    })
    .then((response) => {
      handleResponse(response);
    })
    .catch((error) => {
      console.log(error);
    });
}*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
