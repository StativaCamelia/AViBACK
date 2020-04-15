document.addEventListener("DOMContentLoaded", function initMap() {
  // The location of Uluru
  lati = 39.86;
  lngi = -84.05;
  var uluru = {
    lat: lati,
    lng: lngi,
  };
  var uluru1 = {
    lat: 42.79,
    lng: -84.1,
  };
  // The map, centered at Uluru
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
  });
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
  var marker1 = new google.maps.Marker({
    position: uluru1,
    map: map,
  });
});
