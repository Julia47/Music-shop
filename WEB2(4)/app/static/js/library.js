function show_albums(){
     url = "http://127.0.0.1:5000/library_album";
     fetch(url)
     .then(function (response){
          return response.text();
     }).then(function (text){
          console.log(text);
          var list_albums = JSON.parse(text);
          console.log(list_albums);

          open_images(list_albums);

     });
}

function open_images(list_a){
     fetchImageAndDisplay(list_a, '80px', 'lib');
}


add_items_to_menu();
show_albums();