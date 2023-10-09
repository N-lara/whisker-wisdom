// global scope variables to be used throughout code--------------------
var viewingFavorites = 0;
var catFacts = [];
var catPhotos = [];
var randomObject = [];
var myFavorites = JSON.parse(localStorage.getItem("myFavorites")) || [];
var currentArray = [];
var ready = 0;
var index = 0; 
var catF = $("#random-fact");
var image = $('#random-img');

// fetching both api for and pushing object pair into an array-----------

var catFactsUrl = "https://meowfacts.herokuapp.com/?count=50";

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
  for (i = 0; i < data.data.length; i++) { // looping through all of the facts provided by the api and setting them 
    catFacts.unshift(data.data[i]);        // into an array called catFacts
  }
  makeObject();
});

var catPhotosUrl = 'https://api.thecatapi.com/v1/images/search?limit=50&api_key=live_4MxtfIDUxCcvH5y3DoACnMZw1ijvUw7eiz48xvUqelwA97DSk7Cpv1JkE4H64q84'

fetch(catPhotosUrl)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        for (var i = 0; i < data.length; i++) { // looping through all of the photos provided by the api 
          catPhotos.unshift(data[i].url);       // and setting them into an array called catPhotos
        }
        makeObject();
      });
    }
  });


  
  
//function that creates the array of both facts and photos------------------

function makeObject(){
  ready++;
  if(ready === 2){ // checks to see if both fetches have loaded
    for(var i = 0; i < catPhotos.length; i++){ 
      // console.log(i);
      random = { // random object of fact and photo pairs at the current index of each array
        photo: catPhotos[i],
        fact: catFacts[i]
      }
    randomObject.push(random); // pushes the object into array ironically called randomObject
  }
console.log(randomObject);
currentArray = randomObject;
console.log(currentArray);
  }else{console.log("1 of 2 loaded")
return;}
}


// event listeners and logic for next/previous buttons-----------

$('#previous').on('click', previous);

$("#next").on("click", next);

function next() {
  console.log('index'+index);
  console.log(currentArray);
  console.log('array index'+currentArray[index]);
  if (index >= currentArray.length-1) { // sets the index to zero to start over if user is at the end of the array
    index = 0;
  } else { index++;} // otherwise keep going through the index
  display();
};

function previous() {
  console.log(index);
  console.log(currentArray[index]);
  if (index <= 0){ // sets the index to the last in array to go to the end if user goes past the first index
    index = currentArray.length-1; 
  } else {
    index--; // otherwise keep going back 1 
  }
  display();
  console.log("index: ", index);
};



//function that displays fact and photo from current array-----------------------------

function display(){
  console.log('display index:' + index)
  // console.log(currentArray[index].photo);
  console.log(currentArray[index].fact);
  image.attr('src', currentArray[index].photo); // sets the html image element url to the current index url
  catF.text(currentArray[index].fact);// sets the html fact to the current index fact text
}


// favorites button feature ---------------------------

$("#favorite").on("click", addOrRemoveFav); 

var modal = $(".modal");
var modalContent = $("#modalContent");

function addOrRemoveFav() {
  var currentPhoto = currentArray[index].photo;
  var currentFact = currentArray[index].fact;
  console.log("fav photo: ", currentPhoto);
  console.log("fav fact: ", currentFact);

// sets photo and fact as a pair in object
  var favoritePair = {
    photo: currentPhoto,
    fact: currentFact
  };

 //Modal handles
// $(".modal-background")

//goes through array of favorites and checks to see if 
  var isFavorite = false;
  for (var i = 0; i < myFavorites.length; i++) {
    if (myFavorites[i].photo === currentPhoto && myFavorites[i].fact === currentFact) {
      // If it's already in myFavorites, remove it
      myFavorites.splice(i, 1);
      console.log("testing");
      console.log("viewing favorites", viewingFavorites);
      //modal to inform user the slide was unliked
      modal.addClass("is-active");
      modalContent.text("Removed from favorites 💔");
      $(".modal-background").on("click", function () {
        modal.removeClass("is-active");
      });
      isFavorite = true;

      if(viewingFavorites === 1){
        console.log("viewing favorites", viewingFavorites)
          console.log(currentArray.length)
          if(currentArray.length===0){
            //modal to tell the user there is no more favorite slides left
            modal.addClass("is-active");
            modalContent.text("You have no more favorites... returning to random.");
            $(".modal-background").on("click", function () {
            modal.removeClass("is-active");
            });
            viewFav.text("View Favorites");
            viewingFavorites--;
            index = 0;
            currentArray = randomObject;
            }else{
            currentArray = myFavorites;
            if(index !== 0){index--;}
            }   
           display(); 
      }
        break;
    }else{isFavorite = false;}
  }
 
  // If it's not in myFavorites, add it
  if (!isFavorite) {
    myFavorites.push(favoritePair);
       // ALERT MODAL
      modal.addClass("is-active");
      modalContent.text("Added to favorites! 💕");
      $(".modal-background").on("click", function () {
        modal.removeClass("is-active");
      });
  }

  // Store myFavorites in localStorage
  localStorage.setItem("myFavorites", JSON.stringify(myFavorites));
}

// ---------------------------------------------------------------------

var viewFav = $("#view-favorites");


$(viewFav).on("click", function () {

  // Retrieve myFavorites from localStorage
  console.log("My Favorites:", myFavorites);

  if(viewingFavorites === 0){
    viewingFavorites++;
  }else{
    viewingFavorites--;
  }

  console.log('button text' +viewFav.text());

  if (currentArray === myFavorites) {
    viewFav.text("View Favorites");
    currentArray = randomObject;
  } else if (currentArray === randomObject) {
      if (myFavorites.length===0){
        modal.addClass("is-active");
        modalContent.text("you haven't added anything to favorites!");
        $(".modal-background").on("click", function() {
          modal.removeClass("is-active");
        });
        currentArray=randomObject;
        viewFav.text("View Favorites");
      } else {
        viewFav.text("back to random")
        currentArray = myFavorites;
      
      index = 0;
      }

  }
  display();
});
