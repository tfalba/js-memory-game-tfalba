let display0 = ''
let display1 = ''
let display2 = ''
let display3 = ''
let display4 = ''
let display5 = ''
let display6 = ''
let display7 = ''
let display8 = ''
let display9 = ''
let display10 = ''
let display11 = ''
let display12 = ''
let display13 = ''
let display14 = ''
let display15 = ''

let display = [display0, display1, display2, display3, display4, display5, display6, display7, display8, display9, display10, display11, display12, display13, display14, display15]
let displayId = ['#display0', '#display1', '#display2', '#display3', '#display4', '#display5', '#display6', '#display7', '#display8', '#display9', '#display10', '#display11', '#display12', '#display13', '#display14', '#display15']
for (let i = 0; i <= 15; i++) {
  display[i] = document.querySelector(displayId[i])
}

const animals = ['animal0', 'animal1', 'animal2', 'animal3', 'animal4', 'animal5', 'animal6', 'animal7', 'animal0', 'animal1', 'animal2', 'animal3', 'animal4', 'animal5', 'animal6', 'animal7']

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let j = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
shuffleArray(j)

for (let i = 0; i <= 15; i++) {
  // display[i].classList.add(animals[j[i]])
  display[i].innerText = `${animals[j[i]]}`
}

const container = document.querySelector('#game-display')
container.addEventListener('click', function (event) {
  const toggleAnimal = event.target.innerText
  event.target.classList.toggle(toggleAnimal)
})