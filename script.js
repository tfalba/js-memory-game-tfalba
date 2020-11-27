let animals = new Array()
let flowers = new Array()

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function wait(ms)
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}

function playMatch(roundSize, picChoices, picChoice) {
  // make roundSize an input choice for user as long as it is even and within a certain amount
  // where images are available
  let display = new Array()
  let shuffle = new Array()
  let start = new Array()

  for (let i = 0; i < roundSize / 2; i++) {
    picChoices[i] = picChoice + i
    picChoices[i + (roundSize / 2)] = picChoice + i
  }
  for (let i = 0; i < roundSize; i++) {
    shuffle[i] = i
  }

  for (let i = 0; i < 16; i++) {
    start[i] = document.querySelector('#start' + i)
    start[i].classList.add('hideme')
  }
  shuffleArray(shuffle)

  for (let i = 0; i < roundSize; i++) {
    display[i] = document.querySelector('#display' + i)
    display[i].classList.remove('hideme')
 
    display[i].innerText = picChoices[shuffle[i]]
    //console.log(display[i].innerText)
  }
  const container = document.querySelector('#game-display')

  let countClicks = 0
  let toggleChoice = ''
  let toggleArray = new Array(2)
  let targetArray = new Array(2)

/* --------------------------- May need to consider making event listeners for each card. --------------------------- */

  container.addEventListener('click', function handler (event) {
    event.preventDefault()
    // if (countClicks <= 2) {
    toggleChoice = event.target.innerText
    console.log(event.target.classList)

    event.target.classList.toggle(toggleChoice)

    console.log(toggleChoice)
    console.log(countClicks)
    console.log(event.target.classList)

    countClicks += 1
    console.log(countClicks)
    targetArray.shift()
    toggleArray.shift()
    targetArray.push(event.target)
    toggleArray.push(toggleChoice)
    // if ((toggleArray[0] !== toggleArray[1]) && countClicks > 2) {
    //   console.log("NO MATCH")
    //   // wait(2000)
    //   function flipOver () {
    //     targetArray[0].classList.toggle(toggleArray[0])
    //     targetArray[1].classList.toggle(toggleArray[1])
    //   }
    //   setTimeout(flipOver(), 2000)
    // }
    const resultsDiv = document.querySelector('#results')
    resultsDiv.innerText = `'You have clicked ${countClicks} times!'`
    console.log('this is array of innertext: ', toggleArray)
    console.log('this is the array of past two event targets: ', targetArray)

    // function matchCheck () {
    //   event.target.classList.toggle(toggleChoice)
    //   console.log('I am here!!', countClicks)
    // }

    // if (countClicks === 3) {
    //   wait(2000)
    //   matchCheck()
    //   countClicks = 0
    // }

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

const consoleDisplay = document.querySelector('#console-display')
consoleDisplay.addEventListener('click', function(event) {
  if (event.target.id === 'animals-easy') {
    intro.classList.add('hideme')
    animals = []
    playMatch (16, animals, 'animal')
  }
  if (event.target.id === 'animals-medium') {
    intro.classList.add('hideme')
    animals = []
    console.log("Playing medium")
    playMatch (24, animals, 'animal')
  }
  if (event.target.id === 'animals-difficult') {
    intro.classList.add('hideme')
    playMatch (36, animals, 'animal')
    animals = []
  }

  if (event.target.id === 'flowers-easy') {
    intro.classList.add('hideme')
    playMatch (16, flowers, 'flower')
    animals = []
  }

  if (event.target.id === 'reset') {
    document.location.reload()
  }
})
