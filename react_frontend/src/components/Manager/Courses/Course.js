import React, { Component } from "react";
import axios from "axios";
import { AuthUrls } from "../../../constants/urls";
import { Button } from "@material-ui/core";

import { getUserToken1 } from "../../../utils/authUtils";
import CourseCreate from "./CourseCreate";
import CourseEdit from "./CourseEdit";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailItem: null,
      showModal: false,
      coursesList: [],
      activeItemAdd: null,
      current_user: {},
    };
  }

  // This is called upon finishing loading
  componentDidMount() {
    this.getCurrentUser();
    //this.refreshList(); // This is now called in getCurrentUser.
  }

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
        this.refreshList();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  refreshList = () => {
    const token = getUserToken1();
    if (!token) {
      return;
    }
    axios
      .get(AuthUrls.COURSES, {
        headers: {
          authorization: "Token " + token,
        },
        params: {
          manager_id: this.state.current_user.pk,
        },
      })
      .then((response) => {
        this.setState({ coursesList: response.data });
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
    this.setState({ activeItemAdd: item, showModal: true });
  };

  detailItem = (item) => {
    const currentUserID = this.state.current_user.pk;
    console.log("current user id:" + currentUserID);
    //this.setState({ activeItem: item, showModal: true });

    return (
      <CourseEdit
        item={this.state.detailItem}
        onSave={this.handleSubmit} //not needed
        onClose={this.handleCloseEdit} //not needed possibly
      />
    );
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseAdd = () => {
    this.setState({ showModal: false });
  };

  handleCloseEdit = () => {
    this.setState({ detailItem: null });
  };

  handleSubmit = (item) => {
    console.log("handlesubmit");
    console.log(item);
    // Edit item
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/manager/courses/${item.id}/`, item, {
          headers: {
            authorization: "Token " + getUserToken1(),
          },
        })
        .then((response) => this.refreshList());
      this.handleCloseEdit();
      return;
    }
    // Create item
    axios
      .post(AuthUrls.COURSES, item, {
        headers: {
          authorization: "Token " + getUserToken1(),
        },
      })
      .then((response) => {
        this.refreshList();
        this.handleCloseAdd();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  render() {
    return (
      <div>
        <h3>Courses</h3>
        {this.renderCourses()}

        <Button
          onClick={this.createItem}
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
        >
          Make new course
        </Button>
        {this.state.showModal ? (
          <CourseCreate
            item={this.state.activeItemAdd}
            onSave={this.handleSubmit}
            onClose={this.handleCloseAdd}
            showModal={this.state.showModal}
          />
        ) : null}

        {this.state.detailItem ? this.detailItem(this.state.detailItem) : null}
      </div>
    );
  }
}

export default Course;
