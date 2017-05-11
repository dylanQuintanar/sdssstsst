var north; //number of seats remaining in the north endzone
var south; //number of seats remaining the the south endzone
var total; //total number of student section seats remaining
var currentSection; //current section seats are being handed out out
var numPushups = 0; //number of pushups sparky has done

var kickoffTime = "Sat Nov 25 2017 19:30:00 GMT-0700";
var kickoffMilli = Date.parse(kickoffTime);

var currentDate = new Date();
var currentMilli = currentDate.getTime();

var untilGameMilliString = kickoffMilli - currentMilli;
var untilGameMilli = parseInt(untilGameMilliString);

document.getElementById("timeUntilKickoff").innerHTML = timeConversion(untilGameMilli);
document.getElementById("awayTeam").innerHTML = "Arizona";
document.getElementById("homeImage").src = "sparky.jpg"
document.getElementById("awayImage").src = "wilbur.jpg";

currentSection = 16;
document.getElementById("currentSection").innerHTML = currentSection;

north = 6500;
document.getElementById('northSeats').innerHTML = north;
south = 5800;
document.getElementById('southSeats').innerHTML = south;
total = north + south;
document.getElementById("total").innerHTML = total;

document.getElementById("waitTime").innerHTML = 30;

//set the status bar
setStatusBar(getStatusBarLevel(north), "north");
setStatusBar(getStatusBarLevel(south), "south");

//connecte to mysql database
// MySql.Execute(
//     "https://www.dylangquintanar.com", //url
//     "dgquintanar",  //username
//     "testuser", //password
//     "sdssstsst",  //database
//     "select * from GameData",  //get all elements from game data table where current date
//     function (queryReturned) { //callback function
//         //create object to store information from database
//         var obj = JSON.stringify(queryReturned.Result, null, 2);
//         obj = JSON.parse(obj);
//
//         //code for calculating kickoffTime
//         var kickoffTime = obj[0].kickoffTime;
//         var kickoffMilli = Date.parse(kickoffTime);
//
//         var currentDate = new Date();
//         var currentMilli = currentDate.getTime();
//
//         var untilGameMilliString = kickoffMilli - currentMilli;
//         var untilGameMilli = parseInt(untilGameMilliString);
//
//         //set the html of infoBox based on query returned from database
//         document.getElementById("timeUntilKickoff").innerHTML = timeConversion(untilGameMilli);
//         document.getElementById("awayTeam").innerHTML = obj[0].awayTeam;
//         document.getElementById("homeImage").src = obj[0].homeImage;
//         document.getElementById("awayImage").src = obj[0].awayImage;
//
//         currentSection = obj[0].currentSection
//         document.getElementById("currentSection").innerHTML = currentSection;
//
//         north = obj[0].northSeatsLeft;
//         document.getElementById('northSeats').innerHTML = north;
//         south = obj[0].southSeatsLeft;
//         document.getElementById('southSeats').innerHTML = south;
//         total = north + south;
//         document.getElementById("total").innerHTML = total;
//
//         document.getElementById("waitTime").innerHTML = obj[0].waitTime;
//
//         //set the status bar
//         setStatusBar(getStatusBarLevel(north), "north");
//         setStatusBar(getStatusBarLevel(south), "south");
// });

//function to decrement the total seats remaining and update the status bar over time
window.setInterval(function(){
  if(total > 0)
  {
    total = total - 220;

    if(total < 0) {
      total = 0;
    }
    document.getElementById("total").innerHTML = total;
  }

  if(north > 0)
  {
    north = north - 110;

    if(north < 0) {
      north = 0;
    }
    document.getElementById("northSeats").innerHTML = north;
  }

  if(south > 0)
  {
    south = south - 110;

    if(south < 0) {
      south = 0;
    }
    document.getElementById("southSeats").innerHTML = south;
  }
  setStatusBar(getStatusBarLevel(north), "north");
  setStatusBar(getStatusBarLevel(south), "south");
}, 10000);

//function to change the current section over time, the highest section is section 24
window.setInterval(function(){
  if(currentSection < 24){
    currentSection = parseInt(currentSection);
    currentSection += 1;
    document.getElementById("currentSection").innerHTML = currentSection;
  }
}, 30000);

//function to change the location of the backround image in the status bar pictures for the north and south endzones
function setStatusBar(level, endZone)  { //level is a number from 0-7, 0 being empty and 7 being full, endZone is north or south
  var $statusBar;
  var $statusText;
  var position;
  var css;

  if(endZone == 'north') {
    $statusBar = $("#northBar img");
    $statusText = $("#northStatus");
  }
  else {
    $statusBar = $("#southBar img");
    $statusText = $("#southStatus");
  }

  switch(level) {
    case 0:
      position = 225;
      break;
    case 1:
      position = 200;
      break;
    case 2:
      position = 175;
      break;
    case 3:
      position = 150;
      break;
    case 4:
      position = 125;
      break;
    case 5:
      position = 100;
      break;
    case 6:
      position = 75;
      break;
    case 7:
      position = 50;
      break;
    case 8:
      position = 25;
      break;
    case 9:
      position = 12;
      break;
    case 10:
      position = 0;
      break;
    }

    css = "0px " + position + "px";
    console.log(css);

    //set position of the backround image to fill the status bar based on how many seats are available
    $statusBar.css("background-position", css);

    if(level == 10) {
      $statusText.text("Full");
      $statusText.css("color", "red");
    }
    else {
      $statusText.text("Seating is Available");
      $statusText.css("color", "green");
    }
}

//function to alter the position of the backround image in the status bar based on how many seats are remaining in a section
function getStatusBarLevel(seatsRemaining){
  var statusLevel;
  //6500 seats per section, 650 seats per 10%
  switch (true) {
    case (6500 == statusLevel): //if all seats are available statusbar is empty
      statusLevel = 0;
      break;
    case (6500 >= seatsRemaining && seatsRemaining >= 5850):
      statusLevel = 0;
      break;
    case (5850 > seatsRemaining && seatsRemaining >=5200):
      statusLevel = 1;
      break;
    case (5200 > seatsRemaining && seatsRemaining >= 4550):
      statusLevel = 2;
      break;
    case (4550 > seatsRemaining && seatsRemaining >= 3900):
      statusLevel = 3;
      break;
    case (3900 > seatsRemaining && seatsRemaining >= 3250):
      statusLevel = 4;
      break;
    case (3250 > seatsRemaining && seatsRemaining >= 2600):
      statusLevel = 5;
      break;
    case(2600 > seatsRemaining && seatsRemaining >= 1950):
      statusLevel = 6;
      break;
    case (1950 > seatsRemaining && seatsRemaining >= 1300):
      statusLevel = 7;
      break;
    case(1300 > seatsRemaining && seatsRemaining >= 650):
      statusLevel = 8;
      break;
    case (650 > seatsRemaining && seatsRemaining > 0):
      statusLevel = 9;
      break;
    case (seatsRemaining == 0): //status bar is full
      statusLevel = 10;
      break;
  }
  return statusLevel;
}

//convert time returned from database to a string
function timeConversion(untilGameMilli) {
  var seconds = (untilGameMilli / 1000).toFixed(1);
  var minutes = (untilGameMilli / (1000 * 60)).toFixed(1);
  var hours = (untilGameMilli / (1000 * 60 * 60)).toFixed(1);
  var days = (untilGameMilli / (1000 * 60 * 60 * 24)).toFixed(1);

  if (seconds < 60) {
    return seconds + " Sec";
  }
  else if (minutes < 60) {
    return minutes + " Min";
  }
  else if (hours < 24) {
    return hours + " Hrs";
  }
  else {
    return days + " Days"
  }
}

//Code to create map modal when open map button is clicked
var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");
var btn2 = document.getElementById("myBtn2");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function(){
  modal.style.display = "none";
}

window.onclick = function(event){
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//increment pushup counter when do pushup button is pressed
function doPushup() {
  numPushups++;
  document.getElementById('number').innerHTML = numPushups;
}
