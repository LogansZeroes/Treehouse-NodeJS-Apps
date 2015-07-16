//Problem: We need a simple way to look at a user's badge count and JavaScript points
//Solution: Use Node.js to connect to Treehouse's API to get profile information to print out
var https = require("https");

//Print out message
function printMessage(temperature, rain, region) {
  var message = "Today's forecast for your region in " + region + " is " + temperature + " degrees with a " + rain + "% chance of rain";
  console.log(message);
}

//Print out error messages
function printError(error){
    console.error(error.message);
}

function get(latitude, longitude){
  //Connect to the API URL (http://teamtreehouse.com/username.json)
  var request = https.get("https://api.forecast.io/forecast/2dc0ad1d17122238459e7358ff69fc88/" + latitude + "," + longitude, function(response){
    var body = "";
    //Read the data
    response.on('data', function (chunk) {
      body += chunk;
    });
    response.on('end', function(){
      if(response.statusCode === 200) {
        try {
          //Parse the data
          var profile = JSON.parse(body);
          //Print the data
          printMessage(profile.currently.temperature, profile.currently.precipProbability, profile.timezone);
        } catch(error) {
          //Parse Error
          printError(error);
        }
      } else {
        //Status Code Error
        printError({message: "There was an error getting the forecast for latitude " + latitude + " and longitude " + longitude + ". (" + response.statusCode + ")"});
      }
    });
  });
  
  //Connection Error
  request.on("error", printError);
}


module.exports.get = get;