let animals = new Array()
const flowers = new Array()

function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
}
function wait (ms) {
  let d = new Date()
  var d2 = null
  do { d2 = new Date() }
  while (d2 - d < ms)
}

function playMatch (roundSize, picChoices, picChoice) {
  // make roundSize an input choice for user as long as it is even and within a certain amount
  // where images are available
  const display = new Array()
  const shuffle = new Array()
  const start = new Array()

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
  }
  const container = document.querySelector('#game-display')

  let countClicks = 0
  const toggleChoice = ''
  let contentArray = []
  const targetArray = []

  /* --------------------------- May need to consider making event listeners for each card. --------------------------- */

  // container.addEventListener('click', function handler (event) {
  //   event.preventDefault()
  //   // if (countClicks <= 2) {
  //   toggleChoice = event.target.innerText
  //   console.log(event.target.classList)

  //   event.target.classList.toggle(toggleChoice)

  //   console.log(toggleChoice)
  //   console.log(countClicks)
  //   console.log(event.target.classList)

  //   countClicks += 1
  //   console.log(countClicks)
  //   targetArray.shift()
  //   toggleArray.shift()
  //   targetArray.push(event.target)
  //   toggleArray.push(toggleChoice)
  //   // if ((toggleArray[0] !== toggleArray[1]) && countClicks > 2) {
  //   //   console.log("NO MATCH")
  //   //   // wait(2000)
  //   //   function flipOver () {
  //   //     targetArray[0].classList.toggle(toggleArray[0])
  //   //     targetArray[1].classList.toggle(toggleArray[1])
  //   //   }
  //   //   setTimeout(flipOver(), 2000)
  //   // }
  //   const resultsDiv = document.querySelector('#results')
  //   resultsDiv.innerText = `'You have clicked ${countClicks} times!'`
  //   console.log('this is array of innertext: ', toggleArray)
  //   console.log('this is the array of past two event targets: ', targetArray)

  //   // function matchCheck () {
  //   //   event.target.classList.toggle(toggleChoice)
  //   //   console.log('I am here!!', countClicks)
  //   // }

  //   // if (countClicks === 3) {
  //   //   wait(2000)
  //   //   matchCheck()
  //   //   countClicks = 0
  //   // }

  //   // if (countClicks === 3) {
  //   //   event.currentTarget.removeEventListener(event.type, handler)
  //   //   countClicks = 0
  //   //   container.addEventListener('click', function handler(event) {
  //   //     event.target.classList.toggle(toggleChoice)
  //   //   })
  //   // }
  // })

  function toggleMe (e) {
    const toggleChoice = e.innerText
    console.log(e.classList)
    e.classList.toggle(toggleChoice)
    console.log(e.classList)
    console.log(toggleChoice)
  }

  function removeMe (e) {
    const toggleChoice = e.innerText
    e.classList.remove(toggleChoice)
  }

  for (const card of display) {
    card.addEventListener('click', function handler (event) {
      toggleMe(event.target)
      countClicks++
      targetArray.push(event.target)
      contentArray.push(event.target.innerText)
      console.log('These are the targets that have been clicked so far: ', targetArray)
      console.log('This is the content that has been clicked so far: ', contentArray)
      console.log('This is the number of clicks so far: ', countClicks)
      // event.target.removeEventListener('click', handler)
      if (countClicks % 2 === 0) {
        // matchCheck(contentArray, targetArray)
        if (contentArray[0] === contentArray[1]) {
          console.log('We have a match!!')
          // targetArray[countClicks-1].classList.add('shimmer')
          // targetArray[countClicks-2].classList.add('shimmer')
          // targetArray = []
          // contentArray = []
          contentArray.shift()
          contentArray.shift()
          console.log(targetArray[countClicks-1])
          console.log(targetArray[countClicks-2])
          targetArray[countClicks-2].removeEventListener('click', handler)
          targetArray[countClicks-1].removeEventListener('click', handler)
          // targetArray[countClicks-2].removeEventListener('click', handler)
          // targetArray.shift()
          // targetArray.shift()
        } else {
          console.log("We don't match!!")

          contentArray = []
          // need to toggle first two after third click
          // targetArray[0].addEventListener('click', handler(e))
          // targetArray[1].addEventListener('click', handler(e))
          // targetArray = []
        }
      } else if (countClicks > 2) {
        if (targetArray[countClicks - 2].innerText !== targetArray[countClicks - 3].innerText) {
          console.log('Moving on...')
          console.log(targetArray)
          toggleMe(targetArray[countClicks - 2])
          toggleMe(targetArray[countClicks - 3])
          // targetArray[countClicks - 3].addEventListener('click', handler(event))
          // targetArray[countClicks - 2].addEventListener('click', handler(event))
          // countClicks -= 2
          // targetArray.shift()
          // targetArray.shift()

          console.log(targetArray)
        }
        else if (targetArray[countClicks -2].innerText === targetArray[countClicks -3].innerText) {
          targetArray[countClicks-3].classList.add('shimmer')
          targetArray[countClicks-2].classList.add('shimmer')
        }
      }
    })
  }
}

// {
//   if (contentArray[0] === contentArray[1]) {
//     console.log('We have a match!!')
//     targetArray = []
//     contentArray = []
//   } else {
//     console.log("We don't match!!")
//     targetArray = []
//     contentArray = []
//   }
// }

// e.target.removeEventListener('click', handler)
// if first click then keep listeners going
// if second click then check for match

/* --------------------------------------- turning handler on and off example --------------------------------------- */

// const container = document.querySelector('#game-display')
// container.addEventListener("click", function handler(e) {
//   e.currentTarget.removeEventListener(e.type, handler)
// })

const consoleDisplay = document.querySelector('#console-display')
consoleDisplay.addEventListener('click', function (event) {
  if (event.target.id === 'animals-easy') {
    intro.classList.add('hideme')
    animals = []
    playMatch(16, animals, 'animal')
  }
  if (event.target.id === 'animals-medium') {
    intro.classList.add('hideme')
    animals = []
    console.log('Playing medium')
    playMatch(24, animals, 'animal')
  }
  if (event.target.id === 'animals-difficult') {
    intro.classList.add('hideme')
    playMatch(36, animals, 'animal')
    animals = []
  }

  if (event.target.id === 'flowers-easy') {
    intro.classList.add('hideme')
    playMatch(16, flowers, 'flower')
    animals = []
  }

  if (event.target.id === 'reset') {
    document.location.reload()
  }
})
