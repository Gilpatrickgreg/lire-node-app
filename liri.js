var fs = require("fs");
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");

// Store all of the arguments in an array
var nodeArgs = process.argv;

// object called "liri"
var liri = {
    concertThis: function(readMeConcertName) {
        // Create an empty variable for holding the artist or band name
        var artistBandName = '';
        
        // Loop through all the words in the node argument
        // And do a little for-loop magic to handle the inclusion of "+"s
        for (var i = 3; i < nodeArgs.length; i++) {
            if (i > 3 && i < nodeArgs.length) {
                artistBandName = artistBandName + "+" + nodeArgs[i];
            } else {
                artistBandName = nodeArgs[i];
            }
        }

        if (readMeConcertName) {
            artistBandName = readMeConcertName;
        }

        
        // Then run a request with axios to the Bands In Town API with the arist or band name specified
        var queryUrl = "https://rest.bandsintown.com/artists/" + artistBandName + "/events?app_id=codingbootcamp";

        axios.get(queryUrl).then(
        function(response) {
            console.log("\n------------------- Concert This App -------------------\n");
            console.log("* Artist or Band Name: " + artistBandName.replace(/\+/g, ' '));
            console.log("\n--------------------------------------------------------\n");
            console.log("* Name of venue: " + response.data[0].venue.name);
            console.log("\n--------------------------------------------------------\n");
            console.log("* Venue location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
            console.log("\n--------------------------------------------------------\n");
            console.log("* Date of event: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
            console.log("\n--------------------------------------------------------\n");
        })
        .catch(function(error) {
            if (error.response) {
            // The request was made and the server responded with a status code
            console.log("\n------------------------------------------------\n");
            console.log("-----  Please enter an Artist or Bandname  -----");
            console.log("\n------------------------------------------------\n");
            }
        });

    },

    spotifyThisSong: function(readMeSongName) {
        // Create an empty variable for holding the client id and client secret
        var spotify = new Spotify(keys.spotify);
        // Create an empty variable for holding the song name
        var songName = "";

        // logic for Ace of Base default
        if (process.argv[3] == undefined && readMeSongName == undefined) {
            
            queryUrl = "http://www.omdbapi.com/?t=" + "mr+nobody" + "&y=&plot=short&apikey=trilogy";
        }
        // if (process.argv[3]) {
            // Loop through all the words in the node argument
            // And do a little for-loop magic to handle the inclusion of "+"s
            for (var i = 3; i < nodeArgs.length; i++) {
                if (i > 3 && i < nodeArgs.length) {
                    songName = songName + "+" + nodeArgs[i];
                } else {
                    songName = nodeArgs[i];
                }
            }

            if (readMeSongName) {
                songName = readMeSongName;
            }
            
            spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log("\n----------- Spotify This Song App ------------\n");
                console.log("* Artist(s): " + data.tracks.items[0].artists[0].name);
                console.log("\n----------------------------------------------\n");
                console.log("* Song name: " + songName.replace(/\+/g, ' '));
                console.log("\n----------------------------------------------\n");
                console.log("* Preview link of song: " + data.tracks.items[0].preview_url);
                console.log("\n----------------------------------------------\n");
                console.log("* Album title: " + data.tracks.items[0].album.name);
                console.log("\n----------------------------------------------\n");
            });
        // } else {
                // console.log("\n----------- Spotify This Song App ------------\n");
                // console.log("* Artist(s): Ace of Base");
                // console.log("\n----------------------------------------------\n");
                // console.log("* Song name: All That She Wants");
                // console.log("\n----------------------------------------------\n");
                // console.log("* Preview link of song: https://p.scdn.co/mp3-preview/b176774bc04182501c2d5d201afda143b1193f31?cid=1740da635c3c49d4b9f3caca4241631d");
                // console.log("\n----------------------------------------------\n");
                // console.log("* Album title: The Sign (US Album) [Remastered]");
                // console.log("\n----------------------------------------------\n");
        // }
     },

    // method called "movie-this" within "liri" object
    movieThis: function(readMeMovieName) {
        // Create an empty variable for holding the movie name
        var movieName = "";

        // Loop through all the words in the node argument
        // And do a little for-loop magic to handle the inclusion of "+"s
        for (var i = 3; i < nodeArgs.length; i++) {
            if (i > 3 && i < nodeArgs.length) {
                movieName = movieName + "+" + nodeArgs[i];
            } else {
                movieName += nodeArgs[i];
            }
        }

        if (readMeMovieName) {
            movieName = readMeMovieName;
        }

        // Then run a request with axios to the OMDB API with the movie specified
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        
        // logic for Mr. Nobody default
        if (process.argv[3] == undefined && readMeMovieName == undefined) {
            
            queryUrl = "http://www.omdbapi.com/?t=" + "mr+nobody" + "&y=&plot=short&apikey=trilogy";
        }

        axios.get(queryUrl).then(
        function(response) {
            console.log("\n------------------- Movie This App -------------------\n");
            console.log("* Title of the movie: " + response.data.Title);
            console.log("\n------------------------------------------------------\n");
            console.log("* Year the movie came out: " + response.data.Year);
            console.log("\n------------------------------------------------------\n");
            console.log("* IMDB Rating of the movie: " + response.data.imdbRating);
            console.log("\n------------------------------------------------------\n");
            console.log("* Rotten Tomatoes Rating of the movie: " + response.data.tomatoRating);
            console.log("\n------------------------------------------------------\n");
            console.log("* Country where the movie was produced: " + response.data.Country);
            console.log("\n------------------------------------------------------\n");
            console.log("* Language of the movie: " + response.data.Language);
            console.log("\n------------------------------------------------------\n");
            console.log("* Plot of the movie: " + response.data.Plot);
            console.log("\n------------------------------------------------------\n");
            console.log("* Actors in the movie: " + response.data.Actors);
            console.log("\n------------------------------------------------------\n");
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.log("\n------------------------------------------------\n");
                console.log("----------  Please enter a Movie name  ---------");
                console.log("\n------------------------------------------------\n");
            }
        });
    },

    doWhatItSays: function() {
        // read the "fs" variable and put data in "random.txt" file, can return error and data
        fs.readFile('random.txt', 'utf8', function(err, data) {
            // if not there return error
            if (err) {
                return console.log(err);
            }
            // Break the string down by comma separation and store the contents into the output array.
            var outputArray = data.split(",");
            var task = outputArray[0];
            var dataPoint = outputArray[1].replace(/"/g, "").replace(/\s/g, "+");
            // var spotify = new Spotify(keys.spotify);
            

            if (task === "spotify-this-song") {

                // run spotifyThisSong function within liri object and passing in dataPoint variable

                liri.spotifyThisSong(dataPoint);
                console.log("\n----------- Do What It Says App - Spotify --------------");
                console.log("------------------- (random.txt file) ------------------\n");
                
                // spotify.search({ type: 'track', query: dataPoint, limit: 1 }, function(err, data) {
                //     if (err) {
                //         return console.log('Error occurred: ' + err);
                //     }
                //     console.log("\n----------- Do What It Says App - SPOTIFY ------------");
                //     console.log("----------------- (random.txt file) ------------------\n");
                //     console.log("* Artist(s): " + data.tracks.items[0].artists[0].name);
                //     console.log("\n------------------------------------------------------\n");
                //     console.log("* Song name: " + dataPoint.replace(/\+/g, ' '));
                //     console.log("\n------------------------------------------------------\n");
                //     console.log("* Preview link of song: " + data.tracks.items[0].preview_url);
                //     console.log("\n------------------------------------------------------\n");
                //     console.log("* Album title: " + data.tracks.items[0].album.name);
                //     console.log("\n------------------------------------------------------\n");
                // });

            } else if (task === "concert-this") {

                // run concertThis function within liri object and passing in dataPoint variable

                liri.concertThis(dataPoint);
                console.log("\n----------- Do What It Says App - Concert --------------");
                console.log("------------------- (random.txt file) ------------------\n");
                
            } else {
                // run movieThis function within liri object and passing in dataPoint variable

                liri.movieThis(dataPoint);
                console.log("\n----------- Do What It Says App - Movie --------------");
                console.log("----------------- (random.txt file) ------------------\n");

            }
        });
    }
};