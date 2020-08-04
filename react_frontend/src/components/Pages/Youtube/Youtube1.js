import React from "react";
import axios from "axios";
//import vimeoupload from "vimeo-upload";

// VIMEO

export default function Youtube1() {
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

  function handleSubmit(event) {
    event.preventDefault();
    console.log({ form });

    const upload = { file: form.file, token: form.title };
    console.log(upload);

    console.log("size: " + form.file.size);

    // https://developer.vimeo.com/apps/184383#personal_access_tokens
    //const accessToken = "5c8ae27e8982f0883a544aa0bf223f19";
    const accessToken = "fe946ff802e41a4cdf5a783f3bc50d54";
    // const accessToken = "2796fc43548ff7441ca1ad245d41e1a7";
    const size = form.file.size; // size of video in bytes

    axios
      .get(
        "https://api.vimeo.com/me/videos?access_token=fe946ff802e41a4cdf5a783f3bc50d54"
      )
      .then((response) => {
        console.log(response.data);
      });

    axios
      .post("https://api.vimeo.com/me/videos", {
        headers: {
          Accept: "application/vnd.vimeo.*+json;version=3.4",
          "Content-Type": "application/json",
          Authorization: "bearer " + accessToken,
        },
        upload: {
          approach: "post",
          size: size,
          redirect_url: "http://localhost:8083/success1",
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

  return (
    <div>
      <h1>Upload youtube</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Upload Video</button>
      </form>
    </div>
  );
}
