function show_info(per){
     if (per == 'admin'){
          render_admin()
     }
     else if(per == 'servicer'){
          render_servicer()
     }
     else{
          render_user()
     }
}

function delete_smth(alb){
    if (getCheckedList(alb).length!=0){
         url = "http://127.0.0.1:5000/checked_delete_";
         url += alb + "?" + alb +"=";
         url += getCheckedList(alb);
         fetch(url)
         .then(function (response){
              return response.text();
         }).then(function (text){
              console.log(text);
              if(alb == "alb"){
                   show_albums();
              }
              else if(alb == "band"){
                   show_bands();
              }
         });
        }
        else{
             console.log('Empty checkboxes!!');
        }
}

function select_all(){
    checkboxes_checked('user', true);
}

function select_none(){
    checkboxes_checked('user', false);
}

function logout(){
    window.location = "http://127.0.0.1:5000/";
}

function getAllCheckedList(name){
    var checkboxes_us = document.getElementsByName(name);
    list_checked = []
    for (var checkbox of checkboxes_us) {
        list_checked.push(checkbox.value)
    }
    return list_checked
}

function checkboxes_checked(name, ch){
    var checkboxes_us = document.getElementsByName(name);
         for (var checkbox of checkboxes_us) {
              if (ch==false){
                   checkbox.checked = false;
              }
              else{
                   checkbox.checked = true;
              }
         }
}

function getCheckedList(name){
var checkboxes_us = document.getElementsByName(name);
    list_checked = []
    for (var checkbox of checkboxes_us) {
         if (checkbox.checked){
              list_checked.push(checkbox.value)
         }
    }
    return list_checked
}

function save_smth(val, info){
    fetch("http://127.0.0.1:5000/save_" + val +"?" + info)
    .then(function (response){
         return response.text();
    }).then(function (text){
         console.log("http://127.0.0.1:5000/save_" + val +"?" + info)
         document.getElementById("error").innerHTML = text;
    });
}

function add_items_to_menu(){
   console.log("items");
   var html = "";
   html += "<a href=\"index\">Home</a>";
   html += "<a href=\"/library\">Library</a>";
   html += "<a href=\"buy_album\">Basket</a>";
   html += "<a href=\"/\">Logout</a>";
   console.log(html);
   document.getElementById("add_topnav").innerHTML = html;
}

// Converts any given blob into a base64 encoded string.
function convertBlobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}

async function fetchImageAndDisplay(listImg, size, pr, list_lib) {
  try {
    var t;
    for (let n = 0; n < listImg.length; n++){
        const fetchResult = await fetch('http://127.0.0.1:5000/pictures/' + listImg[n].name_album);
        if (pr == "home"){
           t = '<div class = \"test\"><div><img id = \"images\"  src=\"' + await convertBlobToBase64(await fetchResult.blob()) +'   \"height=\"' + size +'\" \"width=\"'+ size +'\"  >';
           t += '</div><div class= \"tes\"><h1>  ' + listImg[n].name_album +'</h1><h2>' + listImg[n].band + '</h2><h2>'+ listImg[n].a_date + '</h2></div>';

           if (list_lib.includes(listImg[n].name_album)){
               t += '<div><a  class = \"buy\"  href=\"library\"' + listImg[n].name_album + '><pre>  In your lib  ' + '</pre></a></div>';
           }
           else{
               t += '<div><a  class = \"buy\"  href=buy_album?name_album=' + listImg[n].name_album + '><pre>  '+ listImg[n].price + "$ Buy  " + '</pre></a></div>';
           }
           t += '</div>';
           document.getElementById("images").insertAdjacentHTML('beforeend', t);
           render_images(listImg);
        }
        else if (pr=="lib"){
           t = '<div class = \"test\"><img id = \"images\"  src=\"' + await convertBlobToBase64(await fetchResult.blob()) +'   \"height=10%\" width=\" 10%\"  >';
           t += '<h3>  ' + listImg[n].name_album +'   //   ' + listImg[n].band + '   //   '+ listImg[n].a_date;
           t += '</h3><a  class = \"buy\"  href= ""' + '><pre>'+ " Play " + '</pre></a>';
           t += '</div>';

           document.getElementById("images").insertAdjacentHTML('beforeend', t);
        }
        else{
           t = '<div class = \"test\"><img id = \"images\"  src=\"' + await convertBlobToBase64(await fetchResult.blob()) +'   \"height=10%\" width=\" 10%\"  >';
           t += '<h4>  ' + listImg[n].name_album +' > ' + listImg[n].band + ' >> '+ listImg[n].a_date + '  >>>  '+ listImg[n].price +'$  ';
           t += '</h4></div>';

           document.getElementById("images").insertAdjacentHTML('beforeend', t);
        }
	}

  } catch (error) {
    console.error(error);
    console.log("heyy");
  }
}

url = "http://127.0.0.1:5000/session_user"
fetch(url)
.then(function (response){
    return response.text();
}).then(function (text){
     console.log(text)
     show_info(text);
});







