//$("img.statusBar").animate( { 'backgroundPosition':'0' }, 10000);
var north;
var south;
var total;
var currentSection;
MySql.Execute(
    "dmazzola.com",
    "thelocalhosts",
    "theloc8159",
    "test_db_thelocalhosts",
    "select * from GameData where gameDate >= CURDATE()",
    function (queryReturned) {
        var obj = JSON.stringify(queryReturned.Result, null, 2);
        obj = JSON.parse(obj);

        document.getElementById("awayTeam").innerHTML = obj[0].awayTeam;
        document.getElementById("homeImage").src = obj[0].homeImage;
        document.getElementById("awayImage").src = obj[0].awayImage;

        currentSection = obj[0].currentSection
        document.getElementById("currentSection").innerHTML = currentSection;

        north = obj[0].northSeatsLeft;
        document.getElementById('northSeats').innerHTML = north;
        south = obj[0].southSeatsLeft;
        document.getElementById('southSeats').innerHTML = south;
        total = north + south;
        document.getElementById("total").innerHTML = total;

        document.getElementById("waitTime").innerHTML = obj[0].waitTime;

        //var kickoffTime = obj[0].kickoffTime;
        //console.log(kickoffTime);

        //var n = kickoffTime.lastIndexOf('T');
        //kickoffTime = kickoffTime.substring(n + 1);
        //console.log(kickoffTime);
        //document.getElementById("totalTime").innerHTML = kickoffTime;

        //code for calculating kickoffTime
            var kickoffTime = obj[0].kickoffTime;
            var kickoffMilli = Date.parse(kickoffTime);

            var currentDate = new Date();
            var currentMilli = currentDate.getTime();

            var untilGameMilliString = kickoffMilli - currentMilli;
            var untilGameMilli = parseInt(untilGameMilliString);

            function timeConversion(untilGameMilli) {
              var seconds = (untilGameMilli / 1000).toFixed(1);

              var minutes = (untilGameMilli / (1000 * 60)).toFixed(1);

              var hours = (untilGameMilli / (1000 * 60 * 60)).toFixed(1);

              var days = (untilGameMilli / (1000 * 60 * 60 * 24)).toFixed(1);

              if (seconds < 60) {
                  return seconds + " Sec";
              } else if (minutes < 60) {
                  return minutes + " Min";
              } else if (hours < 24) {
                  return hours + " Hrs";
              } else {
                  return days + " Days"
              }
          }

          document.getElementById("timeUntilKickoff").innerHTML = timeConversion(untilGameMilli);

        setStatusBar(getStatusBarLevel(north), "north");
        setStatusBar(getStatusBarLevel(south), "south");
});

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

window.setInterval(function(){



  if(currentSection < 24){
    currentSection = parseInt(currentSection);
    currentSection += 1;
    document.getElementById("currentSection").innerHTML = currentSection;
  }



}, 30000);

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

function getStatusBarLevel(seatsRemaining){
  var statusLevel;
  //6500 seats per section, 650 seats per 10%
  switch (true) {
    //if all seats are available statusbar is empty
    case (6500 == statusLevel):
      statusLevel = 0;
      break;
    case (6500 > seatsRemaining && seatsRemaining >= 5850):
      statusLevel = 1;
      break;
    case (5850 > seatsRemaining && seatsRemaining >=5200):
      statusLevel = 2;
      break;
    case (5200 > seatsRemaining && seatsRemaining >= 4550):
      statusLevel = 3;
      break;
    case (4550 > seatsRemaining && seatsRemaining >= 3900):
      statusLevel = 4;
      break;
    case (3900 > seatsRemaining && seatsRemaining >= 3250):
      statusLevel = 5;
      break;
    case (3250 > seatsRemaining && seatsRemaining >= 2600):
      statusLevel = 6;
      break;
    case(2600 > seatsRemaining && seatsRemaining >= 1950):
      statusLevel = 7;
      break;
    case (1950 > seatsRemaining && seatsRemaining >= 1300):
      statusLevel = 8;
      break;
    case(1300 > seatsRemaining && seatsRemaining > 0):
      statusLevel = 9;
      break;
    case (seatsRemaining == 0):
      statusLevel = 10;
      break;
  }

  return statusLevel;
}
