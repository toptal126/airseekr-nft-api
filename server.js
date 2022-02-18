require("dotenv").config();
const express = require("express");
const serveStatic = require("serve-static");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(cors());
//here we are configuring dist to serve app files
app.use("/", serveStatic(path.join(__dirname, "/client/build")));

const jsonPath = path.join(__dirname, "_resource/token_json");
const contractJson = require("./_resource/contract_json/contract.json");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// app.use(express.static("_resource/token_json"));

app.get("/api/token/:tokenId", (req, res, next) => {
  const tokenId = req.params.tokenId;
  const tokenJsonPath = `${jsonPath}/${tokenId}.json`;
  try {
    fs.readFile(`${jsonPath}/${tokenId}.json`, "utf8", (err, data) => {
      if (data) res.json(JSON.parse(data));
      else res.json({});
    });
  } catch (e) {
    res.json({});
  }
});

app.get("/api/contract", (req, res, next) => {
  res.json(contractJson);
  //   res.json({ test: process.env.REACT_APP_API_URL });
});

app.post("/tokenJson", (req, res, next) => {
  res.json(req.body);
});

// app.get("*", (req, res) => {
//   res.json({});
// });

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
