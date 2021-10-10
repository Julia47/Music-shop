
function login(){

     url = "http://127.0.0.1:5000/js_login?"
     url += "login=" + document.getElementById("login").value + "&&"
     url += "password=" + document.getElementById("password").value

     fetch(url)
     .then(function (response){
          return response.text();
     }).then(function (text){
          document.getElementById("demo").innerHTML = text;
          if(text=="false"){
               document.getElementById("error").innerHTML = "Error!! Invalid input!!";
          }
          else{
               document.getElementById("error").innerHTML = "";
               window.location = "http://127.0.0.1:5000/index?login=" + document.getElementById("login").value;
          }
     });

}