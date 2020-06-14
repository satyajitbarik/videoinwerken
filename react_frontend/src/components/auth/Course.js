import React, { Component } from "react";
import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthUrls } from "../../constants/urls";
import { Button } from "@material-ui/core";

import { getUserToken1 } from "../../utils/authUtils";
import CourseModal from "../auth/CourseModal";

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      coursesList: [],
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

    return (
      <ul>
        {courses.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    );
  };

  createItem = () => {
    const item = { title: "", description: "" };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  handleSubmit = () => {
    this.hideModal(); // hide modal
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
      .post("http://localhost:8000/courses/", {
        headers: {
          authorization: "Token " + getUserToken1(),
        },
      })
      .then((response) => this.refreshList());
  };

  handleClose = () => {
    this.hideModal();
  };

  render() {
    return (
      <div>
        <h1>Courses:</h1>
        {this.renderCourses()}

        <Button onClick={this.showModal} className="btn btn-primary">
          Add task
        </Button>
        <CourseModal
          open={this.state.showModal}
          handleSubmit={this.handleSubmit}
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}

export default Course;
