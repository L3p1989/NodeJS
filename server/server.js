const path = require("path");
const fs = require("fs");

let chirps = [
  { name: "Patrick", chirp: "This Node stuff is pretty cool!" },
  { name: "Stephanie", chirp: "I don't wanna be at work!" },
  { name: "Luke", chirp: "Must haz coffee!" },
  { name: "Paws", chirp: "Please pet me!" },
  { name: "Saoirse", chirp: "What's that!?" }
]; //list of chirps

let data = JSON.stringify(chirps); //passes chirps into JSON object
fs.writeFileSync("chirps.json", data); //writes file chirps.json with data

let rawData = fs.readFileSync("chirps.json"); //reads chirps.json
let chirpsData = JSON.parse(rawData); //parses chirps.json into JS
console.log(chirpsData); //outputs JS chirpsData into console
