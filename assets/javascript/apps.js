var searchParam = "matthew McConoughey";
var apiResponse;

function addButtons() {
  var buttonHolder = $(".button-holder");
  buttonHolder.html("");
  for (var i = 0; i < actors.length; i++) {
    var button = $("<button>");
    button.attr("value", actors[i]);
    button.addClass("actor-button");
    button.addClass("mx-2");
    button.addClass("my-2");
    button.text(actors[i]);
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
        `<img class = "giph-image mx-2 my-1" data-motion = "still" id = ${i} src ="${apiResponse[i]["images"]["fixed_height_small_still"]["url"]}">`
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
  var newActor = $("#input-field").val();
  actors.push(newActor);
  addButtons();
});
