const inGamePontuacao = document.querySelector("div.pontuacao")
const divMain = document.querySelector("main")
const divs = Array.from(divMain.querySelectorAll("div"))
const overlayDiv = document.querySelector("div.overlay")
const startButton = document.querySelector("button.start-button")
const overlayScore = document.querySelector("h1.score")
const overlayRecord = document.querySelector("h1.record")
const newRecordDiv = document.querySelector(".new-record")
const regressiveCounter = document.querySelector(".regressive-count")
const number = regressiveCounter.querySelector(".number")
let record = 0

let sequencia = []
let animatingColors = false
let currentColorPosition = 0
let overlayIsVisible = true

startButton.addEventListener("click", () => {
  if(!animatingColors) {
    inicio()
  }
})


divMain.addEventListener("click", (ev) => {
  if(overlayIsVisible) {
    return
  }

  if (animatingColors) {
    console.log("espere a animação terminar");
    return;
  }
  
  const idxClickedElement = divs.indexOf(ev.target);
  
  if (idxClickedElement !== sequencia[currentColorPosition]) {
    showElement(overlayDiv)
    return;
  }
  
  ev.target.classList.add("animate");
  currentColorPosition++;
  if (currentColorPosition >= sequencia.length) {
    currentColorPosition = 0;
    setTimeout(() => {
      turno()
    }, 3000);
    return
  }

});

divs.forEach((div) => {
  div.addEventListener("animationend", () => {
    div.classList.remove("animate");
  });
});

function playRegressiveCount() {
  let cnt = 3;
  number.innerHTML = cnt
  showElement(regressiveCounter)
  let idx = setInterval(() => {
    cnt--
    number.innerHTML = cnt 
    if (cnt <= 0) {
      turno();
      clearInterval(idx);
      hideElement(regressiveCounter)
    }
  }, 1000);
}

function updateScore() {
  divPontuacao.innerHTML = sequencia.length
  overlayScore.innerHTML = sequencia.length
  
  if (sequencia.length > record) {
    updateRecord(sequencia.length)
  }
}

function updateRecord(newRecord) {
  record = newRecord
  showElement(newRecordDiv)
  overlayRecord.innerHTML = record
}

function showElement(element) {
  element.classList.add("visible")
  if(element == overlayDiv) {
    overlayIsVisible = true
  }
}

function hideElement(element) {
  element.classList.remove("visible")
  if(element == overlayDiv) {
    overlayIsVisible = false
  }
} 

function playAnimationColors() {
  sequencia.forEach((current, index) => {
    setTimeout(() => {
      divs[current].classList.add("animate");
      animatingColors = index < sequencia.length - 1;
    }, 1000 * index);
  });
}

function inicio() {
  hideElement(overlayDiv)
  overlayScore.innerHTML = 0
  sequencia = [];
  currentColorPosition = 0;
  animatingColors = true
  playRegressiveCount()
}

function turno() {
  updateScore()
  const rnd = Math.round(Math.random() * 3);
  sequencia.push(rnd);
  playAnimationColors();
}