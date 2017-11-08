function goSecondStep(){

  var name = document.getElementById("name").value;
  var firstname = document.getElementById("firstname").value;
  var number = document.getElementById("phone").value;
  var adress = document.getElementById("adress").value;
  var postalCode = document.getElementById("postalCode").value;
  var city = document.getElementById("city").value;
  var mail = document.getElementById("mail").value;

  if(name.length >= 2 && name.length <= 20){
    if(firstname.length >= 2 && firstname.length <= 20){
      if(number.length == 10 && isNaN(number) == false){
        if(adress.length > 3){
          if(postalCode.length == 5 && isNaN(postalCode) == false){
            if(city.length > 0){
              var regmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
              if(regmail.test(mail)){
                console.log(name+firstname+number+adress+postalCode+city);
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

  /*if (lat != "Latitude1" && long != "Longitude1" && lat2 != "Latitude2" && long2 != "Longitude2"){
    var coord = [];
    coord.push(lat);
    coord.push(long);
    coord.push(lat2);
    coord.push(long2);
    //socket.emit('coordinates', coord);
  } else {
    alert("Vous avez oublié des coordonnées!");
  }*/
}
