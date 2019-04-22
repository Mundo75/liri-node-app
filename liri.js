//Provided in instructions
require("dotenv").config();

//supply require requests for packages needed
var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
var moment = require("moment");
var spotify = require("node-spotify-api");
var spotify = new spotify(keys.spotify);
var axios = require("axios");


// 3 API's --> omdb; spotify; bands-in-town
var omdb = (keys.omdb);
var bandsInTown = (keys.omdb);


//Function that passes through user input an 4 pre-determined commands to apply 
//logic for what the app should do next.  First attempt at a switch/case statement.
var userCommand = process.argv[2];
var userSearch = process.argv.slice(3).join(" ");
var fileName = "log.txt";
var currentTime = "Time of Log: " + moment().format("dddd, MM/DD/YYYY, HH:mm A") + "\n";
var commandLine = "NODE COMMAND ACTION: node " + userCommand + " / " + userSearch + "\n";

function initialUserInput(userCommand, userSearch) {

    switch (userCommand) {
        case "movie-this": 
            getMovie(userSearch);
            break;
        case "concert-this":
            getConcerts(userSearch);
            break;
        case "spotify-this":
            getSong(userSearch);
            break;
        case "do-what-it-says":
            doThis();
            break;
        default:
            console.log("Did you forget something?  TYPE IN SOMETHING TO SEARCH!!!")    ;
    };

};
initialUserInput(userCommand, userSearch);

//set function for "movie-this" user command and code for calling omdb API
function getMovie() {

    if (!userSearch) {

        userSearch = "mr nobody";
        
    };
        axios.get("http://www.omdbapi.com/?t=" + userSearch + "&apikey=694640ef").then(function(response) {

            console.log(" ");
            console.log("=====SEARCHING FOR=====" + userSearch.toLocaleUpperCase() + "=====");
            console.log(" ");
            fs.appendFile(fileName, "==================MOVIE LOG ENTRY================"+ "\n", "utf-8", function(err) {
                if (err) throw err;
            });

           
                var movieQueryData = 
                     "Title: " + response.data.Title + "\n" +
                     "Year: " + response.data.Year + "\n" +
                     "IMDB Rating: " + response.data.Rated + "\n" + 
                     "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n" +
                     "Origin Country: " + response.data.Country + "\n" +
                     "Language: " + response.data.Language + "\n" +
                     "\n" +
                     "Plot: " + response.data.Plot + "\n" +
                     "\n" +
                     "Actors: " + response.data.Actors + "\n" +
                     "________________________________________________________________________________" + "\n"

                console.log(movieQueryData);

                //***BONUS -- append search data to log.txt file
                fs.appendFile(fileName, currentTime + commandLine + movieQueryData, "utf-8", function(err){
                    if (err) throw err;
                });
            });
            
                
    };                
        
//set function for "concert-this" user command and code for calling the bandsintown API
function getConcerts() {

  
    axios.get("https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp").then(function(response) {

        console.log(" ");
        console.log("========SEARCHING FOR======" + userSearch.toLocaleUpperCase() + "=======");
        console.log(" ");
        fs.appendFile(fileName, "==================CONCERT LOG ENTRY================"+ "\n", "utf-8", function(err) {
            if (err) throw err;
        });
        //console.log(response.data[0].venue.name);
        for (var i = 0; i < 5; i++) {

            var concertData = 
                "Lineup: " + response.data[i].lineup + "\n" +
                "Arena/Venue: " + response.data[i].venue.name + "\n" +
                "City: " + response.data[i].venue.city + "\n" + 
                "Date: " + moment(response.data[i].date).format("MM-DD-YYYY") + "\n" +
                "_________________________________________" + "\n"

                console.log(concertData);

                //***BONUS -- append search data to log.txt file    
                fs.appendFile(fileName, currentTime + commandLine + concertData, "utf-8", function(err){
                    if (err) throw err;
                });

                
        };
    });

        
    
};

//set function for "spotify-this" user command and code for calling the spotify API
function getSong(songName) {

    

    if (!songName) {
        songName = "The Sign ace of base";
    };
    spotify.search({type: "track", query: songName, limit: 10}, function(err, data) {
        console.log(" ");
        console.log("========SEARCHING FOR======" + userSearch.toLocaleUpperCase() + "=======");
        console.log(" ");
        fs.appendFile(fileName, "==================SPOTIFY LOG ENTRY================"+ "\n", "utf-8", function(err) {
            if (err) throw err;
        });

        if (err) {

            return console.log("Something Went Wrong: " + err);
        }
        for (var i = 0; i < 5; i++) {
        var songData =
            "Song Title: " + data.tracks.items[i].name + "\n" +
            "Artist(s): " + data.tracks.items[i].album.artists[0].name + "\n" +
            "Link: " + data.tracks.items[i].href + "\n" +
            "Album: " + data.tracks.items[i].album.name + "\n" +
            "_________________________________________" + "\n"
        
            console.log(songData);
            
    
            //***BONUS -- append search data to log.txt file
            fs.appendFile(fileName, currentTime + commandLine + songData, "utf-8", function(err){
                if (err) throw err;
            });
        };
    });
};
function doThis() {

    console.log(" ");
    console.log("====SEARCHING PARAMETERS IN RANDOM.TXT FILE========");
    console.log(" ");
    if (userCommand === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function(error, data) {

            if(error) {

               return console.log(error);
            };

            dataArr = data.split(",");
            if (dataArr[0] === "movie-this") {
                
                if (dataArr[1] === undefined) {
                    getMovie("mr nobody");
                
                } else {

                    getMovie(dataArr[1].split().join("+"))
                };
            };

            if (dataArr[0] === "spotify-this") {
                if (dataArr[1] === undefined) {
                    getSong("The sign ace of base");

                } else {

                    getSong(dataArr[1]);
                };

            }
            
        });
    };    
        
    
}
