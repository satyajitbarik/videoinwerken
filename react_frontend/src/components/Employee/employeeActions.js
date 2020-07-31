/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserToken } from "../../utils/authUtils";
import Table from "@material-ui/core/Table";
import { TableBody, TableCell, TableRow, Button } from "@material-ui/core";
//import { getCourseQuestions } from "../Manager/Courses/courseActions";

// Gets all courses for logged in employee. With attempted/passed variable
export function getCourses(setCoursesDict) {
  console.log("getting courses...");
  axios
    .get("http://localhost:8000/api/employee/courses/", {
      headers: {
        authorization: "Token " + getUserToken(),
      },
    })
    .then((response) => {
      const coursesList = response.data;
      const coursesDict = {};
      // convert list to dict, where key is id of course.
      for (let i = 0; i < coursesList.length; i++) {
        const course = coursesList[i];
        course.attempted = false;
        course.passed = true;
        coursesDict[course.id] = course;
      }

      getEmployeeQuestionsCourse(coursesDict, setCoursesDict);
    })
    .catch((error) => {
      console.log(error);
    });
}

// employee specific
function getEmployeeQuestionsCourse(coursesDict, setCoursesDict) {
  console.log("getting employee-questions-course...");
  axios
    .get("http://localhost:8000/api/employee/employeequestionscourse/", {
      headers: {
        authorization: "Token " + getUserToken(),
      },
    })
    .then((response) => {
      //employee, questionid, passed, attempted
      const employeeQuestionList = response.data;

      //console.log("coursesDict");
      //console.log(coursesDict);

      //console.log("employeequestionscourse");
      //console.log(employeeQuestionList);

      const employeeQuestionDict = {};

      for (let i = 0; i < employeeQuestionList.length; i++) {
        const employeeQuestion = employeeQuestionList[i];
        // key = question id, value = employee-question
        employeeQuestionDict[employeeQuestion.question] = employeeQuestion;
      }
      getCourseQuestion(coursesDict, setCoursesDict, employeeQuestionDict);
    })
    .catch((error) => {
      console.log(error);
    });
}

// all course-question pairs
function getCourseQuestion(coursesDict, setCoursesDict, employeeQuestionDict) {
  console.log("getting employee-questions-course...");
  axios
    .get("http://localhost:8000/api/employee/coursequestions/", {
      headers: {
        authorization: "Token " + getUserToken(),
      },
    })
    .then((response) => {
      //employee, questionid, passed, attempted
      const courseQuestionList = response.data;

      console.log("coursesDict");
      console.log(coursesDict);

      console.log("courseQuestionsList");
      console.log(courseQuestionList);

      console.log("employeeQuestionDict");
      console.log(employeeQuestionDict);

      for (let i = 0; i < courseQuestionList.length; i++) {
        const courseQuestions = courseQuestionList[i];
        const questionId = courseQuestions.id;
        const courseId = courseQuestions.course;
        console.log("questionid:" + questionId);

        if (employeeQuestionDict[questionId]) {
          const attempted = employeeQuestionDict[questionId].attempted;
          const passed = employeeQuestionDict[questionId].passed;

          if (attempted) {
            coursesDict[courseId].attempted = true;
          }

          if (!passed) {
            coursesDict[courseId].passed = false;
          }
        }

        if (i == courseQuestionList.length - 1) {
          setCoursesDict(coursesDict);
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

// Get questions and answers for course
// Gets questions for course_id, and gets answers for questions!
// CAN BE USED FOR BOTH EMPLOYEES AND MANAGERS.
// returns array of questions, questions has dictionary of answers (key=answer_id)
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
      //console.log("getQuestionandAnswers");
      const questions = response.data;

      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        questionsAndAnswers.push(question);
        getAnswers(
          question.id,
          questionsAndAnswers,
          i,
          questions,
          setQuestionsAndAnswers
        );
      }
      //console.log(questionsAndAnswers);
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
  questions,
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
      questionsAndAnswers[index].answers = answers;

      // On last index, we update dict.
      if (index == questions.length - 1) {
        setQuestionsAndAnswers([...questionsAndAnswers]);
        console.log("done loading questions and answers");
      }
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

export function updateOrCreateQuestionProgress(question, answers) {
  console.log("update or create question progress");
  console.log(question);
  console.log(answers);
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
      //console.log("question progress:::::");
      //console.log(response.data);
      //console.log(question);
      // console.log(answers);

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

  //console.log("submit question progress -> question, answers");
  //console.log(question);
  //console.log(answers);
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
      console.log("submitted question progress");
      console.log(response);
      console.log(response.data);
    })
    .catch((error) => {
      console.log("failed question progress submit");
      console.log(error);
      console.log(error.response);
    });
}

// question object
export function updateQuestionProgress(id, question, answers) {
  //console.log("UPDATE QUESTION PROGRESS!!!");
  // console.log("id: " + id);
  // console.log("questionid: " + question.id);
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
      console.log("Updated question progress");
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
