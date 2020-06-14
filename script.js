import { fragenSammlung } from "./fragenKatalog.js";

const input = document.querySelector("input");
const questionText = document.querySelector("#question");
const button = document.querySelector(".myButton");
const answerSystem = document.querySelector(".answerSystem");
const img = document.querySelector("img");

let currentQuestion = 0;
let answerNotYetShown = true;
let askedQuestions = [];
let currentIndex = 0;

let dingSound = new Audio();
dingSound.src = "./ding.mp3";
//dingSound.play();

let xDown = null;

button.addEventListener("click", submission);
input.addEventListener("keypress", handleKeypress);

document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

newQuestion();

function newQuestion(i) {
  answerSystem.innerHTML = "";
  input.value = "";
  answerNotYetShown = true;
  if (i == undefined) {
    currentQuestion = Math.floor(Math.random() * fragenSammlung.length);
    askedQuestions.push(currentQuestion);
    currentIndex = askedQuestions.length - 1;
  } else {
    if (i > 0) {
      currentQuestion = askedQuestions[i];
    }
  }
  questionText.textContent = fragenSammlung[currentQuestion].frage;
  img.src = "./img/" + fragenSammlung[currentQuestion].bild + ".png";
}

function handleKeypress(e) {
  if (e.key === "Enter") {
    if (answerNotYetShown) {
      submission();
    } else {
      newQuestion();
    }
  }
}

function submission(e) {
  if (answerNotYetShown) {
    for (let i = 0; i < fragenSammlung[currentQuestion].antwort.length; i++) {
      const charElement = document.createElement("span");
      charElement.innerText = fragenSammlung[currentQuestion].antwort[i];
      if (fragenSammlung[currentQuestion].antwort[i] === input.value[i]) {
        charElement.classList.add("green");
      } else {
        charElement.classList.add("red");
      }
      answerSystem.appendChild(charElement);
    }
    if (fragenSammlung[currentQuestion].antwort === input.value) {
      dingSound.play();
    }
    answerNotYetShown = false;
  }
}

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
  let swipeGrenze = 8;
  if (!xDown) {
    return;
  }
  var xUp = evt.touches[0].clientX;
  var xDiff = xDown - xUp;

  if (xDiff > 0 && xDiff > swipeGrenze) {
    /* left swipe */
    currentIndex--;
    newQuestion(currentIndex);
  } else if (xDiff < 0 && xDiff < swipeGrenze * -1) {
    /* right swipe */
    newQuestion();
  }
  /* reset values */
  xDown = null;
}
