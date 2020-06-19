import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormControlLabel, TextField, Checkbox } from "@material-ui/core";

export default function CourseCreate(props) {
  let { item, showModal } = props;
  const { onSave, onClose } = props;

  //const [open, setOpen] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    item = { ...item, [name]: value };
    console.log(item);
  };

  const handleCheckBox = (e, value) => {
    const name = e.target.name;
    console.log(name);
    console.log(value);
    item = { ...item, [name]: value };
    console.log(item);
  };

  return (
    <Dialog open={showModal} aria-labelledby="form-dialog-title">
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
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            onChange={handleChange}
            margin="normal"
            fullWidth
          />

          <FormControlLabel
            control={<Checkbox onChange={handleCheckBox} name="active" />}
            label="Active"
            style={{ display: "block", marginTop: 5 }}
          />

          <FormControlLabel
            control={
              <Checkbox onChange={handleCheckBox} name="individual_result" />
            }
            label="Allow to see individual result per question"
            style={{ display: "block" }}
          />

          <TextField
            name="course_duration"
            label="Course duration"
            variant="outlined"
            onChange={handleChange}
            margin="normal"
            fullWidth
          />

          <TextField
            name="video"
            label="Video"
            variant="outlined"
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onSave(item)} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
