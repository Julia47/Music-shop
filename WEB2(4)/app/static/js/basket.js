function show_albums(){
     url = "http://127.0.0.1:5000/basket_album";
     fetch(url)
     .then(function (response){
          return response.text();
     }).then(function (text){
          console.log(text);
          var list_albums = JSON.parse(text);
          console.log(list_albums);
          document.getElementById("buy").innerHTML = "";
          open_images(list_albums, '80px', 'basket' );
          var html = "";
          html += "<div><input type=\"button\" class=\"add_album\"  value=\"Clean Basket\"  onclick=\"return clean_basket()\">";
          html += "<input type=\"button\" class=\"add_album\"  value=\"Buy more\"  onclick=\"return buy_more()\">";
          html += "<input type=\"button\" class=\"add_album\"  value=\"Buy albums\"  onclick=\"return buy_albums()\"</div>";

          document.getElementById("show_albums").innerHTML = html;
     });
}

function buy_albums(){
     url = "http://127.0.0.1:5000/save_buy_basket?basket=";
     url += getAllCheckedList('alb');
     fetch(url)
     .then(function (response){
          return response.text();
     }).then(function (text){
          console.log(text)
          document.getElementById("buy").innerHTML = text;
          refresh_bask();
          clean_basket();
     });
}

function logout(){
    clean_basket();
    window.location = "http://127.0.0.1:5000/";
}

function buy_more(){
    fetch("http://127.0.0.1:5000/session_user_login")
         .then(function (response){
              return response.text();
         }).then(function (text){
              console.log(text);
              window.location = "http://127.0.0.1:5000/index?login=" + text;
         });
}

function clean_basket(){
    fetch("http://127.0.0.1:5000/empty_basket")
         .then(function (response){
              return response.text();
         }).then(function (text){
              console.log(text);
              refresh_bask();
              show_albums();
         });
}

function refresh_bask(){
     document.getElementById("images").innerHTML = "";
     document.getElementById("show_albums").innerHTML = "";
     document.getElementById("error").innerHTML = "";
}

function open_images(list_a){
     fetchImageAndDisplay(list_a, '180px');
}

show_albums();
add_items_to_menu();