
function render_user(){
     var url = "http://127.0.0.1:5000/all_albums";
     fetch(url)
     .then(function (response){
          return response.text();
     }).then(function (text){
          var list_albums = JSON.parse(text);
          add_items_to_menu();
          open_images(list_albums);
     });
}

function open_images(list_a){
     var url = "http://127.0.0.1:5000/library_album";
     fetch(url)
     .then(function (response){
          return response.text();
     }).then(function (text){
          var list_lib = JSON.parse(text);
          var list_l = name_from_list(list_lib);
          fetchImageAndDisplay(list_a, '180px', 'home', list_l);

     });
}

function name_from_list(list){
    var list_name = [];
    for(i=0; i<list.length; i++){
       list_name.push(list[i].name_album)
    }
    return list_name;
}

function render_images(listImg){
    var modal = document.getElementById('myModal');
    modal.style.padding = '8%';
    modal.style.display = 'none';
    modal.style.position =  'fixed';
    modal.style.zIndex =  '1';
    modal.style.top =  '0';
    modal.style.left =  '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.margin = '0%';
    modal.style.overflow = ' auto';
    modal.style.backgroundColor = 'rgb(0,0,0)';
    modal.style.backgroundColor = 'rgba(0,0,0,0.7)';

    var elements = document.getElementsByTagName('img');

    for(var i = 0; i < elements.length; i++){
        elements[i].addEventListener("click", function() {
        console.log(elements[i]);
        var t;
        t = '<img id = \"image\" onclick=\"closeImage()\" src=\"' +  listImg +'\"height=\"700px\" width=\"700px\">';
        document.getElementById("addImg").innerHTML = t;
        modal.style.display = "block";
    });
    }
}

var modal = document.getElementById('myModal');

function closeImage(){
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
}

function delete_us(){
    delete_smth("user");
}

function refresh_u(){
     render_user();
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}