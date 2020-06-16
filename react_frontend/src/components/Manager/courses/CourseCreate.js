/* eslint-disable react/prop-types */
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  FormControl,
  FormControlLabel,
  Input,
  FormHelperText,
  TextField,
  Checkbox,
  TextLabel,
} from "@material-ui/core";
import { checkPropTypes } from "prop-types";
import { event } from "jquery";

export default class CourseCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  handleCheckBox = (e, value) => {
    const name = e.target.name;
    console.log(name);
    console.log(value);
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  render() {
    const { onSave, onCancel } = this.props;
    return (
      <Dialog open={true} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add course</DialogTitle>
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
              margin="normal"
              fullWidth
            />
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              onChange={this.handleChange}
              margin="normal"
              fullWidth
            />

            <FormControlLabel
              control={
                <Checkbox onChange={this.handleCheckBox} name="active" />
              }
              label="Active"
              style={{ display: "block", marginTop: 5 }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleCheckBox}
                  name="individual_result"
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
              margin="normal"
              fullWidth
            />

            <TextField
              name="video"
              label="Video"
              variant="outlined"
              onChange={this.handleChange}
              margin="normal"
              fullWidth
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={() => onSave(this.state.activeItem)} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
