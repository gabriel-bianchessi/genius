const divMain = document.querySelector("main")
const divs = divMain.querySelectorAll("div")
const sequencia = []


divMain.addEventListener("click", (ev) => {
  ev.target.classList.toggle("animate")
})

divs.forEach(div => {
  div.addEventListener("animationend", () => {
    div.classList.remove("animate")
  })
})

function turno() {
  sequencia.forEach(num => {
    divs[num].classList.add("animate")
  })
  const rnd = Math.round(Math.random() * 3)
  divs[rnd].classList.add("animate")
  sequencia.push(rnd)
}

