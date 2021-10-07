const database = require("./database");
const express = require("express");
var router = express.Router();
const cors = require("cors");

// magic is the variable to link to database
var magic = database.connection


router.get("/videos", cors(), (req, res) => {
  var videos = [];
  magic.query("SELECT name,link FROM videos order by video_id", (error, results) => {
    if(error){
    console.log(error);
    res.send(500).send(error);
    } else {
      videos = Object.values(results);
    }
    console.log(videos);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ videos }));
  })
});

module.exports = { router };