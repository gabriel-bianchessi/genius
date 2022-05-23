const divPontuacao = document.querySelector("div.pontuacao")
const divMain = document.querySelector("main")
const divs = Array.from(divMain.querySelectorAll("div"))
const overlayDiv = document.querySelector("div.overlay")
const startButton = document.querySelector("button.start-button")
const overlayScore = document.querySelector("h1.score")
const overlayRecord = document.querySelector("h1.record")
const newRecordDiv = document.querySelector(".new-record")
const regressiveCounter = document.querySelector(".regressive-count")
const number = regressiveCounter.querySelector(".number")
const snackbar = document.querySelector(".snackbar")

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
    console.log("Entrou aqui")
    showElement(snackbar)
    setTimeout(hideElement(snackbar), 3000)
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

const storage = window.localStorage

let record = getRecord()
function updateScore() {
  divPontuacao.innerHTML = sequencia.length
  overlayScore.innerHTML = sequencia.length
  
  if (sequencia.length > record) {
    updateRecord(sequencia.length)
    showElement(newRecordDiv)
  }
}

function getRecord() {
  let record = !localStorage.getItem('_record') ? 0 : localStorage.getItem('_record')
  overlayRecord.innerHTML = record
  return record
}

function updateRecord(newRecord) {
  console.log("Fazendo update do record", newRecord)
  localStorage.setItem('_record', `${newRecord}`)
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
    }, 1001 * index);
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