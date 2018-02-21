'use strict';

var googleApiKey = 'AIzaSyCyV5ZfoHyA96P_X6AxGoovmXuWg8jl2zo';

function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

function getCoordinates() {
  var output = document.getElementById('out');

  if (!navigator.geolocation){
    output.innerHTML = '<p>Geolocation is not supported by your browser</p>';
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude,
        longitude = position.coords.longitude,
        altitude = position.coords.altitude,
        accuracy = position.coords.accuracy;

    var coords = 'Latitude: ' + latitude + '\n'
               + 'Longitude: ' + longitude + '\n'
               + 'Altitude: ' + altitude + '\n'
               + 'Accuracy: ' + accuracy;

    output.innerHTML = ''
                     + '<pre>My current coorindates<br/><br/>Latitude: &#9;' + precisionRound(latitude, 10) + '<br/>'
                     + 'Longitude: &#9;' + precisionRound(longitude, 10) + '<br/>'
                     + 'Altitude: &#9;' + precisionRound(altitude, 10) + '<br/>'
                     + 'Accuracy: &#9;' + accuracy + '</pre>'
                     + '<a href="mailto:?Subject=My%20coordinates&body=' + encodeURIComponent(coords) + '">Send this in email</a>';

    var img = new Image();
    img.src = 'https://maps.googleapis.com/maps/api/staticmap?size=335x300&center=' + latitude + ',' + longitude + '&markers=color:red%7C' + latitude + ',' + longitude + '&zoom=15&size=300x300&style=feature:water|element:geometry.fill|lightness:100&sensor=false&key=' + googleApiKey;
    output.appendChild(img);
  }

  function error() {
    output.innerHTML = 'Unable to retrieve your location';
  }

  output.innerHTML = '<p>Locating…</p>';

  navigator.geolocation.getCurrentPosition(success, error);
}

document.addEventListener('DOMContentLoaded', function(event) {
    getCoordinates();
});
