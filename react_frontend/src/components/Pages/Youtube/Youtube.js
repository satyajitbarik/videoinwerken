import React from "react";
import axios from "axios";

export default function Youtube() {
  const [form, setForm] = React.useState({
    title: "",
    description: "",
    file: null,
  });

  function handleChange(event) {
    const inputValue =
      event.target.name === "file" ? event.target.files[0] : event.target.value;
    setForm({ ...form, [event.target.name]: inputValue });
  }

  function handleSubmit() {
    event.preventDefault();
    console.log(form);

    const videoData = new FormData();
    videoData.append("file", form.file);
    videoData.append("title", form.title);
    videoData.append("description", form.description);

    axios
      .post("http://localhost:3000/upload", videoData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
      });
  }

  return (
    <div>
      <h1>Upload youtube</h1>
      <div>
        <input
          onChange={handleChange}
          type="text"
          name="title"
          autoComplete="off"
          placeholder="Title"
        />
      </div>
      <div>
        <input
          onChange={handleChange}
          type="text"
          name="description"
          autoComplete="off"
          placeholder="Description"
        />
      </div>
      <div>
        <input
          onChange={handleChange}
          type="file"
          name="file"
          placeholder="Add video file"
        />
      </div>
      <button onClick={handleSubmit}>Upload Video</button>
    </div>
  );
}
