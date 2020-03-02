const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const spinBotAPIkey = require("./config").spinBotAPIkey;
const app = express();
const axios = require("axios");
const Grammarbot = require("grammarbot");

const bot = new Grammarbot({
  api_key: "KS9C5N3Y", // (Optional) defaults to node_default
  language: "en-US", // (Optional) defaults to en-US
  base_uri: "api.grammarbot.io" // (Optional) defaul    ts to api.grammarbot.io
});

//middlewares
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.post("/api/rewrite", async (req, res) => {
  console.log(req.body.words);
  await axios({
    method: "post", //you can set what request you want to be
    url: "https://api.spinbot.com/",
    data: req.body.body,
    headers: {
      "x-auth-key": spinBotAPIkey,
      "x-words-to-skip": req.body.words
    }
  })
    .then(async resp => {
      if (req.body.spellCheck)
        await axios
          .post("http://localhost:5000/api/spell", resp.data)
          .then(response => {
            res.json(response.data);
          })
          .catch(err => console.log(err));
      else res.json(resp.data);
    })
    .catch(err => console.log(err));
});

app.post("/api/spell", async (req, res) => {
  console.log(req.body);
  await bot
    .checkAsync(req.body)
    .then(resp => {
      //   res.json(resp.data);
      console.log("final" + resp);
    })
    .catch(err => console.log(err));
});

const port = 5000;

app.listen(port, () => {
  console.log("server up and running");
});
