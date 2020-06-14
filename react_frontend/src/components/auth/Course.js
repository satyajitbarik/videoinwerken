import React, { Component } from "react";
import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthUrls } from "../../constants/urls";
import Modal from "material-ui/Modal";
import Button from "material-ui/Button";

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

  // This is called upon finishing loading
  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get(AuthUrls.COURSES)
      .then((response) => {
        this.setState({ coursesList: response.data });
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  createItem = () => {
    //const item = { title: "", description: "", completed: false };
    this.setState({ modal: !this.state.modal });
  };

  // Toggle modal
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle(); // modal toggle
    if (item.id) {
      axios
        .put(`http://localhost:8000/courses/${item.id}/`, item, {
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/courses/", item, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => this.refreshList());
  };

  renderCourses = () => {
    const courses = this.state.coursesList;

    return courses.map((item) => <li key={item.id}>item.id</li>);
  };

  render() {
    return (
      <div>
        <h1>Courses:</h1>
        <ul>{this.coursesList}</ul>

        <Button onClick={this.createItem} className="btn btn-primary">
          Add task
        </Button>

        <Modal>
          <div>test</div>
        </Modal>
      </div>
    );
  }
}

export default Course;
