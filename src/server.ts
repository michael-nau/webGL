// import { application as app } from "express";
import express from "express";
const app = express();

//
// start here
//
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
