/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserToken } from "../../../utils/authUtils";
import Table from "@material-ui/core/Table";
import { TableBody, TableCell, TableRow, Button } from "@material-ui/core";

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
      setQuestion({ question: "" });
      dict.push({ question: questionObject, answers: [] });
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
        for (let i = 0; i < dict.length; i++) {
          if (dict[i].question == question) {
            const newDict = [...dict];
            newDict[i].answers = [...newDict[i].answers, answer];
            setDict(newDict);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
