import React from "react";
//dunno if i should
export default class CourseModal extends Component {
  render() {

            <TextField
              autoFocus
              name="title"
              label="Title"
              variant="outlined"
              onChange={this.handleChange}
              margin="dense"
              fullWidth
            />
    );
  }
}


export default function TextField(props) {
    return <ListItem button component="a" {...props} />;
  }
  
