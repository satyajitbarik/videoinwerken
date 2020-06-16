/* eslint-disable react/prop-types */
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import {
  FormControl,
  FormControlLabel,
  Input,
  FormHelperText,
  TextField,
  Checkbox,
} from "@material-ui/core";
import { getUserToken1 } from "../../../utils/authUtils";

export default class CourseEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    console.log(name);
    console.log(value);
    const item = { ...this.state.item, [name]: value };
    this.setState({ item });
  };

  handleCheckBox = (e, value) => {
    const name = e.target.name;
    console.log(name);
    console.log(value);
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  courseEdit = () => {
    const token = getUserToken1();
    if (token) {
      axios
        .get("localhost:8000/api/manager/courses/", {
          headers: {
            authorization: "Token " + token,
          },
          /*params: {
            manager_id: 1,
          },*/
        })
        .then((response) => {
          // IF MANAGER_ID DOES NOT EQUAL USER THEN CANCEL?
          this.setState({ coursesList: response.data });
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };

  render() {
    const { onSave, onCancel } = this.props;
    const item = this.state.item;
    return (
      <Dialog open={true} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details of the course.
          </DialogContentText>

          <form>
            <TextField
              autoFocus
              name="title"
              label="Title"
              variant="outlined"
              onChange={this.handleChange}
              value={item.title}
              margin="normal"
              fullWidth
            />
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              onChange={this.handleChange}
              value={item.description}
              margin="normal"
              fullWidth
            />

            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleCheckBox}
                  name="active"
                  checked={item.active}
                />
              }
              label="Active"
              style={{ display: "block", marginTop: 5 }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleCheckBox}
                  name="individual_result"
                  checked={item.individual_result}
                />
              }
              label="Allow to see individual result per question"
              style={{ display: "block" }}
            />

            <TextField
              name="course_duration"
              label="Course duration"
              variant="outlined"
              onChange={this.handleChange}
              value={item.courseDuration}
              margin="normal"
              fullWidth
            />

            <TextField
              name="video"
              label="Video"
              variant="outlined"
              onChange={this.handleChange}
              value={item.video}
              margin="normal"
              fullWidth
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={() => onSave(this.state.item)} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
