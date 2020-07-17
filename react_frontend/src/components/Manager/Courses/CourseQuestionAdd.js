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

  const handleChangeInputList = (e, index) => {
    const { name, value } = e.target;
    const list = [...answerList];
    list[index][name] = value;
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

  // Submit course question
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
        const questionId = response.data.id;

        const questionObject = question;
        setQuestion({ question: "" });

        questionObject.id = questionId;

        const newDict = dict;
        setDict(newDict.concat({ question: questionObject, answers: [] }));

        console.log("questionobject now");
        console.log(questionObject);
        sendAnswersToDatabase(questionObject);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendAnswersToDatabase = (questionObject) => {
    for (let i = 0; i < answerList.length; i++) {
      let answer = answerList[i];
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
          console.log("cunt");
          console.log(dict);

          for (let i = 0; i < dict.length; i++) {
            console.log("ayyyyy");
            console.log(questionObject);
            console.log(dict[i].question);
            console.log(answer.course_question);

            if (dict[i].questionObject == questionObject) {
              console.log("yeha");
              dict[i].answers = dict[i].answers.concat(answer);
              setDict(dict);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const printDict = () => {
    console.log(dict);
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
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const handleResponseQuestion = (response) => {
    question.id = response.data.id;
    sendAnswersToDatabase();

    dict.push({ key: question, value: answerList });
    console.log("dict");
    console.log(dict);

    //refreshQuestionsList();
    /*
    for (let i = 0; i < questionList.length; i++) {
      const question = questionList[i];
      const answers = retrieveAnswers(question);
    }*/
  };

  const handleFailQuestion = (response) => {
    if (response.data.title) {
      setTitleError(response.data.title);
    } else {
      setTitleError(null);
    }
  };

  const handleResponseAnswer = (response) => {};
  const handleFailAnswer = (response) => {
    console.log("handle fail answer");
  };

  const addInput = () => {
    setAnswerList([...answerList], { answer: "" });
  };

  const refreshQuestionsList = () => {
    console.log("refresh querstion list");

    axios
      .get("http://localhost:8000/api/manager/course/questions/", {
        headers: {
          authorization: "Token " + getUserToken(),
        },
        params: {
          course_id: course.id,
        },
      })
      .then((response) => {
        setQuestionList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*const retrieveAnswers = () => {
    console.log("retrieve answers");
    axios
      .get("http://localhost:8000/api/manager/course/question/answers/", {
        headers: {
          authorization: "Token " + getUserToken(),
        },
      })
      .then((response) => {
        setAllAnswers(response.data);
        console.log("all answers:");
        console.log(allAnswers);
      })
      .catch((error) => {
        console.log(error);
      });
  };*/

  const retrieveAnswers = (question) => {
    console.log("retrieve anssr");
    axios
      .get("http://localhost:8000/api/manager/course/question/answers/", {
        headers: {
          authorization: "Token " + getUserToken(),
        },
        params: {
          question_id: question.id,
        },
      })
      .then((response) => {
        const key = question;
        const answers = [];
        console.log("answers response data");
        console.log(response.data);
        console.log(response.data[0]);
        console.log(response.data[1]);

        for (let i = 0; i < response.data.length; i++) {
          console.log("hi?");
          const answer = response.data[i].answer;
          console.log("answer:" + answer);
          answers.push(answer);
        }
        console.log("answers:");
        console.log(answers);

        const newDict = dict.push({
          key: key,
          value: answers,
        });
        setDict(newDict);

        console.log(dict);
        console.log("YEET DICT");
      });
  };

  const printAnswersList = () => {
    return (
      <div>
        <h3>Answers</h3>

        <Table>
          <TableBody>
            {allAnswers &&
              allAnswers.map((item) => (
                <TableRow
                  key={item.id}
                  onClick={() => {
                    //setCourseDetail(item);
                    //todo edit question
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell style={{ width: 50 }}>{item.id}</TableCell>
                  <TableCell>{item.answer}</TableCell>
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

        <pre>{JSON.stringify(dict, null, 2)}</pre>
      </form>
    </div>
  );
}
