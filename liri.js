require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var movie = process.argv[2]
axios.get("http://www.omdbapi.com/?i=tt3896198&apikey=46d1379")
.then(function(response) {
    
    console.log(response.data);
  },

console.log("this is loaded"));

var artist = process.argv[2]
axios.get("http://www.artists.bandsintown.com/bandsintown-api")
.then(function(response) {
    
    console.log(response.data);
  },

console.log("this is loaded"));


spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });