import React, { Component } from "react";
import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthUrls } from "../../../constants/urls";
import { Button } from "@material-ui/core";

import { getUserToken1 } from "../../../utils/authUtils";
import CourseModal from "../Courses/CourseModal";

import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemLink from "../../../utils/utils";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";
class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      coursesList: [],
      activeItem: {
        title: "",
        description: "",
      },
    };
  }

  // This is called upon finishing loading
  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get(AuthUrls.COURSES, {
        headers: {
          authorization: "Token " + getUserToken1(),
        },
      })
      .then((response) => {
        this.setState({ coursesList: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderCourses = () => {
    const courses = this.state.coursesList;
    console.log(courses);
    return (
      <Table>
        <TableBody>
          {courses.map((item) => (
            <TableRow
              key={item.id}
              onClick={() => {
                this.props.history.push("courses/" + item.id);
              }}
            >
              <TableCell style={{ width: 50 }}>
                <Checkbox checked={true} disabled={true}></Checkbox>
              </TableCell>
              <TableCell style={{ width: 50 }}>{item.id}</TableCell>
              <TableCell>{item.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  createItem = () => {
    const item = { title: "", description: "" };
    this.setState({ activeItem: item, showModal: true });
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  handleSubmit = (item) => {
    this.closeModal(); // closeModal
    console.log("Hello");
    console.log(item);
    /*if (item.id) {
      axios
        .put(`http://localhost:8000/courses/${item.id}/`, item, {
          headers: {
            authorization: "Token " + getUserToken1(),
          },
        })
        .then((response) => this.refreshList());
      return;
    }*/
    axios
      .post(AuthUrls.COURSES, item, {
        headers: {
          authorization: "Token " + getUserToken1(),
        },
      })
      .then((response) => this.refreshList());
  };

  render() {
    return (
      <div>
        <h1>Courses:</h1>
        {this.renderCourses()}

        <Button onClick={this.createItem} className="btn btn-primary">
          Add task
        </Button>

        {this.state.showModal ? (
          <CourseModal
            activeItem={this.state.activeItem}
            onSave={this.handleSubmit}
            onCancel={this.closeModal}
          />
        ) : null}
      </div>
    );
  }
}

export default Course;
