function render_servicer(){
     var url = "http://127.0.0.1:5000/users_logins_per";
     fetch(url)
     .then(function (response){
          return response.text();
     }).then(function (text){
          var list_logins = JSON.parse(text);
          var html = "<div><label><p>ALL USERS<p/></label><div>";
          html += "<ul>";
          for (var i=0; i < list_logins.length; i++) {
               if(list_logins[i].permission == "user"){
                   html += "<li><input type = \"checkbox\" id = \"" + list_logins[i].login +
                   "\" name=\"user\" value = \"" + list_logins[i].login + "\">";
                   html += "<label> " + list_logins[i].login + "</label></li>";
               }
          }
          html += "</ul>";
          html += "<div class = \"button-box\">";
          html += "<div>";
          html += "<input type=\"button\" value=\"Show\" onclick=\"return show_us_alb()\">";
          html += "</div><div>"
          html += "<input type=\"button\" value=\"Refresh\" onclick=\"return refresh_s()\">";
          html += "<input type=\"button\" value=\"Select none\" onclick=\"return select_none()\">";
          html += "<input type=\"button\" value=\"Add album\" onclick=\"return add_album()\">";
          html += "<input type=\"button\" value=\"Show albums\" onclick=\"return show_albums()\">";
          html += "<input type=\"button\" value=\"Delete album\" onclick=\"return delete_album()\">";
          html += "</div><div>"
          html += "<input type=\"button\" value=\"Logout\" onclick=\"return logout()\">";
          html += "<input type=\"button\" value=\"Select all\" onclick=\"return select_all()\">";
          html += "<input type=\"button\" value=\"Add band\" onclick=\"return add_band()\">";
          html += "<input type=\"button\" value=\"Show bands\" onclick=\"return show_bands()\">";
          html += "<input type=\"button\" value=\"Delete band\" onclick=\"return delete_band()\">";
          html += "</div></div>";
          document.getElementById("form").innerHTML = html;
     });
}

function show_us_alb(){
    if (getCheckedList('user').length!=0){
        var li_usrs = getCheckedList('user');
        for(i=0; i<li_usrs.length; i++){
            url = "http://127.0.0.1:5000/library_album_servicer?user=";
            url += li_usrs[i];
            fetch(url)
            .then(function (response){
                  return response.text();
            }).then(function (text){
                  var data = JSON.parse(text);
                  console.log(data);
                  var html = "";

                  html += render_show_alb(data);
                  document.getElementById("show_albums").innerHTML = html;
            });
        }
    }
    else{
        console.log('Empty checkboxes!!');
        document.getElementById("table").innerHTML = '';
    }
}

function add_band(){
    var html = "";
    html += "<div><label><p>ADD BAND<br><br></p></label></div><div><label>Name of band</label></div>";
    html += "<div><input type=\"text\" placeholder=\"Name of band\" id=\"band\" class=\"band\" ></div>";
    html += "<div><input type=\"button\" class=\"add_band\"  value=\"Add\"  onclick=\"return save_band()\"></div>";
    document.getElementById("add").innerHTML = html;
}

function add_album(){
     fetch("http://127.0.0.1:5000/select_bands")
        .then(function (response){
              return response.text();
        }).then(function (text){
              var data = JSON.parse(text);
              var html = render_add_album(data);
              document.getElementById("add").innerHTML = html;
        });
}

function render_add_album(data){
      var html = "";
      html += "<div><label><p>ADD ALBUM<br><br></p></label></div><div><label>Name of album</label></div>";
      html += "<div><input type=\"text\" placeholder=\"Name of album\" id=\"name_album\" ></div>";
      html += "<div><label>Date</label></div>";
      html += "<div><input type=\"text\" placeholder=\"Date\" id=\"date\" ></div>";
      html += "<div><label>Price</label></div>";
      html += "<div><input type=\"text\" placeholder=\"Price\" id=\"price\" ></div>";
      html += "<div><label>Select band</label></div>";
      html += "<div><select id=\"select_band\" class=\"select-band\">";
      for(var i=0; i<data.length; i++){
          html += '<option>' + data[i] +'</option>';
      }
      html += "</select>";
      html += "<div><input type=\"button\" class=\"add_album\"  value=\"Add\"  onclick=\"return save_alb()\"></div>";
     return html;
}

function save_band(){
    var band = document.getElementById("band").value;
    var info = "band=" + band;
    save_smth("band", info);
}

function save_alb(){
    var price = document.getElementById("price").value;
    price = parseInt(price);
    if (isNaN(price) == true){
        document.getElementById("error").innerHTML = "Invalid price. Please enter digit";
    }
    else{
        var selButton = document.getElementById("select");
        var selList = document.getElementById("select_band");
        var collection = selList.selectedOptions;
        var band = "";
        for (let i=0; i<collection.length; i++) {
            band = collection[i].label;
        }
        var name_a = document.getElementById("name_album").value;
        var date = document.getElementById("date").value;
        var price = document.getElementById("price").value;
        var info = "band=" + band + "&&name_album=" + name_a + "&&date=" + date + "&&price=" + price;
        save_smth("alb", info);
    }

}

function show_bands(){
     url = "http://127.0.0.1:5000/select_bands";
     fetch(url)
     .then(function (response){
          return response.text();
     }).then(function (text){
          console.log(text);
          var list_bands = JSON.parse(text);
          var html = "";
          html += "<label>ALL BANDS:</label>";
          html += "<ul>";
          for (var i=0; i < list_bands.length; i++) {
               html += "<li><input type = \"checkbox\" id = \"" + list_bands[i]+
               "\" name=\"band\" value = \"" + list_bands[i] + "\">";
               html += "<label> " + list_bands[i]  + "</label></li>";
          }
          html += "</ul>";
          document.getElementById("show_bands").innerHTML = html;
     });
}

function show_albums(){
     url = "http://127.0.0.1:5000/all_albums";
     fetch(url)
     .then(function (response){
          return response.text();
     }).then(function (text){
          var list_albums = JSON.parse(text);
          document.getElementById("show_albums").innerHTML =  render_show_alb(list_albums);
     });
}

function render_show_alb(list_albums){
      var html = "";
      html += "<div><label><p>ALL  ALBUMS:<br ><br>Name of album / Date / Price / Band</p></label></div>";
      html += "<ul>";
      for (var i=0; i < list_albums.length; i++) {
           html += "<li><input type = \"checkbox\" id = \"" + list_albums[i].name_album+
           "\" name=\"alb\" value = \"" + list_albums[i].name_album + "\">";
           html += "<label> " + list_albums[i].name_album + " / "+
            list_albums[i].a_date + " / " + list_albums[i].price + "$ / "+
             list_albums[i].band + "</label></li>";
      }
      html += "</ul>";
      return html;
}

function delete_album(){
    delete_smth("alb");
}

function delete_band(){
    delete_smth("band");
}

function refresh_s(){
     render_servicer();
     document.getElementById("show_bands").innerHTML = "";
     document.getElementById("show_albums").innerHTML = "";
     document.getElementById("add").innerHTML = "";
     document.getElementById("error").innerHTML = "";
}