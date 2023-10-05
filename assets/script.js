//TODO add arrray to function to change with carousel
var catPhotos = []
var randomNum = Math.floor(Math.random()*100);
fetch('https://api.thecatapi.com/v1/images/search?limit=10')//50&api_key=live_4MxtfIDUxCcvH5y3DoACnMZw1ijvUw7eiz48xvUqelwA97DSk7Cpv1JkE4H64q84')
.then(function (response) {
    if (response.ok) {  
        response.json().then(function (data){
        console.log('Photos:');
        console.log(data);
        for(var i = 0; i < data.length; i++){
        console.log(data[i].url);
        catPhotos.unshift(data[i].url);
        console.log(catPhotos);
        }
        });
    }
})

var photoNum = 0;
var image = $('#random-img'); 
function photoNext(){
    console.log(photoNum);
    console.log(catPhotos[photoNum]);
    if(photoNum === catPhotos.length){photoNum = 0;}
    else{photoNum++;}
    image.attr('src', catPhotos[photoNum]);
    catF.text(catFacts[photoNum]);
}
function photoPrevious(){
    console.log(photoNum);
    console.log(catPhotos[photoNum]);
    if(photoNum === 0){photoNum = catPhotos.length;}
    else{photoNum--;}
    image.attr('src', catPhotos[photoNum]);
    catF.text(catFacts[photoNum]);
}

      $('#previous').on('click', function(){
        photoPrevious();
      });      

      $("#next").on("click", function (){
        photoNext();
      });
    //     function retrieveCatFacts() {
    //         fetch(requestUrl, {
    //             method: "GET",
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             credentials: "same-origin",
    //             redirect: "follow"
    //         }).then(function (response) {
    //             return response.json();
    //         }).then(function (data) {
    //             console.log(data);
    //             var catFactListed = data.data[0];
    //             catFacts.text(catFactListed);
    //         });
    //     }
    // });

/*Adding button favorite*/
//---------------------------------------------------
// <button id="favorites-btn">View Favorites</button>
//This favorite button 
$("#favorites-btn").on("click", function () {
  var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  //favorites.push("Array being pushed");
  localStorage.clear();//prevents duplication
  localStorage.setItem("favorites", JSON.stringify(favorites));
    });

/*var catPhotos = []
var randomNum = Math.floor(Math.random()*100);
fetch('https://api.thecatapi.com/v1/images/search?limit=10')//50&api_key=live_4MxtfIDUxCcvH5y3DoACnMZw1ijvUw7eiz48xvUqelwA97DSk7Cpv1JkE4H64q84')
.then(function (response) {
    if (response.ok) {
        response.json().then(function (data){
        console.log('Photos:');
        console.log(data);
        for(var i = 0; i < data.length; i++){
        console.log(data[i].url);
        catPhotos.unshift(data[i].url);
        console.log(catPhotos);
        }
      })
    }
}) */

  //dummy variables would need the right id for container
  var catF = $("#random-fact");
//-------------------------------------
  var catFacts = [];
  var requestUrl = "https://meowfacts.herokuapp.com/?count=10";

      fetch(requestUrl, {
          method: "GET",
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: "same-origin",
          redirect: "follow"
      }).then(function (response) {
          return response.json();
      }).then(function (data) {
        for (i = 0; i < data.data.length; i++){
          console.log(data.data);
          catFacts.unshift(data.data[i]);
         // catF.text(catFacts);
      }
      });