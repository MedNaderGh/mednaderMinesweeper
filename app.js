
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const clicke = document.querySelector('#flags-left')
  const error = document.querySelector('#error')
  const result = document.querySelector('#result')
  let width = 10
  let bombAmount = 8
  let flags = 0
  let squares = []
  let erreur = 0
  let isGameOver = false
  let clicks  = 0
  let checkd=0;

  function createBoard() {
    clicke.innerHTML = 0
    error.innerHTML = 0

    //get shuffled game array with random bombs
    const bombsArray = Array(bombAmount).fill('bomb')
    const emptyArray = Array(width*width - bombAmount).fill('valid')
    const gameArray = emptyArray.concat(bombsArray)
    const shuffledArray = gameArray.sort(() => Math.random() -0.5)

    for(let i = 0; i < width*width; i++) {
      const square = document.createElement('div')
      square.setAttribute('id', i)
      square.classList.add(shuffledArray[i])
      grid.appendChild(square)
      squares.push(square)

      //normal click
      square.addEventListener('click', function(e) {
        click(square)
        clicks+=1;
        clicke.innerHTML = clicks;
      })

      //cntrl and left click
      square.oncontextmenu = function(e) {
        e.preventDefault()
        addFlag(square)
      }
    }

    //add numbers
    for (let i = 0; i < squares.length; i++) {
      let total = 0
      const isLeftEdge = (i % width === 0)
      const isRightEdge = (i % width === width -1)

      if (squares[i].classList.contains('valid')) {
        if (i > 0 && !isLeftEdge && squares[i -1].classList.contains('bomb')) total ++
        if (i > 9 && !isRightEdge && squares[i +1 -width].classList.contains('bomb')) total ++
        if (i > 10 && squares[i -width].classList.contains('bomb')) total ++
        if (i > 11 && !isLeftEdge && squares[i -1 -width].classList.contains('bomb')) total ++
        if (i < 98 && !isRightEdge && squares[i +1].classList.contains('bomb')) total ++
        if (i < 90 && !isLeftEdge && squares[i -1 +width].classList.contains('bomb')) total ++
        if (i < 88 && !isRightEdge && squares[i +1 +width].classList.contains('bomb')) total ++
        if (i < 89 && squares[i +width].classList.contains('bomb')) total ++
        squares[i].setAttribute('data', total)
      }
    }
  }
  createBoard()
  //click on square actions
  function click(square) {
    let currentId = square.id
    if (isGameOver) return
    if (square.classList.contains('checked')) return
    if (square.classList.contains('bomb')) {
      erreur+=1;
      error.innerHTML = erreur;
      square.innerHTML = '💣';
      square.classList.remove('bomb')
      square.classList.add('checked')
      if (erreur == bombAmount) gameOver()
    } else {
      let total = square.getAttribute('data')
      if (total !=0) {
        square.classList.add('checked')
        if (total == 1) square.classList.add('one')
        if (total == 2) square.classList.add('two')
        if (total == 3) square.classList.add('three')
        if (total == 4) square.classList.add('four')
        square.innerHTML = total
        return
      }
      checkSquare(square, currentId)
    }
    square.classList.add('checked')
    checkForWin()
  }


  //check neighboring squares once square is clicked
  function checkSquare(square, currentId) {
    const isLeftEdge = (currentId % width === 0)
    const isRightEdge = (currentId % width === width -1)

    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) -1].id
        //const newId = parseInt(currentId) - 1   ....refactor
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId > 9 && !isRightEdge) {
        const newId = squares[parseInt(currentId) +1 -width].id
        //const newId = parseInt(currentId) +1 -width   ....refactor
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId > 10) {
        const newId = squares[parseInt(currentId -width)].id
        //const newId = parseInt(currentId) -width   ....refactor
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId > 11 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) -1 -width].id
        //const newId = parseInt(currentId) -1 -width   ....refactor
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 98 && !isRightEdge) {
        const newId = squares[parseInt(currentId) +1].id
        //const newId = parseInt(currentId) +1   ....refactor
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 90 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) -1 +width].id
        //const newId = parseInt(currentId) -1 +width   ....refactor
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 88 && !isRightEdge) {
        const newId = squares[parseInt(currentId) +1 +width].id
        //const newId = parseInt(currentId) +1 +width   ....refactor
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 89) {
        const newId = squares[parseInt(currentId) +width].id
        //const newId = parseInt(currentId) +width   ....refactor
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
    }, 10)
  }

  //game over
  function gameOver() {
    result.innerHTML = 'BOOM! Game Over!';
    isGameOver = true ;}


function ShowAllBombs() { squares.forEach(square => {
  if (square.classList.contains('bomb')) {
    square.innerHTML = '💣' ;
    square.classList.remove('bomb');
    square.classList.add('checked');
  }
})}
  //check for win
  function checkForWin() {
    ///simplified win argument
  let matches = 0

    for (let i = 0; i < squares.length; i++) {
      if (squares[i].classList.contains('checked')) {
        matches ++
      }
      if (matches > 100-bombAmount) {
        result.innerHTML = 'YOU WIN!'
        isGameOver = true
      }
    }
  }
})

