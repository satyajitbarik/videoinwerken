/* eslint-disable react/prop-types */
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormControlLabel, TextField, Checkbox } from "@material-ui/core";
import { MyCheckBox, MyEditCheckBox } from "../../../utils/utils";

export default function CourseEdit(props) {
  let { item } = props;
  const { onSave, onClose, handleDelete } = props;

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
    <Dialog open={true} onClose={onClose} aria-labelledby="form-dialog-title">
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
            onChange={handleChange}
            defaultValue={item.title}
            margin="normal"
            fullWidth
          />
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            onChange={handleChange}
            defaultValue={item.description}
            margin="normal"
            fullWidth
          />

          <MyEditCheckBox
            name="active"
            label="Active"
            defaultChecked={item.active}
            onChange={handleCheckBox}
          />

          <MyEditCheckBox
            name="individual_result"
            label="Allow to see individual result per question"
            defaultChecked={item.individual_result}
            onChange={handleCheckBox}
          />

          <TextField
            name="course_duration"
            label="Course duration"
            variant="outlined"
            onChange={handleChange}
            defaultValue={item.course_duration}
            margin="normal"
            fullWidth
          />

          <TextField
            name="video"
            label="Video"
            variant="outlined"
            onChange={handleChange}
            defaultValue={item.video}
            margin="normal"
            fullWidth
          />

          <Button
            onClick={() => handleDelete(item)}
            variant="contained"
            color="secondary"
            style={{ marginTop: 10 }}
          >
            Delete Course
          </Button>
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onSave(item)} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
