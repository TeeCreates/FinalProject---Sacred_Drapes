const express = require("express");
const app = express();

app.get("/message", function (req, res) {
  res.status(200).json({ message: "Hello World" });
});

app.listen(8000);
