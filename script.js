import { fragenSammlung } from "./fragenKatalog.js";

const input = document.querySelector("input");
const fragenText = document.querySelector("#question");
const button = document.querySelector(".myButton");
const antwortSystem = document.querySelector(".answerSystem");
const img = document.querySelector("img");

let aktuelleFrage;
let answerNotYetShown = true;

neueFrage();

button.addEventListener("click", handleClick);
input.addEventListener("keypress", handleKeypress);

function handleKeypress(e) {
  if (e.key === "Enter") {
    if (answerNotYetShown) {
      handleClick();
    } else {
      neueFrage();
    }
  }
}

function handleClick(e) {
  if (answerNotYetShown) {
    for (let i = 0; i < fragenSammlung[aktuelleFrage].antwort.length; i++) {
      const charElement = document.createElement("span");
      charElement.innerText = fragenSammlung[aktuelleFrage].antwort[i];
      if (fragenSammlung[aktuelleFrage].antwort[i] === input.value[i]) {
        charElement.classList.add("green");
      } else {
        charElement.classList.add("red");
      }
      antwortSystem.appendChild(charElement);
    }
    answerNotYetShown = false;
  }
}

function neueFrage() {
  antwortSystem.innerHTML = "";
  input.value = "";
  aktuelleFrage = Math.floor(Math.random() * fragenSammlung.length);
  fragenText.textContent = fragenSammlung[aktuelleFrage].frage;
  img.src = "./" + fragenSammlung[aktuelleFrage].bild + ".png";
  answerNotYetShown = true;
}

//

document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

var xDown = null;

function getTouches(evt) {
  return (
    evt.touches || evt.originalEvent.touches // browser API
  ); // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
}

function handleTouchMove(evt) {
  if (!xDown) {
    return;
  }
  var xUp = evt.touches[0].clientX;
  var xDiff = xDown - xUp;
  if (xDiff > 0) {
    /* left swipe */
    neueFrage();
  } else {
    /* right swipe */
    neueFrage();
  }
  /* reset values */
  xDown = null;
}
