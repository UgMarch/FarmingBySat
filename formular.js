function secondStep(){
  var name = document.getElementById("name").value;
  var firstname = document.getElementById("firstname").value;
  var number = document.getElementById("phone").value;
  var long2 = document.getElementById("long2").value;
  if (lat != "Latitude1" && long != "Longitude1" && lat2 != "Latitude2" && long2 != "Longitude2"){
    var coord = [];
    coord.push(lat);
    coord.push(long);
    coord.push(lat2);
    coord.push(long2);
    //socket.emit('coordinates', coord);
  } else {
    alert("Vous avez oublié des coordonnées!");
  }
}
