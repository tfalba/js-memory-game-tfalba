let animals = new Array()
let flowers = new Array()
let persons = new Array()
const timer = document.querySelector('#timer')

/* ------------------------------------------------------------------------------------------------------------------ */
/*              In this version I am going to try adding background pics from within js vs togglig class              */
/* ------------------------------------------------------------------------------------------------------------------ */

function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
}
function wait (ms) {
  const d = new Date()
  let d2 = null
  do { d2 = new Date() }
  while (d2 - d < ms)
}

function toggleMe (e) {
  const toggleChoice = e.innerText
  console.log(e.classList)
  e.classList.toggle(toggleChoice)
  console.log(e.classList)
  console.log(toggleChoice)
}
/* --------------------------------------------- save this if need later -------------------------------------------- */
function removeMe (e) {
  const toggleChoice = e.innerText
  e.classList.remove(toggleChoice)
}

/* ------------------------------------------------------------------------------------------------------------------ */
/*             Function for overall gameplay -- calls in some of above functions (toggleMe, shuffleArray)             */
/* ------------------------------------------------------------------------------------------------------------------ */

function playMatch (roundSize, picChoices, picChoice) {
  const display = []
  const shuffle = []
  const start = []
  const open = []
  const matched = []

  for (let i = 0; i < roundSize / 2; i++) {
    picChoices[i] = picChoice + i
    picChoices[i + (roundSize / 2)] = picChoice + i
  }

  /* ---------------------- This hides all the squares from the opening display once game starts ---------------------- */

  for (let i = 0; i < 16; i++) {
    start[i] = document.querySelector('#start' + i)
    start[i].classList.add('hideme')
  }

  for (let i = 0; i < roundSize; i++) {
    shuffle[i] = i
  }
  console.log(open)
  shuffleArray(shuffle)

  /* --------- Display array is used to show number of cards played and assign them all their inner text value -------- */
  /* ------------------------------------------ this gets done after shuffle ------------------------------------------ */
  for (let i = 0; i < roundSize; i++) {
    display[i] = document.querySelector('#display' + i)
    display[i].classList.remove('hideme')
    display[i].innerText = picChoices[shuffle[i]]
  }
  for (let i = roundSize; i < 36; i++) {
    display[i] = document.querySelector('#display' + i)
    display[i].classList.add('hideme')
  }

  /* ------------------------------------------------------------------------------------------------------------------ */
  /*                                        Here's where listening process beings                                       */
  /* ------------------------------------------------------------------------------------------------------------------ */

  const container = document.querySelector('#game-display')

  let countClicks = 0
  let match = 0
  let contentArray = []
  let targetArray = []
  const displayResults = document.querySelector('#results')

  /* --------------------------- May need to consider making event listeners for each card. --------------------------- */

  /* ------------------------------------------------------------------------------------------------------------------ */
  /*             Different approach for listening by setting tracking on open and match arrays                                         */
  /* ------------------------------------------------------------------------------------------------------------------ */

  /* ------------------ In above code before listener happens, initialize open array and match array ------------------ */
  //   const openTotal = open => open.reduce((a, b) => a + b, 0)
  //   matched[1] = 1
  //   matched[2] = 1
  //   const seven = 7
  //   for (let i = 0; i < roundSize; i++) {
  //     if (matched[i] === 0 && openTotal(open) < 3) {

  //       display[i].addEventListener('click', function handler (event) {
  //         toggleMe(event.target)
  //         countClicks++
  //         open[i] = 1
  //         targetArray.push(event.target)
  //         contentArray.push(event.target.innerText)
  //         console.log('These are the targets that have been clicked so far: ', targetArray)
  //         console.log('This is the content that has been clicked so far: ', contentArray)
  //         console.log('This is the number of clicks so far: ', countClicks)
  //         console.log('this is the setting for the current target: ', open[i])
  //         console.log('this is the accumulation of the settings', open)
  //         console.log('this is the sum of all open: ', openTotal(open))
  //         event.target.removeEventListener('click', handler)
  //       }
  //       )}
  //      else {
  //       display[i].addEventListener('click', function handler (event) {
  //         event.target.removeEventListener('click', handler)
  //         console.log('I am here. This is the event target: ', event.target)
  //       })
  //     }
  //   }
  // }

  /* ------------------------------ This section is the event listener over all the cards ----------------------------- */

  for (const card of display) {
    card.addEventListener('click', function handler (event) {
      toggleMe(event.target)
      countClicks++
      targetArray.push(event.target)
      contentArray.push(event.target.innerText)
      console.log('These are the targets that have been clicked so far: ', targetArray)
      console.log('This is the content that has been clicked so far: ', contentArray)
      console.log('This is the number of clicks so far: ', countClicks)
      event.target.removeEventListener('click', handler)
      if (countClicks % 2 === 0) {
      // matchCheck(contentArray, targetArray) -- write a function
        if (contentArray[0] === contentArray[1]) {
          console.log('We have a match!!')
          match++
          console.log(match)
          contentArray.shift()
          contentArray.shift()
          targetArray[countClicks - 2].removeEventListener('click', handler)
          targetArray[countClicks - 1].removeEventListener('click', handler)
        } else {
          console.log("We don't match!!")
          // targetArray[countClicks-2].addEventListener('click', handler)
          // targetArray[countClicks-1].addEventListener('click', handler)
          contentArray = []
        }
      } else if (countClicks > 2) {
        if (targetArray[countClicks - 2].innerText !== targetArray[countClicks - 3].innerText) {
          console.log('Moving on...')
          console.log(targetArray)
          toggleMe(targetArray[countClicks - 3])
          toggleMe(targetArray[countClicks - 2])
          targetArray[countClicks - 3].addEventListener('click', handler)
          targetArray[countClicks - 2].addEventListener('click', handler)
          console.log(targetArray)
        } else if (targetArray[countClicks - 3].innerText === targetArray[countClicks - 2].innerText) {
          targetArray[countClicks - 3].classList.add('shimmer')
          targetArray[countClicks - 2].classList.add('shimmer')
          // targetArray[countClicks - 3].addEventListener('click', handler)
          console.log(targetArray, "shimmer")
        }
      }
      if (match === roundSize / 2) {
        for (let array of targetArray) {
          array.classList.remove('shimmer')
        }
      }
      displayResults.innerText = `Number of Clicks: ${countClicks}`
    })
  }
}

/* --------------------------------------- turning handler on and off example --------------------------------------- */

// const container = document.querySelector('#game-display')
// container.addEventListener("click", function handler(e) {
//   e.currentTarget.removeEventListener(e.type, handler)
// })

const consoleDisplay = document.querySelector('#console-display')
function gameStart (round, picClass, nameOfClass) {
  intro.classList.add('hideme')
  animals = []
  flowers = []
  var seconds = 0
  setInterval(function () {
    timer.innerHTML = "Seconds elapsed: " + seconds++
  }, 1000)
  playMatch(round, picClass, nameOfClass)
}

consoleDisplay.addEventListener('click', function (event) {
  if (event.target.id === 'animals-easy') {
    gameStart(16, animals, 'animal')
  }
  if (event.target.id === 'animals-medium') {
    gameStart(24, animals, 'animal')
  }
  if (event.target.id === 'animals-difficult') {
    gameStart(36, animals, 'animal')
  }
  if (event.target.id === 'flowers-easy') {
    gameStart(16, flowers, 'flower')
  }
  if (event.target.id === 'flowers-medium') {
    gameStart(24, flowers, 'flower')
  }
  if (event.target.id === 'flowers-difficult') {
    gameStart(36, flowers, 'flower')
  }

  if (event.target.id === 'persons-easy') {
    gameStart(16, persons, 'person')
  }
  if (event.target.id === 'persons-medium') {
    gameStart(24, persons, 'person')
  }
  if (event.target.id === 'persons-difficult') {
    gameStart(36, persons, 'person')
  }
  if (event.target.id === 'reset') {
    document.location.reload()
  }
  // make this last a function that clears all toggles to the initial position.
})
