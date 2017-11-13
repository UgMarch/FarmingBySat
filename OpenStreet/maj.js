//AIzaSyBphFwFMQnEQcsOasv6vqb0zCBwi0mwzZc
function initialize() {
  var myLatlng = new google.maps.LatLng(40.713956, -74.006653);

  var myOptions = {
    zoom: 8,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

  var marker = new google.maps.Marker({
    draggable: true,
    position: myLatlng,
    map: map,
    title: "Your location"
  });

  google.maps.event.addListener(marker, 'dragend', function(event) {
    document.getElementById("lat").value = event.latLng.lat();
    document.getElementById("long").value = event.latLng.lng();
  });

  google.maps.event.addListener(map, 'click', function(event) {
    document.getElementById("lat").value = event.latLng.lat();
    document.getElementById("long").value = event.latLng.lng();
    marker.setPosition(event.latLng);
  });
}
google.maps.event.addDomListener(window, "load", initialize());
