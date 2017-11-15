
var map;
var markers = [];
var counter = 0;

// Variables to store in databeses
var name;
var firstname;
var number;
var adress;
var postalCode;
var city;
var mail;
var coordinates = [];

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
      setTimeout(goFourthStep,1000);
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

function goFourthStep(){
    document.getElementById("secondStep").style.display = "none";
    document.getElementById("thirdStep").style.display = "block";

    $('#pac').on('change', function(){

      console.log('test');
      var files = $(this).get(0).files;

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
              console.log('upload successful!\n' + data);
          },
          xhr: function() {
            // create an XMLHttpRequest
            var xhr = new XMLHttpRequest();

            // listen to the 'progress' event
            xhr.upload.addEventListener('progress', function(evt) {

              if (evt.lengthComputable) {
                /*// calculate the percentage of upload completed
                var percentComplete = evt.loaded / evt.total;
                percentComplete = parseInt(percentComplete * 100);

                // update the Bootstrap progress bar with the new percentage
                $('.progress-bar').text(percentComplete + '%');
                $('.progress-bar').width(percentComplete + '%');

                // once the upload reaches 100%, set the progress bar text to done
                if (percentComplete === 100) {
                  $('.progress-bar').html('Done');
                }*/
                console.log("done");
              }
            }, false);
            return xhr;
          }
        });
      }
    });


    /*document.querySelector("#pac").addEventListener('change', function() {
      console.log(this.files[0].name);
    });*/

    /*var fileInput = document.querySelector('#pac'),
    progress = document.querySelector('#progress');
    fileInput.addEventListener('change', function() {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'index.html');
      xhr.upload.addEventListener('progress', function(e) {
          progress.value = e.loaded;
          progress.max = e.total;
      });
      xhr.addEventListener('load', function() {
          alert('Upload terminé !');
      });
      var form = new FormData();
      form.append('file', fileInput.files[0]);
      xhr.send(form);
      //downloadFile(fileInput.files[0]);
    });*/
}

// Adds a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}

function downloadFile(url, success) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = "blob";
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (success) success(xhr.response);
        }
    };
    xhr.send(null);
}
