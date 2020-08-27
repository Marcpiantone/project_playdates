const express = require("express");
const morgan = require("morgan");

const PORT = 8000;

var app = express();

const tribes = require("./routes/tribesRoute");

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) =>
  res.status(200).json("Welcome to Tribes, try /tribes")
);

app.use("/tribes", tribes);

const server = app.listen(PORT, function () {
  console.info("🌍 Listening on port " + server.address().port);
});
