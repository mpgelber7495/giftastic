var searchParam = "matthew McConoughey";

function addGiphsToDOM(searchTerm) {
  var apiURL = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&limit=10&rating=r&&api_key=2TnlxruJDjOfB4XdGy6PoxtRgiJUgXZM`;
  $.ajax(apiURL).then(function(response) {
    var apiResponse = response.data;
    console.log(apiResponse);
    for (var i = 0; i < apiResponse.length; i++) {
      $(".giph-holder").append(
        `<img src ="${apiResponse[i]["images"]["fixed_height_small"]["url"]}">`
      );
    }
  });
}

addGiphsToDOM("Skunk");
