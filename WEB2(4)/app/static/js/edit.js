function edit_user(login_user){
    fetch("http://127.0.0.1:5000/edit_user?" + get_info())
    .then(function (response){
         return response.text();
    }).then(function (text){
          console.log(text);
          if (text == "Data saved"){
              window.location = "http://127.0.0.1:5000/index?login=" + login_user;
          }
          else{
              document.getElementById("error").innerHTML = text;
          }
    });
}

function create_user(login_user){
    fetch("http://127.0.0.1:5000/create_user?" + get_info())
    .then(function (response){
         return response.text();
    }).then(function (text){
         console.log(login_user);
         if (text == "Data saved"){
              window.location = "http://127.0.0.1:5000/index?login=" + login_user;
         }
         else{
              document.getElementById("error").innerHTML = text;
         }
    });
}

function get_info(){
    var selList = document.getElementById("select_per");
        var collection = selList.selectedOptions;
        var permission = "";
        for (let i=0; i<collection.length; i++) {
            permission = collection[i].label;
        }
    nickname = document.getElementById("nickname").value;
    firstname = document.getElementById("firstname").value;
    lastname = document.getElementById("lastname").value;
    age = document.getElementById("age").value;
    login = document.getElementById("login").value;
    password = document.getElementById("password").value;
    var url = "nickname="+nickname+"&&firstname="+firstname+"&&lastname=" +lastname+ "&&permission=" + permission+
    "&&age=" + age + "&&login=" + login + "&&password=" + password
    return url
}

function save(){
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const user = urlParams.get('user');
    fetch("http://127.0.0.1:5000/session_user_login?" + get_info())
    .then(function (response){
         return response.text();
    }).then(function (text){
         console.log(text);
         if (user=='create'){
              create_user(text);
         }
         else{
              edit_user(text);
         }
    });
}


