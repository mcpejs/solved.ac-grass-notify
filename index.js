require("dotenv").config();
require("./bot/solvedac.js");

const http = require("http");
http
  .createServer(function (req, res) {
    res.write("main");
    res.end();
  })
  .listen(process.env.PORT || 3000);

// setInterval(() => {
//   https.get(`https://myapp.herokuapp.com/`);
//   console.log("wake up!");
// }, 1000 * 60 * 20);
