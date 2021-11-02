const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

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

function flipCard() {
  let firstClick = true;
  let flippedCard;
  return function(div) {
    if(firstClick) {
      div.style.backgroundColor = div.classList[0];
      firstClick = false;
      flippedCard = div;
    } else {
      
      // flipped cards are asme
      if(div.classList[0] === flippedCard.classList[0]) {
        //keep the flip
        div.style.backgroundColor = div.classList[0];
      } else {
        div.style.backgroundColor = div.classList[0];
        // flip both cards back after 2 seconds
        setTimeout (() => {
          flippedCard.style.backgroundColor = "white";
          div.style.backgroundColor = "white";
        }, 2000);
      }
      firstClick = true;
      //flippedCard = "";
    }
  }
}

const flipsCards = flipCard();

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  // flip the card
  flipsCards(event.target);
}

// when the DOM loads
createDivsForColors(shuffledColors);
