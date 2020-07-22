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

  // count how many correct questions in course
  const countCorrectAnswers = (qna) => {
    let count = 0;
    for (let i = 0; i < qna.length; i++) {
      const dict = qna[i];
      if (correctlyAnswered(dict)) {
        count++;
      }
    }
    return count;
  };

  // question correctly answered
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
            style={{
              color: answer.selected ? "green" : "black",
              fontWeight: answer.selected ? "bold" : "normal",
            }}
          >
            {answer.answer}
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
            style={{
              color: answer.correct ? "green" : "black",
              fontWeight: answer.correct ? "bold" : "normal",
            }}
          >
            {answer.answer}
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
          <h5>Correct!</h5>
          <div>{printMyAnswers(dict.answers)}</div>
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

  /*return (
    <div>
      <h3>Results</h3>
      Failed! {countCorrectAnswers(qna)}/{qna.length} correct.
      {qna.map((dict) => (
        <div key={dict.question.id}>
          <h4>Question: {dict.question.question}</h4>
          {printAnswers(dict)}
        </div>
      ))}
      <Button onClick={onClose}>Back to courses</Button>
    </div>
  );*/

  return (
    <div>
      <h3>Results</h3>
      <div>
        Failed! {countCorrectAnswers(qna)}/{qna.length} correct.
      </div>
      <div>Overview of results per question</div>
      <Table>
        <TableBody>
          {qna.map((dict) => (
            <TableRow key={dict.question.id}>
              <TableCell>{dict.question.question}</TableCell>
              <TableCell
                style={{
                  color: correctlyAnswered(dict) ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {correctlyAnswered(dict) ? "Passed" : "Failed"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={onClose}>Back to courses</Button>
    </div>
  );
}

export default FinishScreen;
