import React, { Component } from "react";
import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthUrls } from "../../constants/urls";

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
      coursesList: [],
    };
  }

  getCourses = () => {
    axios
      .get(AuthUrls.COURSES)
      .then((response) => {
        this.setState({ coursesList: response.data });
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  renderCourses = () => {
    const courses = this.state.coursesList;

    return courses.map((item) => <li key={item.id}>item.id</li>);
  };

  render() {
    return <ul>{this.coursesList()}</ul>;
  }
}

export default Course;
