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

export default function CourseQuestionAdd(props) {
  const { onClose, course } = props;

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

  const [dict, setDict] = React.useState([]);

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
        dict.push({ question: questionObject, answers: [] });
        sendAnswersToDatabase(questionObject);
      })
      .catch((error) => {
        console.log("handle submit error");
        console.log(error.response);
        console.log(error.question);

        if (error.response.data.question) {
          setQuestionError(error.response.data.question);
        } else {
          setQuestionError(null);
        }
      });
  };

  const sendAnswersToDatabase = (questionObject) => {
    for (let i = 0; i < answerList.length; i++) {
      let answer = answerList[i];

      // On last element, reset answer list.
      if (i == answerList.length - 1) {
        setAnswerList([
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
          { course_question: questionObject.id, answer: answer.answer },
          {
            headers: {
              authorization: "Token " + getUserToken(),
            },
          }
        )
        .then((response) => {
          answer = response.data;
          for (let i = 0; i < dict.length; i++) {
            if (dict[i].question == questionObject) {
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
  };

  const printDict = () => {
    return (
      <div>
        <h3>Questions</h3>

        <Table>
          <TableBody>
            {dict &&
              dict.map((item) => (
                <TableRow key={item.question.id}>
                  <TableCell>{item.question.id}</TableCell>
                  <TableCell>{item.question.question}</TableCell>
                  <TableCell>
                    Answers:
                    {item.answers.map((answer) => answer.answer + ", ")}
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

        <br />
        <br />
        <pre>{JSON.stringify(dict, null, 2)}</pre>
      </form>
    </div>
  );
}
