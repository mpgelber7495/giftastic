var searchParam = "matthew McConoughey";
var apiResponse;
var actors = createOriginalActorsArray();

function addButtons() {
  if (localStorage.getItem("localStorageActors")) {
    var actorsArr = JSON.parse(localStorage.getItem("localStorageActors"));
  } else {
    var actorsArr = createOriginalActorsArray();
  }
  var buttonHolder = $(".button-holder");
  buttonHolder.html("");
  for (var i = 0; i < actorsArr.length; i++) {
    var button = $("<button>");
    button.attr("value", actorsArr[i]);
    button.addClass("actor-button");
    button.addClass("mx-2");
    button.addClass("my-2");
    button.text(actorsArr[i]);
    buttonHolder.append(button);
  }
  listenForClicks();
}
addButtons();

function listenForClicks() {
  $(".actor-button").click(function(event) {
    addGiphsToDOM($(this).val());
  });
}

function addGiphsToDOM(searchTerm) {
  var apiURL = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&limit=10&rating=r&&api_key=2TnlxruJDjOfB4XdGy6PoxtRgiJUgXZM`;
  $(".giph-holder").html("");
  $.ajax(apiURL).then(function(response) {
    apiResponse = response.data;
    console.log(apiResponse);
    for (var i = 0; i < apiResponse.length; i++) {
      $(".giph-holder").append(
        `<div class = "single-giph-holder"><img class = "giph-image mx-2 my-1" data-motion = "still" id = ${i} src ="${apiResponse[i]["images"]["fixed_height_small_still"]["url"]}"><p class ="rating-holder">rating: ${apiResponse[i]["rating"]}</p></div>`
      );
    }
  });
}

$(".giph-holder").click(function(event) {
  var giphToChange = $(event.target);
  if (giphToChange.attr("data-motion") === "still") {
    giphToChange.attr(
      "src",
      apiResponse[giphToChange[0]["id"]]["images"]["fixed_height_small"]["url"]
    );
    giphToChange.attr("data-motion", "animated");
  } else if (giphToChange.attr("data-motion") === "animated") {
    giphToChange.attr(
      "src",
      apiResponse[giphToChange[0]["id"]]["images"]["fixed_height_small_still"][
        "url"
      ]
    );
    giphToChange.attr("data-motion", "still");
  }
});

// Code to add a new button
$("#input-button").click(function(event) {
  event.preventDefault();

  if ($("#input-field").val()) {
    var newActor = $("#input-field").val();
    if (localStorage.getItem("localStorageActors")) {
      var actorsHolder = JSON.parse(localStorage.getItem("localStorageActors"));
    } else {
      var actorsHolder = actors;
    }

    console.log(actorsHolder);
    actorsHolder.push(newActor);
    console.log(actorsHolder);

    localStorage.setItem("localStorageActors", JSON.stringify(actorsHolder));
    addButtons();
    $(".stored-info-warning").text(
      "You can step away from this page and we'll remember your inputs!"
    );
    $(".clear-storage-button").show();
  }
});

function clearMemory() {
  actors = createOriginalActorsArray();
  localStorage.removeItem("localStorageActors");
  $(".stored-info-warning").text("");
  addButtons();
  $(".giph-holder").html("");
  $(".clear-storage-button").css("display", "none");
}
