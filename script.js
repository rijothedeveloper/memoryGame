const gameContainer = document.getElementById("game");
const startBtn = document.getElementById("start-btn");
const scorePara = document.getElementById("score");
const recordScoreEle = document.querySelector("h3");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow"
];

let started = false;
startBtn.addEventListener("click", () => {
  if(startBtn.innerText === "start") { // if starting
    started=true;
  startBtn.disabled = true;
  } else { // if resetting
    startBtn.innerText = "start";
    scorePara.innerText = 0;
    resetGame()
  }
  
});

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function removeAllChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
}
}

function resetGame() {
  removeAllChildren(gameContainer);
  createDivsForColors(shuffle(COLORS));
}

function flipCard() {
  let firstClick = true;
  let flippedCard;
  let working = false;
  let score = 0;
  return function(div) {
    if(working || div.clicked) {
      return;
    }
    working = true;
    if(firstClick) {
      div.style.backgroundColor = div.classList[0];
      firstClick = false;
      flippedCard = div;
      working = false;
      div.clicked = true;
    } else {
      div.style.backgroundColor = div.classList[0];
      // flipped cards are asme
      if(div.classList[0] === flippedCard.classList[0]) {
        //keep the flip
        
        working=false;
        score += 20;
        scorePara.innerText = score;
        if(score >= (COLORS.length /2) * 20 ) {
          startBtn.innerText = "reset";
          startBtn.disabled = false;
          if( score > recordScore) {
            recordScore = score;
            localStorage.setItem("recordScore", recordScore);
            recordScoreEle.innerText = "current record = "+recordScore;
          }
          score = 0;
        }
      } else {
        
        // flip both cards back after 2 seconds
        setTimeout (() => {
          flippedCard.style.backgroundColor = "white";
          div.style.backgroundColor = "white";
          working = false;
          flippedCard.clicked = false;
        }, 2000);
      }
      firstClick = true;
      
    }
  }
}

const flipsCards = flipCard();

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  if (started) {
    flipsCards(event.target);
  }
  // flip the card
  
}

// when the DOM loads
// load record from local storage if available
let recordScore = localStorage.getItem("recordScore") ? localStorage.getItem("recordScore") : 0;
recordScoreEle.innerText = "current record = "+recordScore;

createDivsForColors(shuffledColors);
