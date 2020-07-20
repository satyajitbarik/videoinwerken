/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserToken } from "../../utils/authUtils";
import Table from "@material-ui/core/Table";
import {
  TableBody,
  TableCell,
  TableRow,
  Button,
  Checkbox,
} from "@material-ui/core";
import { getCourses, getQuestionsAndAnswers } from "./employeeActions";

function EmployeeDoCourse(props) {
  const { course } = props;

  // Is employee watching video?
  const [inVideo, setInVideo] = React.useState(true);

  const [currentQuestion, setCurrentQuestion] = React.useState(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Array of question and answers dictionaries
  const [questionsAndAnswers, setQuestionsAndAnswers] = React.useState([]);

  // Runs on initial render
  useEffect(() => {
    // if questionsAndAnswers is not empty
    if (questionsAndAnswers.length) {
      if (currentQuestion == null) {
        setCurrentQuestion(questionsAndAnswers[currentIndex]);
      }
      return;
    }

    getQuestionsAndAnswers(course.id, setQuestionsAndAnswers);
  });

  const showVideo = () => {
    return (
      <div>
        Show video here TODO.
        <Button onClick={() => setInVideo(false)}>Done, to test</Button>
      </div>
    );
  };

  const showTest = () => {
    if (!questionsAndAnswers.length)
      return <div>There are no questions in this course!</div>;

    if (!currentQuestion) return <div>No current question!</div>;

    // question: String
    const question = currentQuestion.question;

    // answers: Array
    const answers = currentQuestion.answers;

    console.log("showtest");
    console.log(question);
    console.log(answers);

    const toggleAnswer = (index) => {
      answers[index].selected = !answers[index].selected;
      setCurrentQuestion({ question: question, answers: answers });
    };

    const submitAnswer = () => {};

    const nextQuestion = () => {
      if (questionsAndAnswers[currentIndex + 1]) {
        setCurrentIndex(currentIndex + 1);
        setCurrentQuestion(questionsAndAnswers[currentIndex + 1]);
      } else {
        console.log("No next questions :)");
      }
    };

    return (
      <div>
        <Button>Back</Button>
        <h3>Question: {question.question}</h3>

        <h3>Select answers (multiple possible):</h3>

        {answers.map((answer, i) => (
          <div key={i}>
            {answer.answer}
            {answer.selected ? " Selected" : " Not selected"}
            <Checkbox onClick={() => toggleAnswer(i)}></Checkbox>
          </div>
        ))}

        <Button onClick={nextQuestion}>Confirm</Button>
      </div>
    );
  };

  if (inVideo) {
    return showVideo();
  } else {
    return showTest();
  }
}

export default EmployeeDoCourse;
