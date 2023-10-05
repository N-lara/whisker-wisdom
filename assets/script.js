// calls both api's and creates array for photos and facts

var catFacts = [];
var catPhotos = [];

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
      });
    }
  });

//------------------------------------------------------------------------


var index = 0; 
var catF = $("#random-fact");
var image = $('#random-img');


// event listeners and logic for next/previous buttons-----------

$('#previous').on('click', previous);

$("#next").on("click", next);


function next() {
  console.log(index);
  console.log(catPhotos[index]);
  if (index === catPhotos.length-1) {
    index = 0;
  } else { index++; }
  image.attr('src', catPhotos[index]);
  catF.text(catFacts[index]);
};

function previous() {
  console.log(index);
  console.log(catPhotos[index]);
  if (index === 0) {
    index = catPhotos.length; 
  } else {
    index--;
  }
  image.attr('src', catPhotos[index]);
  catF.text(catFacts[index]);

  console.log("index: ", index)

  return index;
};

//----------------------------------------------------------------
// favorites feature 

var myFavorites = [];

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

$("#view-favorites").on("click", function () {
  // Retrieve myFavorites from localStorage
  var favorites = JSON.parse(localStorage.getItem("myFavorites")) || [];
  console.log("My Favorites:", favorites);
});

