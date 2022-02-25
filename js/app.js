// DOM element
const invaders = [
  12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 26, 27, 32, 33, 34, 35, 36, 37, 42,
  43, 44, 45, 46, 47,
];
const flyingSaucer = [];
const invadersKilled = [];
let stepValue = 1;
let movingRight = true;
let running = false;
let score = 0;
let level = 1;
let runGameID;
let playerPosition = 91;
const playerDisplay = document.querySelector('.player');
const grid = [];
const gridDisplay = document.querySelector('.grid');
const scoreDisplay = document.querySelector('.score');
scoreDisplay.innerText = `score: ${score}`;
const levelDisplay = document.querySelector('.level');
levelDisplay.innerText = `Level: ${level}`;
const startDisplay = document.querySelector('.start');
let playerShotDisplay = document.querySelector('.shot');
let invaderShotDisplay = document.querySelector('.invader-shot');
const gameOverDisplay = document.querySelector('.game-over');
//let intervalID;

function createGrid() {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    if (i >= 0 && i <= 9) {
      cell.classList.add('shot-remove');
    }
    if (i >= 90 && i <= 99) {
      cell.classList.add('bomb-remove');
    }
    if (i === 0) {
      cell.classList.add('r-saucer-remove');
    }
    if (i === 9) {
      cell.classList.add('l-saucer-remove');
    }

    if (i === 91) {
      cell.classList.add('player');
    }
    // cell.textContent = i;
    gridDisplay.appendChild(cell);
    grid.push(cell);
  }
}
// move the player
function addPlayer(position) {
  grid[position].classList.add('player');
}
function removePlayer(position) {
  grid[position].classList.remove('player');
}
function movePlayer(event) {
  // * remove player from the current position
  // removePlayer(playerPosition);

  switch (event.keyCode) {
    case 39:
      if (playerPosition < 99) {
        removePlayer(playerPosition);
        playerPosition++;
        addPlayer(playerPosition);
      }
      break;
    case 37:
      if (playerPosition > 90) {
        removePlayer(playerPosition);
        playerPosition--;
        addPlayer(playerPosition);
      }
      break;
    case 32:
      takeShot();
      break;
    default:
  }
  // addPlayer(playerPosition); // * add player back at the new position
}
// move the invaders
function clearInvader() {
  for (let i = 0; i < invaders.length; i++) {
    grid[invaders[i]].classList.remove('invader');
  }
}
function drawInvader() {
  for (let i = 0; i < invaders.length; i++) {
    if (!invadersKilled.includes(i)) {
      grid[invaders[i]].classList.add('invader');
    }
  }
}
function advanceInvaders() {
  const leftWall = invaders[0] % 10 === 0;
  const rightWall = invaders[invaders.length - 1] % 10 === 9;
  clearInvader();
  if (rightWall && movingRight) {
    for (let i = 0; i < invaders.length; i++) {
      invaders[i] += 11;
      stepValue = -1;
      movingRight = false;
    }
  }
  if (leftWall && !movingRight) {
    for (let i = 0; i < invaders.length; i++) {
      invaders[i] += 9;
      stepValue = 1;
      movingRight = true;
    }
  }
  for (let i = 0; i < invaders.length; i++) {
    invaders[i] += stepValue;
  }
  drawInvader();

  if (grid[playerPosition].classList.contains('invader', 'player')) {
    gameOverDisplay.innerText = 'Game Over!';
    const explosion = document.querySelector('#explosion');
    explosion.play();
    const gameOver = document.querySelector('#game-over');
    gameOver.play();

    clearInterval(runGameID);
  }

  for (let i = 0; i < invaders.length; i++) {
    if (invaders[i] > grid.length - 9) {
      gameOverDisplay.innerHTML = 'Game Over!';
      const gameOver = document.querySelector('#game-over');
      gameOver.play();
      clearInterval(runGameID);
    }
  }
  if (invaders.length === 0) {
    level += 1;
    gameOverDisplay.innerHTML = `Level ${level} Complete!`;
    levelDisplay.innerText = `Level: ${level}`;
    clearInterval(bombID);
    clearInterval(runGameID);
  }
}

function clearSaucer() {
  for (let i = 0; i < 10; i++) {
    grid[i].classList.remove('saucer');
  }
}

function rightSaucerAttack() {
  let saucerPosition = 10;
  function moveSaucer() {
    if (grid[saucerPosition].classList.contains('r-saucer-remove')) {
      grid[saucerPosition].classList.remove('saucer');
      return;
    }

    grid[saucerPosition].classList.remove('saucer');
    saucerPosition -= 1;
    grid[saucerPosition].classList.add('saucer');
  }

  const saucerID = setInterval(moveSaucer, 350);
}

function leftSaucerAttack() {
  let saucerPosition = 0;
  function moveSaucer() {
    if (grid[saucerPosition].classList.contains('l-saucer-remove')) {
      grid[saucerPosition].classList.remove('saucer');
      return;
    }
    grid[saucerPosition].classList.remove('saucer');
    saucerPosition += 1;
    grid[saucerPosition].classList.add('saucer');
  }
  const saucerID = setInterval(moveSaucer, 350);
}

// shoot stuff
function takeShot() {
  let shotID;
  let shotPosition = playerPosition;
  const shotSound = document.querySelector('#shot');
  shotSound.play();
  // move the shot and decide what to remove
  function moveShot() {
    if (
      grid[shotPosition].classList.contains('saucer') &&
      grid[shotPosition].classList.contains('shot-remove')
    ) {
      grid[shotPosition].classList.remove('shot');
      grid[shotPosition].classList.remove('saucer');
      grid[shotPosition].classList.add('saucer-remove');
      grid[shotPosition].classList.add('explosion');
      const destroyed = document.querySelector('#destroyed');
      destroyed.play();

      score += 500;
      scoreDisplay.innerText = score;
      setTimeout(() => {
        grid[shotPosition].classList.remove('explosion');
      }, 300);
      clearInterval(saucerID);
    }

    if (grid[shotPosition].classList.contains('shot-remove')) {
      grid[shotPosition].classList.remove('shot');
      return;
    }
    grid[shotPosition].classList.remove('shot');
    shotPosition -= 10;
    grid[shotPosition].classList.add('shot');
    //
    if (grid[shotPosition].classList.contains('invader')) {
      grid[shotPosition].classList.remove('shot');
      grid[shotPosition].classList.remove('invader');
      grid[shotPosition].classList.add('explosion');
      invaders.splice(invaders.indexOf(shotPosition), 1);
      console.log(invaders);
      invadersKilled.push(invaders.indexOf(shotPosition));
      if (invadersKilled.length === 22) {
        rightSaucerAttack();
        const siren = document.querySelector('#siren');
        siren.play();
      }
      if (invadersKilled.length === 13) {
        leftSaucerAttack();
        const siren = document.querySelector('#siren');
        siren.play();
      }
      if (invadersKilled.length === 5) {
        rightSaucerAttack();
        const siren = document.querySelector('#siren');
        siren.play();
      }
      if (invadersKilled.length === 1) {
        leftSaucerAttack();
        const siren = document.querySelector('#siren');
        siren.play();
      }

      score += 50;
      scoreDisplay.innerText = score;
      setTimeout(() => {
        grid[shotPosition].classList.remove('explosion');
      }, 300);
      const destroyed = document.querySelector('#destroyed');
      destroyed.play();

      clearInterval(shotID);
    }
  }
  shotID = setInterval(moveShot, 100);
  // console.log('shots fired!');
}

function dropBomb() {
  let bombID;
  //bomb half the time
  if (Math.random() < 0.5) {
    let randomBomber =
      Math.floor(
        Math.random() *
          (invaders[invaders.length - 6] - invaders[invaders.length - 1] + 1)
      ) + invaders[invaders.length - 1];
    let bombPosition = randomBomber;
    // move the bombs and clear 'em
    function moveBomb() {
      if (grid[bombPosition].classList.contains('bomb-remove')) {
        grid[bombPosition].classList.remove('bomb');
        clearInterval(bombID);
        return;
      }
      grid[bombPosition].classList.remove('bomb');
      bombPosition += 10;
      grid[bombPosition].classList.add('bomb');
      // bomb game over and clearing the game timer conditions
      if (grid[bombPosition].classList.contains('player')) {
        grid[bombPosition].classList.remove('bomb');
        grid[bombPosition].classList.remove('player');
        grid[bombPosition].classList.add('explosion');
        setTimeout(() => {
          grid[bombPosition].classList.remove('explosion');
        }, 300);
        clearInterval(bombID);
        const explosion = document.querySelector('#explosion');
        explosion.play();
        gameOverDisplay.innerText = 'Game Over!';
        const gameOver = document.querySelector('#game-over');
        gameOver.play();
        clearInterval(runGameID);
      }
    }
    bombID = setInterval(moveBomb, 250);
  }
}

function toggleGame(event) {
  console.log(event);
  if (running) {
    running = false;
    startDisplay.innerText = 'start game';
  } else {
    runInterval();
    running = true;
    startDisplay.innerText = 'stop game';
  }
}

function runGame() {
  if (!running) {
    clearInterval(runGameID);
    return;
  }

  advanceInvaders();
  dropBomb();
}

document.addEventListener('keydown', movePlayer);
startDisplay.addEventListener('click', toggleGame);
//levelUp.addEventListener('click', runInterval);

createGrid();
drawInvader();

//intervalID = setInterval(runGame, 750);
let intervalTime = 800;
function runInterval() {
  runGameID = setInterval(() => {
    runGame();
  }, intervalTime);
}
