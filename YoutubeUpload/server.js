const express = require("express");

const youtube = require("youtube-api");

const fs = require("fs");

//const { v4: uuidv4 } = require("uuid");
//const uuid = require("uuid").v4;

const cors = require("cors");

const open = require("open");

const multer = require("multer");

const credentials = require("./credentials.json");

const app = express();

app.use(express.json());

app.use(cors());

/*const storage = multer.diskStorage({
  destination: "./",
  filename(req, file, cb) {
    const newFileName = `${uuidv4()}-${file.originalName}`;

    cb(null, newFileName);
  },
});*/

const storage = multer.diskStorage({
  destination: "./",
  /* filename(req, file, cb) {
    const newFileName = `${file.originalName}`;

    cb(null, newFileName);
  },*/

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadVideoFile = multer({
  storage: storage,
}).single("file");

app.post("/upload", uploadVideoFile, (req, res) => {
  if (req.file) {
    console.log("req file");
    console.log(req.file);
    const filename = req.file.filename;
    const { title, description } = req.body;

    open(
      oAuth.generateAuthUrl({
        access_type: "offline",
        scope: "https://www.googleapis.com/auth/youtube.upload",
        state: JSON.stringify({ filename, title, description }),
      })
    );
  }
});

app.get("/oauth2callback", (req, res) => {
  res.redirect("http://localhost:8083/success");
  const { filename, title, description } = JSON.parse(req.query.state);

  oAuth.getToken(req.query.code, (err, token) => {
    if (err) {
      console.log(err);
      return;
    }

    oAuth.setCredentials(tokens);
    youtube.video.insert(
      {
        resource: {
          snippet: { title, description },
          status: { privacyStatus: "private" },
        },
        part: "snippet,status",
        media: {
          body: fs.createReadStream(filename),
        },
      },
      (err, data) => {
        console.log("Done");
        process.exit();
      }
    );
  });
});

const oAuth = youtube.authenticate({
  type: "oauth",
  client_id: credentials.web.client_id,
  client_secret: credentials.web.client_secret,
  redirect_url: credentials.web.redirect_uris[0],
});

app.listen(3000, () => {
  console.log("APP is listening on port 3000");
});
