var possibleCardFaces = ["&#x1F600;", "&#x1F60D;", "&#x1F636;", "&#x1F61C;", "&#x1F92B;", "&#x1F913;", "&#x1F600;", "&#x1F60D;", "&#x1F636;", "&#x1F61C;", "&#x1F92B;", "&#x1F913;"];
var lowScore = localStorage.getItem("lowScore");
var score = 0;
var flippedCards = [];
var matchedCards = [];

function assignLowScore($lowScoreOutput) {
  lowScore = lowScore || "N/A";
  $lowScoreOutput.text("Low Score: " + lowScore);
}

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

function isNotFlipped($card) {
  for (var i = 0; i < flippedCards.length; i++) {
    if (flippedCards[i][0] === $card[0]) {
      return false;
    }
  }
  return true;
}

function areMatching(flippedCards) {
  return (flippedCards[0].html() === flippedCards[1].html());
}

function hideCards(flippedCards) {
  setTimeout(function() {
    $(flippedCards[0]).removeClass("flipped");
    $(flippedCards[1]).removeClass("flipped");
  }, 300)
}

function hideScoreBoard($scoreBoard) {
  $scoreBoard.addClass("hidden");
}

function checkForLowScore(score, $lowScoreOutput) {
  if (lowScore === "N/A") {
    lowScore = Infinity;
  }
  if (score < lowScore) {
    localStorage.setItem("lowScore", score);
    $lowScoreOutput.html("<h4>New</h4> Low Score: " + score);
  }
}

function renderWinScreen($winScreen) {
  $winScreen.addClass("visible");
}

$(document).ready(function(){
  var $gameContainer = $("#game-container");
  var gameCardElements = $(".game-card");
  var $scoreBoard = $("#score-board");
  var $gameClicks = $(".click-count");
  var $lowScoreOutput = $(".low-score");
  var $winScreen = $("#win-screen");
  var $replay = $("#replay");

  assignLowScore($lowScoreOutput);
  assignCardFaces(gameCardElements);

  $gameContainer.on("click", ".game-card", function(event) {
    if(event.target != this){ return true; }

    var $card = $(event.target);

    if (isNotFlipped($card)) {
      $card.addClass("flipped");
      flippedCards.push($card);
      score++;
      $gameClicks.text("Total Clicks: " + score);
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
      checkForLowScore(score, $lowScoreOutput);
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