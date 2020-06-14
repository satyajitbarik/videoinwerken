/* eslint-disable react/prop-types */
import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function CourseDialogContent({ handleSubmit }) {
  return (
    <DialogContent>
      <DialogContentText>
        Please fill in the details of the course.
      </DialogContentText>
      <form onSubmit={handleSubmit}>
        <TextField
          id="course_title"
          label="Title"
          variant="outlined"
          margin="dense"
          fullWidth
        />
        <TextField
          autoFocus
          id="course_description"
          label="Description"
          variant="outlined"
          margin="dense"
          fullWidth
        />
      </form>
    </DialogContent>
  );
}

export function CourseModal({ open, activeItem, handleSubmit, handleClose }) {
  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add course</DialogTitle>
        <CourseDialogContent handleSubmit={handleSubmit} />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button htmlType="submit" onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default class CourseModal1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;
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
              //id="title"
              name="title"
              label="Title"
              variant="outlined"
              //value={this.state.activeItem.title}
              onChange={this.handleChange}
              margin="dense"
              fullWidth
            />
            <TextField
              //id="description"
              name="description"
              label="Description"
              variant="outlined"
              //value={this.state.activeItem.description}
              onChange={this.handleChange}
              margin="dense"
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button /*onClick={toggle}*/ color="primary">Cancel</Button>
          <Button onClick={() => onSave(this.state.activeItem)} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  /* render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Todo Item </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Enter Todo Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter Todo description"
              />
            </FormGroup>
            <FormGroup check>
              <Label for="completed">
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }*/
}
