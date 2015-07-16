var forecast = require("./forecast");
var coordinates = process.argv.slice(2);

// forecast.get(coordinates[0],coordinates[1]);


function isOdd(num){
  return coordinates.indexOf(num) % 2 === 1;  
}

function isEven(num){
  return coordinates.indexOf(num) % 2 === 0;  
}

var latitudes = coordinates.filter(isEven);
var longitudes = coordinates.filter(isOdd);

for (var i = 0; i < coordinates.length/2; i++){
  forecast.get(latitudes[i], longitudes[i]);
}