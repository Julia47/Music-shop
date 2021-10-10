
function render_admin(){
     url = "http://127.0.0.1:5000/users_logins";
     fetch(url)
     .then(function (response){
          return response.text();
     }).then(function (text){
          var list_logins = JSON.parse(text);
          var html = "<div><label><p>ALL USERS<p/></label><div>";
          html += "<ul>";

          for (var i=0; i < list_logins.length; i++) {
               html += "<li><input type = \"checkbox\" id = \"" + list_logins[i] +
               "\" name=\"user\" value = \"" + list_logins[i] + "\">";
               html += '<a href=edit?user=' + list_logins[i] + '>' + "  Edit  " + "</a>";
               html += "<label>" + list_logins[i] + "</label></li>";
          }
          html += "</ul>";
          html += "<div class = \"button-box\">";
          html += "<div>"
          html += "<input type=\"button\" value=\"Select none\" onclick=\"return select_none()\">";
          html += "<input type=\"button\" value=\"Refresh\" onclick=\"return refresh_a()\">";
          html += "<input type=\"button\" value=\"Logout\" onclick=\"return logout()\">";
          html += "</div><div>"
          html += "<input type=\"button\" value=\"Select all\" onclick=\"return select_all()\">";
          html += "<input type=\"button\" value=\"Delete\" onclick=\"return delete_us()\">";
          html += "<input type=\"button\" value=\"Create\" onclick=\"return create()\">";
          html += "</div></div>";
          document.getElementById("form").innerHTML = html;
          render_table()
     });
}

function generate_table(data, list_col){
    var html = "<table border=\"1\" cellpadding=\"4\" bordercolor=\"#5D4157\">";
    html += "<tr>"
    for (var i=0; i<list_col.length; i++) {
       html += "<td>" + list_col[i] +"</td>";
    }
    html += "</tr>"
    for (var i=0; i<data.length; i++){
        html += "<tr>"
        for(var j=0; j<list_col.length; j++){
          html += "<td>" + data[i][list_col[j]] + "</td>"
        }
        html += "</tr>"
    }function show(){
    if (getCheckedList('user').length!=0&&getCheckedList('col').length!=0){
        url = "http://127.0.0.1:5000/checked_users?users=";
        url += getCheckedList('user');
        url += "&&col=";
        url += getCheckedList('col');
        fetch(url)
        .then(function (response){
              return response.text();
        }).then(function (text){
              console.log(text);
              var data = JSON.parse(text);
              generate_table(data, getCheckedList('col'));
        });
    }
    else{
        console.log('Empty checkboxes!!');
        document.getElementById("table").innerHTML = '';
    }
}
    html += "</table>"
    document.getElementById("table").innerHTML = html;
}

function render_table(){
    var list_value = [];
    list_value.push("login");
    list_value.push("password");
    list_value.push("nickname");
    list_value.push("firstname");
    list_value.push("lastname");
    list_value.push("permission");
    list_value.push("age");
    list_value.push("id_user");
    var h = "<div><label><p>DATA<p/></label><div>";
    h += "<ul>"
    for (var i=0; i<list_value.length; i++){
        h += "<li>"
        h += "<input type = \"checkbox\" id = \"" + list_value[i] + "\" name=\"col\" value = \"" + list_value[i] + "\">";
        h += "<label> "+list_value[i]+"</label>"
        h += "</li>"
    }
    h += "</ul>"
    h += "<input type=\"button\" value=\"Show\" onclick=\"return show()\">";
    document.getElementById("choose_table").innerHTML = h;
}

function create(){
    window.location = "http://127.0.0.1:5000/edit?user=create";
}

function refresh_a(){
    render_admin();
}

function delete_us(){
    delete_smth("user");
    refresh_a();
}


function show(){
    if (getCheckedList('user').length!=0&&getCheckedList('col').length!=0){
        url = "http://127.0.0.1:5000/checked_users?users=";
        url += getCheckedList('user');
        url += "&&col=";
        url += getCheckedList('col');
        fetch(url)
        .then(function (response){
              return response.text();
        }).then(function (text){
              console.log(text);
              var data = JSON.parse(text);
              generate_table(data, getCheckedList('col'));
        });
    }
    else{
        console.log('Empty checkboxes!!');
        document.getElementById("table").innerHTML = '';
    }
}