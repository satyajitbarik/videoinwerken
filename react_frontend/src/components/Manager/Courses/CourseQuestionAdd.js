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

export default function CourseQuestionAdd(props) {
  const { onClose, onAdd, course } = props;
  const [courseQuestion, setCourseQuestion] = React.useState(null); //course question
  const [titleError, setTitleError] = React.useState("");

  const [inputList, setInputList] = React.useState([
    {
      firstName: "test",
      lastName: "last name",
    },
    {
      firstName: "test2",
      lastName: "last name2",
    },
  ]);

  const handleChangeInputList = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleAddInput = () => {
    console.log("HANDLE ADD INPUT");
    //setInputList([...inputList], { firstName: "aaa", lastName: "aaa" });
    //why does this not work
    const list = [...inputList];
    list.push({ firstName: "a", lastName: "b" });
    setInputList(list);
    console.log(inputList);
  };

  const handleRemoveInput = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleChange = (e) => {
    console.log("handlechange");
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setCourseQuestion({ ...courseQuestion, [name]: value });
    console.log(courseQuestion);
  };

  const handleCheckBox = (e, value) => {
    const name = e.target.name;
    setCourseQuestion({ ...courseQuestion, [name]: value });
  };

  const handleSubmit = (courseQuestion) => {
    courseQuestion.course = course.id;
    apiPost(
      "http://localhost:8000/api/manager/course/questions/",
      handleResponse,
      handleFail,
      courseQuestion
    );
    console.log(courseQuestion);
  };

  const handleResponse = (response) => {
    console.log("handle response");
    console.log(response.data);
    onAdd();
    onClose();
  };

  const handleFail = (response) => {
    console.log("handle fail");
    console.log(response.data);

    if (response.data.title) {
      setTitleError(response.data.title);
    } else {
      setTitleError(null);
    }
  };

  const addInput = () => {
    setInputList([...inputList], { answer: "" });
  };

  const renderExtraInputs = () => {
    console.log("hiiii");
    return (
      <div>
        {inputList.map((item, i) => (
          <div key={i}>
            <MyTextField name="answer" label="Answer" onChange={handleChange} />
          </div>
        ))}
        ;
      </div>
    );
  };

  return (
    <div>
      <Button onClick={onClose} color="primary">
        Back
      </Button>

      <form>
        <MyTextField
          name="question"
          label="Question"
          onChange={handleChange}
          autoFocus
        />
        <MyTextField name="answer" label="Answer" onChange={handleChange} />
        <br />
        {console.log("inputList")}
        {console.log(inputList)}
        {inputList.map((item, i) => (
          <div key={i}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={item.firstName}
              onChange={(e) => handleChangeInputList(e, i)}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={item.lastName}
              onChange={(e) => handleChangeInputList(e, i)}
            />
            {inputList.length > 1 && (
              <input
                type="button"
                value="remove"
                onClick={() => handleRemoveInput(i)}
              />
            )}
          </div>
        ))}
        <input type="button" value="add" onClick={handleAddInput} />

        <pre>{JSON.stringify(inputList, null, 2)}</pre>
        <br />
        <Button onClick={addInput} color="primary" variant="contained">
          Add answer
        </Button>
        <br />
        <br />
        <Button
          onClick={() => handleSubmit(courseQuestion)}
          color="primary"
          variant="contained"
        >
          Done
        </Button>
      </form>
    </div>
  );
}
