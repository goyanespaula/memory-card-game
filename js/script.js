var possibleCardFaces = ["&#x1F600;", "&#x1F60D;", "&#x1F636;", "&#x1F61C;", "&#x1F92B;", "&#x1F913;", "&#x1F600;", "&#x1F60D;", "&#x1F636;", "&#x1F61C;", "&#x1F92B;", "&#x1F913;"];

function getRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

function getRandomFace(randomIndex) {
  var face;
  randomIndex = getRandomIndex(possibleCardFaces.length);
  face = possibleCardFaces[randomIndex];
  possibleCardFaces.splice(randomIndex, 1);
  return face;
}

function assignCardFaces(gameCards) {
  for (var i = 0; i < 12; i++) {
    $(gameCards[i]).html(getRandomFace());
  }
}

$(document).ready(function(){
  var gameCards = $(".game-card h2");

  assignCardFaces(gameCards);
})