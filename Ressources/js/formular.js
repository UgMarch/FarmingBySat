
var map;
var markers = [];
var counter = 0;

// Variables to store in databeses, First and second Step
var name;
var firstname;
var number;
var adress;
var postalCode;
var city;
var mail;
var coordinates = [];

// Variables to store in databeses, Third Step
var pacDone = false;
var pacFile;
var nbh2;
var nbparcelles;
var typeOfSol = [];


// Variables to store in databeses, fourthStep


function hideElements(){
  //document.getElementById('secondStep').style.display = "none";
  document.getElementById('thirdStep').style.display = "none";
  document.getElementById('fourthStep').style.display = "none";
}

function goSecondStep(){

  name = document.getElementById("name").value;
  firstname = document.getElementById("firstname").value;
  number = document.getElementById("phone").value;
  adress = document.getElementById("adress").value;
  postalCode = document.getElementById("postalCode").value;
  city = document.getElementById("city").value;
  mail = document.getElementById("mail").value;

  if(name.length >= 2 && name.length <= 20){
    if(firstname.length >= 2 && firstname.length <= 20){
      if(number.length == 10 && isNaN(number) == false){
        if(adress.length > 3){
          if(postalCode.length == 5 && isNaN(postalCode) == false){
            if(city.length > 0){
              var regmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
              if(regmail.test(mail)){
                document.getElementById('firstStep').style.display = "none";
                document.getElementById('explainImages').style.display = "none";
                document.getElementById('secondStep').style.display = "block";
                document.getElementById('secondStepMap').style.display = "block";
                document.getElementById('secondStepText').style.display = "block";
                initMap();
              }else{
                alert("Champ mail invalide!");
              }
            }else{
              alert("Le champ de Ville n'est pas bien rempli!");
            }
          }else{
            alert("Le code postal n'est pas bien rempli!");
          }
        }else{
          alert("L'adresse n'est pas bien saisie!");
        }
      }else{
        alert("Le numéro n'est pas valide!");
      }
    }else{
      alert("Le prénom est invalide");
    }
  }else{
    alert("Le nom est invalide");
  }
}

function initMap() {
  var lat_lng = {lat: 50.63, lng: 3.06};

  map = new google.maps.Map(document.getElementById('secondStepMap'), {
    zoom: 7,
    center: lat_lng,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

  // This event listener will call addMarker() when the map is clicked.
  map.addListener('click', function(event) {
    if(counter < 2){
      coordinates.push(event.latLng.lat());
      coordinates.push(event.latLng.lng());
      //coordinates.push(event.latLng.long());
      addMarker(event.latLng);
      counter++;
    }
    if(counter >= 2){
      setTimeout(goThirdStep,1000);
      var myDatas = [];

      myDatas.push(name);
      myDatas.push(firstname);
      myDatas.push(number);
      myDatas.push(adress);
      myDatas.push(postalCode);
      myDatas.push(city);
      myDatas.push(mail);
      myDatas.push(coordinates);

      sendUserData(myDatas);
    }
  });
}

// Adds a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}

function goThirdStep(){
    document.getElementById("secondStep").style.display = "none";
    document.getElementById("thirdStep").style.display = "block";

    $('#pac').on('change', function(){
      var files = $(this).get(0).files;
      pacFile = files[0].name;

      if (files.length > 0){
        // create a FormData object which will be sent as the data payload in the
        // AJAX request
        var formData = new FormData();

        // loop through all the selected files and add them to the formData object
        for (var i = 0; i < files.length; i++) {
          var file = files[i];

          // add the files to formData object for the data payload
          formData.append('uploads[]', file, file.name);
        }

        $.ajax({
          url: '/upload',
          type: 'POST',
          data: formData,
          processData: false,
          contentType: false,
          success: function(data){
          },
          xhr: function() {
            // create an XMLHttpRequest
            var xhr = new XMLHttpRequest();

            // listen to the 'progress' event
            xhr.upload.addEventListener('progress', function(evt) {

              if (evt.lengthComputable) {
                pacDone = true;
              }
            }, false);
            return xhr;
          }
        });
      }
    });
}

// Check user's answers for third step before go to the fourth and last step of formular.
function goFourthStep(){

  nbh2 = document.getElementById('nbH2').value;
  nbparcelles = document.getElementById('nbParc').value;
  typeOfSol = [];

  typeOfSol.push(document.getElementById('zoneVulnerableIn').checked);
  typeOfSol.push(document.getElementById('zoneProtegeeIn').checked);
  typeOfSol.push(document.getElementById('natura2000In').checked);

  console.log(pacDone);
  console.log(nbh2);
  console.log(nbparcelles);
  console.log(typeOfSol);
  console.log(pacFile);

  if(pacDone == true){
    if(isNaN(nbh2) == false){
      if(isNaN(nbparcelles) == false){
        document.getElementById('thirdStep').style.display = 'none';
        document.getElementById('fourthStep').style.display = 'block';
        proceedFourthStep();
      }else{
        console.log("Vous n'avez pas renseigné votre nombre de parcelles!");
      }
    }else{
      console.log("Vous n'avez pas renseigné votre nombre d'hectares");
    }
  }else{
    console.log("Vous n'avez pas renseigné votre déclaration PAC!");
  }

}

function proceedFourthStep(){
  console.log('in fourth step');
}
