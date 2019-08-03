require("dotenv").config();
//var keys = require("./keys.js");
var axios = require("axios");
//var spotify = require('node-spotify-api');
//var spotify = new Spotify(keys.spotify);
var movie = process.argv[2]

axios.get("http://www.omdbapi.com/?t= " + movie + "&y=&plot=short&apikey=46d1379")
.then(function(response) {
    
    console.log(response.data.Title);
    console.log(response.data.Year);
    console.log(response.data.imdbRating);
    console.log(response.data.Ratings[1].Value);
    console.log(response.data.Country);
    console.log(response.data.Language);
    console.log(response.data.Plot);
    console.log(response.data.Actors);
    
});


var artist = process.argv[3]
axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
.then(function(response) {
    
    console.log(response.data);
  });

//console.log("this is loaded"));


/*spotifyKey.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data);*/ 

  //});
    