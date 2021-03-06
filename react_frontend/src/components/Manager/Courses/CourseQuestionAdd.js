/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from "react";
import { MyTextField, apiPost } from "../../../utils/utils";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getUserToken } from "../../../utils/authUtils";
import {
  myRenderField,
  myRenderCheckBoxField,
} from "../../../utils/renderUtils";
import { AuthUrls } from "../../../constants/urls";
import { renderError } from "../../../utils/renderUtils";
import { getQuestions } from "../../../actions/myActions";

import { TableBody, TableCell, TableRow, Table } from "@material-ui/core";
import axios from "axios";
import Switch from "@material-ui/core/Switch";
import { submitQuestion } from "../Courses/courseActions";

export default function CourseQuestionAdd(props) {
  const { onClose, course, questionsAndAnswers } = props;

  // text field input
  const [question, setQuestion] = React.useState({
    course: course.id,
    question: "",
  });

  const [questionError, setQuestionError] = React.useState("");
  const [answerError, setAnswerError] = React.useState("");

  const [questionList, setQuestionList] = React.useState([]);
  const [allAnswers, setAllAnswers] = React.useState([]);

  const [answerList, setAnswerList] = React.useState([
    {
      answer: "",
      correct: true,
    },
    {
      answer: "",
      correct: true,
    },
  ]);

  //console.log("YOOOOOOO");
  //console.log(questionsAndAnswers);

  const [dict, setDict] = React.useState([...questionsAndAnswers]);
  //const [dict, setDict] = React.useState([]);

  const handleChangeInputList = (e, index) => {
    const { name, value } = e.target;
    const list = [...answerList];
    list[index][name] = value;
    setAnswerList(list);
  };

  const handleToggleAnswerCorrect = (e, index) => {
    console.log("start");
    console.log("checked" + e.target.checked);
    console.log("name:" + e.target.name);
    const { name, checked } = e.target;
    const list = [...answerList];
    list[index][name] = checked;
    setAnswerList(list);
  };

  const handleAddInput = () => {
    const list = [...answerList];
    list.push({ answer: "", correct: true });
    setAnswerList(list);
  };

  const handleRemoveInput = (index) => {
    const list = [...answerList];
    list.splice(index, 1);
    setAnswerList(list);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  const handleCheckBox = (e, value) => {
    const name = e.target.name;
    setQuestion({ ...question, [name]: value });
  };

  // Do we have empty answer fields?
  const emptyAnswerFields = () => {
    console.log("0:" + answerList[0].answer);
    console.log("1:" + answerList[1].answer);

    for (let i = 0; i < answerList.length; i++) {
      console.log("answerlist:" + answerList[i].answer);
      if (answerList[i].answer == null || answerList[i].answer == "") {
        return true;
      }
    }
    return false;
  };

  // Submit course question
  const handleSubmit = () => {
    let blocked = false; // we do it like this because we cannot setState and call state right after each other, it's not instant.

    if (question.question == "") {
      setQuestionError("This field may not be blank.");
      blocked = true;
    } else {
      setQuestionError(null);
    }

    if (emptyAnswerFields()) {
      setAnswerError("Answers may not be blank.");
      blocked = true;
    } else {
      setAnswerError(null);
    }

    if (blocked) {
      return;
    }

    console.log("AXIOS");
    console.log("courseid:" + course.id);
    submitQuestion(
      question,
      setQuestion,
      answerList,
      setAnswerList,
      course.id,
      dict,
      setDict,
      setQuestionError
    );
  };

  const printDict = () => {
    console.log("dict");
    console.log(dict);
    return (
      <div>
        <h3>Questions</h3>

        <Table>
          <TableBody>
            {dict &&
              dict.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.question}</TableCell>
                  <TableCell>
                    Answers:
                    {item.answers.map(
                      (answer) =>
                        answer.answer +
                        " (" +
                        (answer.correct ? "correct" : "false") +
                        ")" +
                        ", "
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div>
      {dict && printDict()}
      <form>
        <MyTextField
          name="question"
          label="Question"
          onChange={handleChange}
          value={question.question}
          autoFocus
        />

        {renderError(questionError)}

        {answerList.map((item, i) => (
          <div key={i}>
            <MyTextField
              name="answer"
              label="Answer"
              placeHolder="Answer"
              value={item.answer}
              onChange={(e) => handleChangeInputList(e, i)}
            />

            {console.log("correct:" + item.correct)}
            <Switch
              checked={item.correct}
              onChange={(e) => handleToggleAnswerCorrect(e, i)}
              name="correct"
              color="primary"
            />

            {answerList.length > 2 && (
              <Button color="primary" onClick={() => handleRemoveInput(i)}>
                Remove
              </Button>
            )}
          </div>
        ))}

        {renderError(answerError)}

        <Button
          color="primary"
          variant="contained"
          onClick={handleAddInput}
          style={{ marginTop: 20 }}
        >
          Add answer
        </Button>

        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          style={{ marginTop: 20, marginLeft: 10 }}
        >
          Add question
        </Button>

        <Button
          onClick={onClose}
          color="primary"
          variant="contained"
          style={{ marginTop: 20, marginLeft: 10 }}
        >
          Finish
        </Button>

        {/*<pre>{JSON.stringify(dict, null, 2)}</pre>*/}
      </form>
    </div>
  );
}
