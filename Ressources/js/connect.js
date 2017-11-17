var socket = io.connect('http://localhost:8080');

socket.on('message', function(message) {
  alert('Le serveur a un message pour vous : '+message);
});

$('#poke').click(function () {
  socket.emit('message', 'Salut Serveur, ça va?');
});

function sendUserData(myDatas){
  socket.emit('message', myDatas);
}

function sendUserDataParc(myDatas){
  socket.emit('messageParcelle', myDatas);
}

function extract() {
  socket.emit('extractFile', "Copernicus sends us some datas");
}

function sendData() {

  var lat = document.getElementById("lat").value;
  var long = document.getElementById("long").value;
  var lat2 = document.getElementById("lat2").value;
  var long2 = document.getElementById("long2").value;
  if (lat != "Latitude1" && long != "Longitude1" && lat2 != "Latitude2" && long2 != "Longitude2"){
    var coord = [];
    coord.push(lat);
    coord.push(long);
    coord.push(lat2);
    coord.push(long2);
    socket.emit('coordinates', coord);
  } else {
    alert("Vous avez oublié des coordonnées!");
  }

}

function deleteData() {
  socket.emit('deleteData', "Asked me to delete raws!");
}

function executeJ() {
  socket.emit('execJava', 'Lets convert those images!');
}

function convertJP2() {
  socket.emit('findImagesName', 'Me too!');
}
