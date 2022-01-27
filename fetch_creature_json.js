const fetch = require("node-fetch");
const path = require("path");
const fs = require("fs");
const myArgs = process.argv.slice(2);

const jsonPath = path.join(__dirname, "_resource/token_json");
const openSeaApi = "https://creatures-api.opensea.io/api/creature/";
const fetchJson = async () => {
  for (let index = 1; index <= myArgs[0]; index++) {
    const tokenJsonPath = `${jsonPath}/${index}.json`;
    const response = await fetch(openSeaApi + index);
    const responseJson = await response.json();
    console.log(responseJson);
    fs.writeFile(tokenJsonPath, JSON.stringify(responseJson), function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
};
fetchJson();
