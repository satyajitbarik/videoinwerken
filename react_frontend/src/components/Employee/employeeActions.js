/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserToken } from "../../utils/authUtils";
import Table from "@material-ui/core/Table";
import { TableBody, TableCell, TableRow, Button } from "@material-ui/core";

// Gets all courses for logged in employee.
export function getCourses(setCoursesList) {
  console.log("getting courses...");
  axios
    .get("http://localhost:8000/api/employee/courses/", {
      headers: {
        authorization: "Token " + getUserToken(),
      },
    })
    .then((response) => {
      //[{id: 0, title: "course1", "etc"}]
      const coursesList = response.data;
      console.log("received courses:");
      console.log(coursesList);

      setCoursesList(response.data);

      const coursesDict = {};

      console.log(coursesList);

      // convert list to dict, where key is id of course.
      for (let i = 0; i < coursesList.length; i++) {
        const course = coursesList[i];
        coursesDict[course.id] = course;
        //coursesDict[course.id].course_questions = [];

        getEmployeeQuestionsCourse(coursesDict, course.id);
      }
      console.log("coursesDict:");
      console.log(coursesDict);

      //getCourseQuestions(coursesDict);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getEmployeeQuestionsCourse(coursesDict, courseId) {
  console.log("getting employee-questions-course...");
  axios
    .get("http://localhost:8000/api/employee/employeequestionscourse/", {
      headers: {
        authorization: "Token " + getUserToken(),
      },
    })
    .then((response) => {
      const employeeQuestionList = response.data;
      console.log("received employee-questions-course:");
      console.log(employeeQuestionList);

      const employeeQuestionDict = {};
      for (let i = 0; i < employeeQuestionList.length; i++) {
        const employeeQuestion = employeeQuestionList[i];

        // key = question id, value = employee-question
        employeeQuestionDict[employeeQuestion.question] = employeeQuestion;
      }

      console.log("employee-question dict:");
      console.log(employeeQuestionDict);

      coursesDict[courseId].course_questions = employeeQuestionDict;
      console.log("coursesDit wow:");
      console.log(coursesDict);
    })
    .catch((error) => {
      console.log(error);
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

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
/*
// get questions of course
export function getCourseQuestions(
  courseId,
  setPassed,
  setAttempted,
  employeeQuestionList
) {
  const lool = (questions) => {
    let passed = true;
    let attempted = false;
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];

      for (let j = 0; j < employeeQuestionList.length; j++) {
        const employeequestion = employeeQuestionList[j];
        if (employeequestion.attempted) {
          attempted = true;
        }
      }
    }
    setAttempted(attempted);
    setPassed(passed);
  };

  console.log("get course questions");
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
      console.log("received course questions");
      console.log(response.data);
      const questions = response.data;

      lool(questions);
    })
    .catch((error) => {
      console.log(error);
    });
}
*/
/*

export function getEmployeeQuestion(questionId) {
  console.log("get course questions");
  axios
    .get("http://localhost:8000/api/employee/employeequestion/", {
      headers: {
        authorization: "Token " + getUserToken(),
      },
      params: {
        course_id: courseId,
      },
    })
    .then((response) => {
      console.log("received course questions");
      console.log(response.data);
      const questions = response.data;

      for(let i = 0 ; i< questions.length; i++) {
        
      }

      // for (let i = 0; i < employeeQuestionList.length; i++) {
      //  const question = employeeQuestionList[i].question;
      // }
    })
    .catch((error) => {
      console.log(error);
    });
}
*/
