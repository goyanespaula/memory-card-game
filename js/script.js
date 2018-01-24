var possibleCardFaces = ["&#x1F600;", "&#x1F60D;", "&#x1F636;", "&#x1F61C;", "&#x1F92B;", "&#x1F913;", "&#x1F600;", "&#x1F60D;", "&#x1F636;", "&#x1F61C;", "&#x1F92B;", "&#x1F913;"];
var score = 0;
var flippedCards = [];
var matchedCards = [];

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

function assignCardFaces(gameCardElements) {
  for (var i = 0; i < 12; i++) {
    $(gameCardElements[i]).html("<h2>" + getRandomFace() + "</h2>");
  }
}

function isNotMatched($card) {
  if (matchedCards.indexOf($card) === -1) {
    return true;
  }
  return false;
}

function isNotFlipped($card) {
  if (flippedCards.indexOf($card) === -1) {
    return true;
  }
  return false;
}

function areMatching(flippedCards) {
  return (flippedCards[0].html() === flippedCards[1].html());
}

function hideCards(flippedCards) {
  setTimeout(function() {
    $(flippedCards[0]).removeClass("flipped");
    $(flippedCards[1]).removeClass("flipped");
  }, 500)
}

function hideScoreBoard($scoreBoard) {
  $scoreBoard.addClass("hidden");
}

function renderWinScreen($winScreen) {
  var $finalClickCount = $("#final-click-count");
  $finalClickCount.text("Total Clicks: " + score)
  $winScreen.addClass("visible");
}

$(document).ready(function(){
  var $gameContainer = $("#game-container");
  var gameCardElements = $(".game-card");
  var $scoreBoard = $("#score-board");
  var $clickCount = $("#click-count");
  var $winScreen = $("#win-screen");
  var $replay = $("#replay");

  assignCardFaces(gameCardElements);

  $gameContainer.on("click", ".game-card", function(event) {
    var $card = $(event.target);

    if (isNotFlipped($card)) {
      score++;
      $clickCount.text("Total Clicks: " + score);
    }

    if (isNotMatched($card) && isNotFlipped($card)) {
      $card.addClass("flipped");
      flippedCards.push($card);
    }

    if (flippedCards.length === 2) {
      if (areMatching(flippedCards)) {
        matchedCards.push(flippedCards[0], flippedCards[1]);
      } else {
        hideCards(flippedCards);
      }
      flippedCards = [];
    }

    if(matchedCards.length === gameCardElements.length) {
      hideScoreBoard($scoreBoard);
      renderWinScreen($winScreen);
    }
  });

  $replay.on("click", function() {
    window.location.reload();
  });

  // Smooth Scrolling
  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
        }, 600);
    }
  });
})