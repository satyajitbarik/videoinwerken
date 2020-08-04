import React from "react";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Course from "../../Manager/Courses/Course";
// API.VIDEO

export default function ApiVideo(props) {
  const [form, setForm] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [progressText, setProgressText] = React.useState(null);
  const { handleUpdateVideo } = props;

  function handleChange(event) {
    const inputValue =
      event.target.name === "file" ? event.target.files[0] : event.target.value;

    setForm({ ...form, [event.target.name]: inputValue });
  }

  function handleSubmit() {
    const videoFile = form.file;
    const data = new FormData();
    data.append("file", videoFile);

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        //console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        setProgress(percent);
        setProgressText(`${loaded}kb of ${total}kb | ${percent}%`);
      },
    };

    const apiKey = "C1XnniSyvCE1RiNQAqOlBzU9PhiToJD9iabOJO8DPnB";
    axios
      .post("https://sandbox.api.video/auth/api-key", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          apiKey: apiKey,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
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
      <Button color="primary" component="label">
        Browse video
        <input
          onChange={handleChange}
          type="file"
          name="file"
          style={{ display: "none" }}
        />
      </Button>

      <Button color="primary" onClick={handleSubmit}>
        Submit
      </Button>

      <BorderLinearProgress variant="determinate" value={progress} />
      {progressText ? progressText : null}

      <br />
      {progress ? "Finished uploading!" : null}
    </div>
  );
}
