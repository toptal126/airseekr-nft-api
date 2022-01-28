require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const jsonPath = path.join(__dirname, "_resource/token_json");
const contractJson = require("./_resource/contract_json/contract.json");

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
});

app.get("*", (req, res) => {
  res.json({});
});

const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
