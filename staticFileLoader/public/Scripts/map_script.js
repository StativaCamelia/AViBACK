function initMap() {
  var map = document.getElementById("map");
  lati = parseInt(map.getAttribute("latitude"));
  lngi = parseInt(map.getAttribute("longitude"));
  var uluru = {
    lat: lati,
    lng: lngi,
  };
  var uluru1 = {
    lat: 42.79,
    lng: -84.1,
  };

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: uluru,
  });
}
document.addEventListener("load", function () {
  initMap();
});
