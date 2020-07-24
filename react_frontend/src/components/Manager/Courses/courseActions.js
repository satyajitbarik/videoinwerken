/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserToken } from "../../../utils/authUtils";
import Table from "@material-ui/core/Table";
import { TableBody, TableCell, TableRow, Button } from "@material-ui/core";

// NOT USED - DELETE
export function getCourseQuestions(setCourseQuestions) {
  axios
    .get("http://localhost:8000/api/manager/course/questions/", {
      headers: {
        authorization: "Token " + getUserToken(),
      },
    })
    .then((response) => {
      setCourseQuestions(response.data);
      //const courseQuestions = response.data;
      // getQuestionAnswers();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function submitCourse(item, onClose) {
  if (item.id) {
    axios
      .put(`http://localhost:8000/api/manager/courses/${item.id}/`, item, {
        headers: {
          authorization: "Token " + getUserToken(),
        },
      })
      .then((response) => {
        onClose();
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
}

// Submit course question
// question: question object
// answers: array of answers
// we assume question and answers do NOT contain empty fields!
export function submitQuestion(
  question,
  setQuestion,
  answers,
  setAnswers,
  courseId,
  dict,
  setDict,
  setQuestionError
) {
  axios
    .post(
      "http://localhost:8000/api/manager/course/questions/",
      { course: courseId, question: question.question },
      {
        headers: {
          authorization: "Token " + getUserToken(),
        },
      }
    )
    .then((response) => {
      const questionObject = question;
      questionObject.id = response.data.id;
      setQuestion({ question: "" }); // reset question input field

      questionObject.answers = [];
      console.log("questionObject");
      console.log(questionObject);

      dict.push(questionObject);
      sendAnswersToDatabase(questionObject, answers, setAnswers, dict, setDict);
    })
    .catch((error) => {
      console.log("handle submit error");
      console.log(error);
      console.log(error.response);
      console.log(error.question);

      if (error.response.data.question) {
        setQuestionError(error.response.data.question);
      } else {
        setQuestionError(null);
      }
    });
}

function sendAnswersToDatabase(question, answers, setAnswers, dict, setDict) {
  for (let i = 0; i < answers.length; i++) {
    let answer = answers[i];

    // On last element, reset answer list.
    if (i == answers.length - 1) {
      setAnswers([
        {
          answer: "",
          correct: true,
        },
        {
          answer: "",
          correct: true,
        },
      ]);
    }

    if (answer.answer == "") {
      continue;
    }
    axios
      .post(
        "http://localhost:8000/api/manager/course/question/answers/",
        {
          course_question: question.id,
          answer: answer.answer,
          correct: answer.correct,
        },
        {
          headers: {
            authorization: "Token " + getUserToken(),
          },
        }
      )
      .then((response) => {
        answer = response.data;
        question.answers.push(answer);

        // last answer
        if (i == answers.length - 1) {
          setDict([...dict]); // refresh dict, setDict(dict) doesnt work.
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
