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
import { getCourses, getQuestionsAndAnswers } from "../employeeActions";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

function FinishScreen(props) {
  // qna = questions and answers
  const { qna, onClose } = props;

  const correctlyAnswered = (dict) => {
    for (let i = 0; i < dict.answers.length; i++) {
      const answer = dict.answers[i];
      if (answer.selected != answer.correct) {
        return false;
      }
    }
    return true;
  };

  const printMyAnswers = (answers) => {
    return (
      <ul>
        {answers.map((answer) => (
          <li
            key={answer.id}
            style={{ color: answer.selected ? "green" : "black" }}
          >
            {answer.answer}: {answer.correct}
          </li>
        ))}
      </ul>
    );
  };

  const printCorrectAnswers = (answers) => {
    return (
      <ul>
        {answers.map((answer) => (
          <li
            key={answer.id}
            style={{ color: answer.correct ? "green" : "black" }}
          >
            {answer.answer}: {answer.correct}
          </li>
        ))}
      </ul>
    );
  };

  const printAnswers = (dict) => {
    // did employee answer correctly?
    const correctlyAnswered1 = correctlyAnswered(dict);

    if (correctlyAnswered1) {
      return (
        <div>
          <h5>Correct!</h5> printMyAnswers(dict.answers)
        </div>
      );
    } else {
      return (
        <div>
          <h5>Incorrect!</h5>
          <div>Your answers:</div>
          <div>{printMyAnswers(dict.answers)}</div>

          <div>Correct answers:</div>
          <div>{printCorrectAnswers(dict.answers)}</div>
        </div>
      );
    }
  };

  console.log(qna);
  console.log(qna[0].question.question);
  return (
    <div>
      <h3>Results</h3>
      {qna.map((dict) => (
        <div key={dict.question.id}>
          <h4>Question: {dict.question.question}</h4>
          {printAnswers(dict)}
        </div>
      ))}
      <Button onClick={onClose}>Back to courses</Button>
    </div>
  );
}

export default FinishScreen;
