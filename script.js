let display = new Array()
let animals = new Array()
let flowers = new Array()
let shuffle = new Array()
let start = new Array()

// $(`'.${toggleChoice}'`).css("background-color", "yellow")

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function playMatch(roundSize, picChoices, picChoice) {
  // make roundSize an input choice for user as long as it is even and within a certain amount
  // where images are available

  for (let i = 0; i < roundSize / 2; i++) {
    picChoices[i] = picChoice + i
    picChoices[i + (roundSize / 2)] = picChoice + i
  }
  for (let i = 0; i < roundSize; i++) {
    shuffle[i] = i
  }

  for (let i = 0; i<16; i++) {
    start[i] = document.querySelector('#start' + i)
    start[i].classList.add('hideme')
  }
  shuffleArray(shuffle)

  

  for (let i = 0; i < roundSize; i++) {
    display[i] = document.querySelector('#display'+i)
    display[i].classList.toggle('hideme')
 
    display[i].innerText = picChoices[shuffle[i]]
    //console.log(display[i].innerText)
  }
  const container = document.querySelector('#game-display')

  let countClicks = 0
  let toggleChoice = ''
  let toggleArray = []

  container.addEventListener('click', function handler(event) {
    event.preventDefault()
    // if (countClicks <= 2) {
    toggleChoice = event.target.innerText
    event.target.classList.toggle(toggleChoice)

    countClicks += 1
    console.log(countClicks)
    toggleArray.push(toggleChoice)
    // if (countClicks === 3) {
    //   event.currentTarget.removeEventListener(event.type, handler)
    //   countClicks = 0
    //   container.addEventListener('click', function handler(event) {
    //     event.target.classList.toggle(toggleChoice)
    //   })
    // }
  })
}
// const container = document.querySelector('#game-display')
// container.addEventListener("click", function handler(e) {
//   e.currentTarget.removeEventListener(e.type, handler)
// })

const console = document.querySelector('#console-display')
console.addEventListener('click', function(event) {
  debugger
  if (event.target.id === 'animals-easy') {
    intro.classList.add('hideme')
    playMatch (16, animals, 'animal')
  }
  if (event.target.id === 'animals-medium') {
    intro.classList.add('hideme')
    playMatch (24, animals, 'animal')
  }
  if (event.target.id === 'animals-difficult') {
    intro.classList.add('hideme')
    playMatch (36, animals, 'animal')
  }

  if (event.target.id === 'flowers-easy') {
    intro.classList.add('hideme')
    playMatch (16, flowers, 'flower')
  }


  // const intro = document.querySelector('#intro')
  // intro.classList.add('hideme')
  // playMatch (16, animals, 'animal')
})
// playMatch (28, animals, 'animal')

//playMatch (16, flowers, 'flower')
