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
import {
  TextField,
  ListItem,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { TableBody, TableCell, TableRow, Table } from "@material-ui/core";
import axios from "axios";
export default function CourseQuestionAdd(props) {
  const { onClose, course } = props;

  // text field input
  const [question, setQuestion] = React.useState({
    course: course.id,
    question: "",
  });

  const [titleError, setTitleError] = React.useState("");

  const [questionList, setQuestionList] = React.useState([]);
  const [allAnswers, setAllAnswers] = React.useState([]);

  const [answerList, setAnswerList] = React.useState([
    {
      answer: "",
      correct: true,
    },
  ]);

  const [dict, setDict] = React.useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  const handleSubmit = () => {
    axios
      .post(
        "http://localhost:8000/api/manager/course/questions/",
        { course: course.id, question: question.question },
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
        setDict(dict.concat({ question: questionObject, answers: [] }));
      });
  };

  const printDict = () => {
    return (
      <div>
        {dict &&
          dict.map((item) => (
            <div key={item.question.id}>{item.question.id}</div>
          ))}
      </div>
    );
  };

  return (
    <div>
      {printDict()}
      <form>
        <TextField
          name="question"
          label="Question"
          onChange={handleChange}
          value={question.question}
        />

        <Button onClick={handleSubmit}>Add question</Button>
      </form>
    </div>
  );
}
