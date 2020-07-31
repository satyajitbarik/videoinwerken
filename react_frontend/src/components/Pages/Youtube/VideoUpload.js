import React from "react";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
// VIMEO

export default function VideoUpload() {
  const [form, setForm] = React.useState(null);
  const [progress, setProgress] = React.useState(0);

  function handleChange(event) {
    const inputValue =
      event.target.name === "file" ? event.target.files[0] : event.target.value;

    setForm({ ...form, [event.target.name]: inputValue });
  }

  function handleSubmit() {
    const data = new FormData();
    data.append("file", form.file);
    console.log(form.file);

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        setProgress(percent);
      },
    };

    axios.post("http://localhost:3000/upload", data, options).then((res) => {
      // then print response status
      console.log(res.statusText);
      console.log(res);
    });
  }

  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#1a90ff",
    },
  }))(LinearProgress);

  return (
    <div>
      <h1>Upload video</h1>
      <div>
        <Button color="primary" component="label">
          Browse video
          <input
            onChange={handleChange}
            type="file"
            name="file"
            style={{ display: "none" }}
          />
        </Button>
      </div>
      <div>
        <Button color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <div>
        <BorderLinearProgress variant="determinate" value={progress} />

        {progress ? "Finished uploading!" : null}
      </div>
    </div>
  );
}
