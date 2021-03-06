/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserToken } from "../../../utils/authUtils";
import Table from "@material-ui/core/Table";
import {
  TableBody,
  TableCell,
  TableRow,
  Button,
  Checkbox,
} from "@material-ui/core";
import {
  getCourses,
  getQuestionsAndAnswers,
  sendQuestionProgressToDatabase,
  submitQuestionProgress,
  updateOrCreateQuestionProgress,
} from "../employeeActions";
import FinishScreen from "./FinishScreen";
import ReactPlayer from "react-player";

function EmployeeDoCourse(props) {
  const { course, onClose } = props;

  // Is employee watching video?
  const [inVideo, setInVideo] = React.useState(true);

  // Is employee done with quiz? In finish screen
  const [finished, setFinished] = React.useState(false);

  // Current question
  const [currentQuestion, setCurrentQuestion] = React.useState(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Array of question and answers dictionaries
  const [questionsAndAnswers, setQuestionsAndAnswers] = React.useState([]);

  // Runs on initial render
  useEffect(() => {
    //console.log("questions and asnwers :D");

    // if questionsAndAnswers is not empty
    if (questionsAndAnswers.length) {
      if (currentQuestion == null) {
        setCurrentQuestion(questionsAndAnswers[currentIndex]);
      }
      return;
    }
    console.log("useEffect => get questions and asnwers");
    console.log(questionsAndAnswers);
    getQuestionsAndAnswers(course.id, setQuestionsAndAnswers);
  });

  const showVideo = () => {
    return (
      <div>
        <div>
          Video
          <ReactPlayer url="../NodeFileUploadServer/public/ff.mp4" playing />
        </div>
        <div>
          <Button onClick={() => setInVideo(false)}>Done, to test</Button>
        </div>
        <div>
          <Button onClick={onClose}>Cancel, back to courses</Button>
        </div>
      </div>
    );
  };

  const showFinishScreen = () => {
    return <FinishScreen qna={questionsAndAnswers} onClose={onClose} />;
  };

  const showTest = () => {
    if (!questionsAndAnswers.length)
      return <div>There are no questions in this course!</div>;

    if (!currentQuestion) return <div>No current question!</div>;

    console.log(currentQuestion);

    // question: String
    const questionText = currentQuestion.question;

    // answers: Array
    const answers = currentQuestion.answers;

    console.log("showtest");
    console.log(questionText);
    console.log(answers);

    const toggleAnswer = (index) => {
      answers[index].selected = !answers[index].selected;
      setCurrentQuestion({ ...currentQuestion, answers: answers });
    };

    const nextQuestion = () => {
      updateOrCreateQuestionProgress(currentQuestion, answers);

      if (questionsAndAnswers[currentIndex + 1]) {
        setCurrentIndex(currentIndex + 1);
        setCurrentQuestion(questionsAndAnswers[currentIndex + 1]);
      } else {
        console.log("No next questions :)");
        console.log("finish screen");
        setFinished(true);
      }
    };

    return (
      <div>
        <Button onClick={onClose} style={{ color: "red", fontWeight: "bold" }}>
          Quit course
        </Button>
        <h3>Multiple choice question: {questionText.question}</h3>

        <h3>Select answers (multiple possible):</h3>

        {answers.map((answer, i) => (
          <div key={answer.id}>
            {/*answer.selected ? " Selected" : " Not selected"*/}
            <Checkbox onClick={() => toggleAnswer(i)}></Checkbox>
            {answer.answer}
          </div>
        ))}

        <Button onClick={() => nextQuestion()}>Confirm</Button>
      </div>
    );
  };

  if (inVideo) {
    return showVideo();
  } else if (finished) {
    return showFinishScreen();
  } else {
    return showTest();
  }
}

export default EmployeeDoCourse;
