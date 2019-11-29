var searchParam = "matthew McConoughey";
var apiResponse;

function addButtons() {
  var buttonHolder = $(".button-holder");
  for (var i = 0; i < actors.length; i++) {
    var button = $("<button>");
    button.attr("value", actors[i]);
    button.addClass("actor-button");
    button.text(actors[i]);
    buttonHolder.append(button);
  }
}
addButtons();

function addGiphsToDOM(searchTerm) {
  var apiURL = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&limit=10&rating=r&&api_key=2TnlxruJDjOfB4XdGy6PoxtRgiJUgXZM`;
  $.ajax(apiURL).then(function(response) {
    apiResponse = response.data;
    console.log(apiResponse);
    for (var i = 0; i < apiResponse.length; i++) {
      $(".giph-holder").append(
        `<img class = "giph-image" data-motion = "still" id = ${i} src ="${apiResponse[i]["images"]["fixed_height_small_still"]["url"]}">`
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
