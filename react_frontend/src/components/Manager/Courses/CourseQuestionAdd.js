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

import axios from "axios";
export default function CourseQuestionAdd(props) {
  const { onClose, course } = props;
  const [question, setQuestion] = React.useState({
    course: null,
    question: "",
  }); //course question
  const [titleError, setTitleError] = React.useState("");

  const [questionList, setQuestionList] = React.useState([]);

  const [answerList, setAnswerList] = React.useState([
    {
      answer: "",
      correct: true,
    },
  ]);

  const handleChangeInputList = (e, index) => {
    const { name, value } = e.target;
    const list = [...answerList];
    list[index][name] = value;
    setAnswerList(list);
  };

  const handleAddInput = () => {
    console.log("HANDLE ADD INPUT");
    const list = [...answerList];
    list.push({ answer: "", correct: true });
    setAnswerList(list);
    console.log(answerList);
  };

  const handleRemoveInput = (index) => {
    const list = [...answerList];
    list.splice(index, 1);
    setAnswerList(list);
  };

  const handleChange = (e) => {
    console.log("handlechange");
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setQuestion({ ...question, [name]: value });
    console.log(question);
  };

  const handleCheckBox = (e, value) => {
    const name = e.target.name;
    setQuestion({ ...question, [name]: value });
  };

  // Submit course question
  const handleSubmit = () => {
    question.course = course.id;
    console.log("handlesubmit question");
    console.log(question);

    const token = getUserToken();
    if (!token) {
      return;
    }
    apiPost(
      "http://localhost:8000/api/manager/course/questions/",
      handleResponseQuestion,
      handleFailQuestion,
      question
    );
    console.log(question);

    /*if (close) {
      onClose();
    }*/
  };
  const handleResponseQuestion = (response) => {
    question.id = response.data.id;
    console.log("handle response question");
    console.log(response.data);

    sendAnswersToDatabase();

    //question.question = "";
    //setQuestion(question);

    setQuestion({ question: "" });
  };

  const sendAnswersToDatabase = () => {
    // Send answers to database
    let i;
    for (i = 0; i < answerList.length; i++) {
      const answer = answerList[i];
      if (answer.answer == "") {
        continue;
      }
      answer.course_question = question.id;
      apiPost(
        "http://localhost:8000/api/manager/course/question/answers/",
        handleResponseAnswer,
        handleFailAnswer,
        answer
      );
      console.log(answer);
    }
  };

  const handleFailQuestion = (response) => {
    console.log("handle fail question");
    console.log(response);

    if (response.data.title) {
      setTitleError(response.data.title);
    } else {
      setTitleError(null);
    }
  };

  const handleResponseAnswer = (response) => {
    console.log("handle response answer");
    console.log(response.data);
  };
  const handleFailAnswer = (response) => {
    console.log("handle fail answer");
  };

  const addInput = () => {
    setAnswerList([...answerList], { answer: "" });
  };

  return (
    <div>
      <form>
        <MyTextField
          name="question"
          label="Question"
          onChange={handleChange}
          value={question.question}
          autoFocus
        />

        {console.log("inputList")}
        {console.log(answerList)}
        {answerList.map((item, i) => (
          <div key={i}>
            <MyTextField
              name="answer"
              label="Answer"
              placeHolder="Answer"
              value={item.answer}
              onChange={(e) => handleChangeInputList(e, i)}
            />
          </div>
        ))}

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

        <br />
        <br />
        <br />
        <pre>{JSON.stringify(answerList, null, 2)}</pre>
      </form>
    </div>
  );
}
