var url='https://cdn2.thecatapi.com/images/FCNqMC83P.jpg'

fetch(url)
    .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to GitHub');
      });



      $(document).ready(function () {
        //dummy variables would need the right id for container
        var catFacts = $("#random-fact");
    //-------------------------------------
        var requestUrl = "https://meowfacts.herokuapp.com/";
        //Needs ID for button below
        $("#next").on("click", function () {
    //-------------------------------------------------------
            retrieveCatFacts();
        });

        function retrieveCatFacts() {
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
                console.log(data);
                var catFactListed = data.data[0];
                catFacts.text(catFactListed);
            });
        }
    });

/*Adding button favorite*/
//---------------------------------------------------
// <button id="favorites-btn">View Favorites</button>

$("favorites-btn").on("click", function {
  
});

