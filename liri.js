// COMMMANDS THAT LIRI CAN ANSWER:
// my-tweets
// spotify this song 
// movie-this
// do-what-it-says
//-----------------------------------------------------
//CLI FORMAT:
//node [0] | liri.js [1] | Command [2] | UserInput [3]
//-----------------------------------------------------


//Global Variables
//-----------------------------------------------------
// require("dotenv").config();


var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
//Setting the commands to false and making them true when called
var tweet = false
var song = false
var movie = false
var doIt = false


//-----------------------------------------------------


//OMDB
//-----------------------------------------------------
var movieArgs = process.argv;
var movieName = "";
for (var i = 3; i < movieArgs.length; i++) {

  if (i > 3 && i < movieArgs.length) {
    movieName = movieName + "+" + movieArgs[i];
  }

  else {
    movieName += movieArgs[i];
  }
}

if (process.argv[2] ==== 'movie-this') {
	movie = true;
}
else {
	movie = false;
}
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

console.log(queryUrl);


request(queryUrl, function (error, response, body) {
  console.log('error:', error);
  console.log('statusCode:', response && response.statusCode);
  console.log('body:', body);
});
//-----------------------------------------------------


//Spotify
//-----------------------------------------------------
var spotifyArgs = process.argv;
var songName = "";
for (var i = 3; i < spotifyArgs.length; i++) {

  if (i > 3 && i < spotifyArgs.length) {
    songName = songName + "+" + spotifyArgs[i];
  }

  else {
    songName += spotifyArgs[i];
  }
}

if (process.argv[2] ==== 'spotify this song') {
	song = true;
}
else {
	song = false;
}

spotify.search({ type: 'track', query: songName }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});
//-----------------------------------------------------



//Twitter
//-----------------------------------------------------
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }

if (process.argv[2] ==== 'my-tweets') {
	tweet = true;
}
else {
	tweet = false;
}
});
//-----------------------------------------------------