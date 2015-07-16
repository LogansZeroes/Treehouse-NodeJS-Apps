var https = require("https");


function printMessage(temperature, rain, region) {
  var message = "Today's forecast for your region in " + region + " is " + temperature + " degrees with a " + rain + "% chance of rain";
  console.log(message);
}


function printError(error){
    console.error(error.message);
}

function get(latitude, longitude){

  var request = https.get("https://api.forecast.io/forecast/2dc0ad1d17122238459e7358ff69fc88/" + latitude + "," + longitude, function(response){
    var body = "";

    response.on('data', function (chunk) {
      body += chunk;
    });

    response.on('end', function(){
      if(response.statusCode === 200) {
        try {
          var profile = JSON.parse(body);

          printMessage(profile.currently.temperature, profile.currently.precipProbability, profile.timezone);
        } catch(error) {

          printError(error);
        }
      } else {
        printError({message: "There was an error getting the forecast for latitude " + latitude + " and longitude " + longitude + ". (" + response.statusCode + ")"});
      }
    });
  });
  
  request.on("error", printError);
}


module.exports.get = get;