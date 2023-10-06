// calls both api's and creates array for photos and facts
var viewingFavorites = 0
var changeCheck = 0
var catFacts = [];
var catPhotos = [];
var randomObject = []
var myFavorites = [];
var currentArray = []
var ready = 0

function makeObject(){
  ready++
  if(ready === 2){
    for(var i = 0; i < catPhotos.length; i++){
      console.log(i);
      random= {
        photo: catPhotos[i],
        fact: catFacts[i]
      }
    randomObject.push(random);
  }
console.log(randomObject);
currentArray = randomObject;
console.log(currentArray);
  }else{console.log("nope")
return;}
}

var catFactsUrl = "https://meowfacts.herokuapp.com/?count=10";

fetch(catFactsUrl, {
  method: "GET",
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: "same-origin",
  redirect: "follow"
}).then(function (response) {
  return response.json();
}).then(function (data) {
  for (i = 0; i < data.data.length; i++) {
    // console.log(data.data);
    catFacts.unshift(data.data[i]);
    // catF.text(catFacts);
  }
  makeObject()
});

var catPhotosUrl = 'https://api.thecatapi.com/v1/images/search?limit=10'//50&api_key=live_4MxtfIDUxCcvH5y3DoACnMZw1ijvUw7eiz48xvUqelwA97DSk7Cpv1JkE4H64q84')

fetch(catPhotosUrl)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        for (var i = 0; i < data.length; i++) {
          catPhotos.unshift(data[i].url);
          // console.log(catPhotos);
        }
        makeObject()
      });
    }
  });


  
  
//------------------------------------------------------------------------


var index = 0; 
var catF = $("#random-fact");
var image = $('#random-img');


// event listeners and logic for next/previous buttons-----------


function display(){
  console.log(index)
  console.log(currentArray[index].photo);
  console.log(currentArray[index].fact);
  image.attr('src', currentArray[index].photo);
    catF.text(currentArray[index].fact);
}

function changeChecker(){
  console.log(changeCheck)

  if(changeCheck === 1){
    index = 0; 
    changeCheck--;
  }
}


function next() {
  changeChecker();
  console.log('index'+index);
  console.log(currentArray)
  console.log('array index'+currentArray[index]);
  display();
  if (index > currentArray.length-1) {
    index = 0;
  } else { index++;}
  //display();
  return index;
};

function previous() {
  changeChecker();
  console.log(index);
  console.log(currentArray[index]);
  if (index <= 0){
    index = currentArray.length-1; 
  } else {
    index--;
  }
  display();
  console.log("index: ", index);
  return index;
};

$('#previous').on('click', previous);

$("#next").on("click", next);

//----------------------------------------------------------------
// favorites feature 

$("#favorite").on("click", addOrRemoveFav);

function addOrRemoveFav() {
  var currentPhoto = catPhotos[index];
  var currentFact = catFacts[index];
  console.log("fav photo: ", currentPhoto);
  console.log("fav fact: ", currentFact);

// sets photo and fact as a pair in object
  var favoritePair = {
    photo: currentPhoto,
    fact: currentFact
  };

// 
  var isFavorite = false;
  for (var i = 0; i < myFavorites.length; i++) {
    if (myFavorites[i].photo === currentPhoto && myFavorites[i].fact === currentFact) {
      // If it's already in myFavorites, remove it
      myFavorites.splice(i, 1);
      alert("removed from favorites")
      isFavorite = true;
      break;
    }
  }

  // If it's not in myFavorites, add it
  if (!isFavorite) {
    myFavorites.push(favoritePair);
    alert("added to favorites!")
  }

  // Store myFavorites in localStorage
  localStorage.setItem("myFavorites", JSON.stringify(myFavorites));
}

// ...

var viewFav = $("#view-favorites");




$(viewFav).on("click", function () {

  // Retrieve myFavorites from localStorage
  var favorites = JSON.parse(localStorage.getItem("myFavorites")) || [];
  console.log("My Favorites:", favorites);

  if(viewingFavorites === 0){viewingFavorites++}
  else{viewingFavorites--}
  changeCheck++

  console.log(viewFav.text());

  if (currentArray === myFavorites) {
    viewFav.text("back to random");
    currentArray = randomObject
  } else if (currentArray === randomObject) {
    viewFav.text("View Favorites")
    currentArray = myFavorites
  }
})