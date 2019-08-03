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
//console.log("this is loaded"));

/*var artist = process.argv[2]
axios.get("http://www.artists.bandsintown.com/bandsintown-api")
.then(function(response) {
    
    console.log(response.data);
  },

console.log("this is loaded"));


spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data);*/ 

  //});
      /* Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.*/