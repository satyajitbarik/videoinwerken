import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function CourseDialogContent() {
  return (
    <DialogContent>
      <DialogContentText>
        Please fill in the details of the course.
      </DialogContentText>
      <form>
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

export default function CourseModal({ open, handleSubmit, handleClose }) {
  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add course</DialogTitle>
        <CourseDialogContent />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
