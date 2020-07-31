import React from "react";
import axios from "axios";

// VIMEO

export default function VideoUpload() {
  const [form, setForm] = React.useState(null);

  function handleChange(event) {
    const inputValue =
      event.target.name === "file" ? event.target.files[0] : event.target.value;

    setForm({ ...form, [event.target.name]: inputValue });
  }

  function handleSubmit() {
    //console.log({ form });
    //const data = { file: form.file, token: form.title };
    //const data = { file: form.file };
    const data = new FormData();
    //data.append("test", "hello");
    data.append("file", form.file);
    //console.log("fileee");
    console.log(form.file);
    //console.log(data);
    console.log("size: " + form.file.size);

    // https://developer.vimeo.com/apps/184383#personal_access_tokens
    //const accessToken = "5c8ae27e8982f0883a544aa0bf223f19";
    const accessToken = "fe946ff802e41a4cdf5a783f3bc50d54";
    // const accessToken = "2796fc43548ff7441ca1ad245d41e1a7";
    const size = form.file.size; // size of video in bytes

    axios
      .post("http://localhost:8000/upload", data, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        console.log(res.statusText);
        console.log(res);
      });

    /*axios
      .get(
        "https://api.vimeo.com/me/videos?access_token=fe946ff802e41a4cdf5a783f3bc50d54"
      )
      .then((response) => {
        console.log(response.data);
      });
*/
    /*
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
      });*/
  }

  return (
    <div>
      <h1>Upload youtubaaae</h1>

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
