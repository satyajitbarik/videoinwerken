import React, { Component } from "react";
import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthUrls } from "../../../constants/urls";
import { Button } from "@material-ui/core";

import { getUserToken1 } from "../../../utils/authUtils";
import CourseCreate from "./CourseCreate";

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
import authActions from "../../../actions/authActions";

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailItem: null,
      showModal: false,
      coursesList: [],
      activeItemAdd: {
        title: "",
        description: "",
        active: false,
        individual_result: false,
        course_duration: "",
        video: "",
        manager_id: null,
      },
      current_user: {},
    };
  }

  // This is called upon finishing loading
  componentDidMount() {
    this.refreshList();
    this.getCurrentUser();
  }

  refreshList = () => {
    axios
      .get(AuthUrls.COURSES, {
        headers: {
          authorization: "Token " + getUserToken1(),
        },
        params: {
          manager_id: 1,
        },
      })
      .then((response) => {
        this.setState({ coursesList: response.data });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  getCurrentUser = () => {
    axios
      .get(AuthUrls.USER_PROFILE, {
        headers: {
          authorization: "Token " + getUserToken1(),
        },
      })
      .then((response) => {
        this.setState({ current_user: response.data });
        console.log(this.state.current_user);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  renderCourses = () => {
    const courses = this.state.coursesList;
    //console.log(courses);
    return (
      <Table>
        <TableBody>
          {courses.map((item) => (
            <TableRow
              key={item.id}
              onClick={() => {
                //this.props.history.push("courses/" + item.id);
                this.setState({ detailItem: item });
              }}
              style={{ cursor: "pointer" }}
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
    //this.getCurrentUser();
    const currentUserID = this.state.current_user.pk;
    console.log("current user id:" + currentUserID);

    const item = {
      title: "",
      description: "",
      active: false,
      individual_result: false,
      course_duration: "",
      video: "",
      manager_id: currentUserID,
    };
    this.setState({ activeItem: item, showModal: true });
  };

  detailItem = (item) => {
    const currentUserID = this.state.current_user.pk;
    console.log("current user id:" + currentUserID);
    //this.setState({ activeItem: item, showModal: true });

    return (
      <div>
        <span>hallo</span>
        <span>{item.title}</span>
      </div>
    );
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
      .then((response) => {
        this.refreshList();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  render() {
    return (
      <div>
        <h1>Courses:</h1>
        {this.renderCourses()}

        <Button onClick={this.createItem} variant="contained" color="primary">
          Add course
        </Button>

        {this.state.showModal ? (
          <CourseCreate
            activeItem={this.state.activeItemAdd}
            onSave={this.handleSubmit}
            onCancel={this.closeModal}
          />
        ) : null}

        {this.state.detailItem ? this.detailItem(this.state.detailItem) : null}
      </div>
    );
  }
}

export default Course;
