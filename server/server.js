const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const spinBotAPIkey = require("./config").spinBotAPIkey;
const app = express();
const axios = require("axios");
const Grammarbot = require("grammarbot");
const plagiarism = require('plagiarism');
var request = require('request');
var curl = require('curlrequest');
var beautify = require("json-beautify");

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
      res.json(resp.data);
      // if (req.body.spellCheck)
      //   await axios
      //     .post("http://localhost:5000/api/spell", resp.data)
      //     .then(response => {
      //       res.json(response.data);
      //     })
      //     .catch(err => console.log(err));
      // else res.json(resp.data);
    })
    .catch(err => console.log(err));
});

app.post("/api/spell", async (req, res) => {
  console.log(req.body.value);

  axios({
    "method":"GET",
    "url":"https://montanaflynn-spellcheck.p.rapidapi.com/check/",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"montanaflynn-spellcheck.p.rapidapi.com",
    "x-rapidapi-key":"25565729c2msh160cb65b58cc467p139630jsnf7434845ef37"
    },"params":{
    "text":req.body.value
    }
    })
    .then((response)=>{
      console.log(response)
      res.json(response.data.suggestion);
    })
    .catch((error)=>{
      console.log(error)
    });


  

  // await bot
  //   .checkAsync(req.body.value)
  //   .then(resp => {
  //     console.log(resp.matches.replacements);
  //       res.json(resp.data);
  //   })
  //   .catch(err => console.log(err));
});


app.post("/api/plagiarism", (req, res) => {
  console.log(req.body.value)

curl.request({ url: 'https://www.prepostseo.com/apis/checkPlag', method: 'POST', data: {
    key: "d15dc179889471995185a3e09c157065",
    data: req.body.value
} }, function (err, data) {
    res.json(data);

});




  // axios.post('https://www.prepostseo.com/apis', {
  //   data:{
  //     key: "d15dc179889471995185a3e09c157065"
  //   }
  // })
  // .then(resp => {
  //   console.log(resp)
  // })
  // .catch(err => {
  //   console.log(err)
  // });

})
const port = 5000;

app.listen(port, () => {
  console.log("server up and running");
});
