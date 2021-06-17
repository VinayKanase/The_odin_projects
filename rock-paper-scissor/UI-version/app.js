var PlayerName;
document.querySelector(".start").addEventListener("click", () => {
  PlayerName = document.getElementById("player_name").value;
  if (PlayerName.length > 10) {
    alert("Name Should not exceed 10 character");
    document.getElementById("player_name").value = "";
    return;
  }
  if (PlayerName === "") PlayerName = "Player";
  gameInit();
});

const optionArr = ["rock", "paper", "scissors"];
let playerScore = 0, computerScore = 0;

/**
 * Function  for return of Computer's Choice between Rock Paper and Scissor
 * @return {string} computerChoice - The computer's choice'
 */

function computerPlay() {
  let rdNum = Number(Math.floor(Math.random() * 3));
  return optionArr[rdNum];
}

/**
 * Function 
 * @param {string} playerChoice - Choice Made By Player
 * @param {string} computerChoice - Choice Made By Computer
 * @return {string} String that tells who is winner of round
 */
function playRound(playerChoice, computerChoice) {
  setHead();
  playerChoice = playerChoice.toLowerCase();
  if (playerChoice === computerChoice) {
    return "Tie";
  }
  else if ((playerChoice === optionArr[0] && computerChoice === optionArr[2]) || playerChoice === optionArr[1] && computerChoice === optionArr[0] || playerChoice === optionArr[2] && computerChoice === optionArr[1]) {
    //In all of this cases Player wins
    return "Win";
  }
  else if ((computerChoice === optionArr[0] && playerChoice === optionArr[2]) || computerChoice === optionArr[1] && playerChoice === optionArr[0] || computerChoice === optionArr[2] && playerChoice === optionArr[1]) {
    //In all of this cases Computer Win
    return "Lost";
  }
}
/**
 * Main Game Function that would Controll All Game Rounds
 */
let playerChoice = "";
let computerChoice = "";
function gameInit() {
  RenderPage("Rules");
  setTimeout(() => {
    let choices = document.querySelectorAll(".choice");
    choices.forEach(choice => {
      choice.addEventListener("click", () => {
        playerChoice = choice.classList[1];
        computerChoice = computerPlay();
        let roundResult = playRound(playerChoice, computerChoice);
        choices.forEach(ch => {
          ch.classList.toggle("fadeOut");
        })
        setTimeout(() => {

          let r = setHead(roundResult);
          if (r === 0) {
            return;
          }
          resetRoundBtn();
        }, 5000);
      });
    });
  }, 8900);
}

/**
 * Controlls All Audio's For Website
 * @param {string} src - Source of Audio  
 */
function AudioManager(src) {
  let audio = document.querySelector("audio");
  audio.play();
  if (src === "rock paper scissors shoot.wav") {
    audio.addEventListener("ended", () => {
      const playerHand = document.querySelector(".player-hand");
      const computerHand = document.querySelector(".computer-hand");

      playerHand.src = `./assets/img/${playerChoice}.png`;
      computerHand.src = `./assets/img/${computerChoice}.png`;
      playerHand.style.cssText = "animation: none;";
      computerHand.style.cssText = "animation: none;";
    })
  }
}

/**
 * Renders Different State Of Pages 
 * @param {string} PageName - Name of page to render
 */
function RenderPage(PageName) {
  let body = document.querySelector("body");

  if (PageName === "Rules") {
    let page = `<div class="rulespage_container fadeOut">
    <h1>How To</h1>
    <h1 class="playhead">Play</h1>
    <div class="rules">
      <ul>
        <li>It's you vs. the game</li>
        <li>If you beat the computer you are safe</li>
        <li>
          But computer beats you, you Lost the Round
        </li>
        <li>
          Remeber
          <ul>
            <li>Rock beats scissors</li>
            <li>Scissors beats paper</li>
            <li>Paper beats rock</li>
          </ul>
        </li>
      </ul>
    </div>
    </div>
    `;
    body.innerHTML = page;
    page = document.querySelector(".rulespage_container");
    setTimeout(() => {
      page.classList.remove("fadeOut");
      page.classList.add("fadeIn");
      setTimeout(() => {
        RenderPage("Game");
      }, 8000);
    }, 800);
  }
  else if (PageName === "Game") {
    let page = `
    <div class="score_card">
      <div class="playerscore_cont">
        <h1>${PlayerName}</h1>
        <p id="playerScore">0</p>
      </div>
      <div class="computerscore_cont">
        <h1>Computer</h1>
        <p id="computerScore">0</p>
      </div>
    </div>
    <div class="game">
    <div class="infotext">Choose your option</div>
    <div class="playground">
      <img
        class="player-hand"
        src="./assets/img/rock.png"
        alt="Something Went Wrong"
      />
      <img
        class="computer-hand"
        src="./assets/img/rock.png"
        alt="Somethig Went Wrong"
      />
    </div>
    <div class="options_choice">
      <button class="choice rock">Rock</button>
      <button class="choice paper">Paper</button>
      <button class="choice scissors">Scissors</button>
    </div>
  </div>
  <audio
  class="sayit"
  src="./assets/sounds/rock paper scissors shoot.wav"
></audio>`;
    body.innerHTML = page;
  }
}


function resetRoundBtn() {
  let optionsChoice = document.querySelector(".options_choice");
  let btn = document.createElement("button");
  btn.textContent = "Play Next Round";
  btn.classList.add("btn-next");
  optionsChoice.appendChild(btn);
  btn.addEventListener("click", () => {
    let playerHand = document.querySelector(".player-hand");
    let computerHand = document.querySelector(".computer-hand");
    playerHand.src = "./assets/img/rock.png";
    computerHand.src = "./assets/img/rock.png";
    document.querySelector(".infotext").textContent = "Choose your option";
    let choices = document.querySelectorAll(".choice");
    choices.forEach(choice => {
      choice.classList.remove("fadeOut");
    });
    optionsChoice.removeChild(btn);
  });
}

function setHead(string) {
  let head = document.querySelector(".infotext");
  if (string == undefined) {
    let i = 0;
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    playerHand.style.cssText = "animation: shakePlayer 3s infinite;";
    computerHand.style.cssText = "animation: shakeComputer 3s infinite;";

    AudioManager("rock paper scissors shoot.wav");
    let interval = setInterval(() => {
      head.textContent = Capitalize(optionArr[i]);
      i++;
      if (i >= 3) {
        clearInterval(interval);
        return;
      }
    }, 1000);
  }
  else if (string === "Win") {
    head.innerHTML = "You Win the Round";
    return scoreKeeper("Player");
  }
  else if (string === "Lost") {
    head.innerHTML = "You Lost the Round";
    return scoreKeeper("Computer");
  }
  else if (string === "Tie") {
    head.innerHTML = "You Tie the Round";
  }
}

/**
 * Increaments and Check For Is Game Over
 * @param {string} WinPos - Position of Current Round winner
 * @returns {function} - Returns function if One Among Player or Computer is Win
 */
function scoreKeeper(WinPos) {
  if (WinPos === "Player")
    ++playerScore;
  else if (WinPos === "Computer")
    ++computerScore;
  let playerScore_p = document.getElementById("playerScore");
  let computerScore_p = document.getElementById("computerScore");
  playerScore_p.textContent = playerScore;
  computerScore_p.textContent = computerScore;
  if (playerScore >= 5)
    return GameOver("Player"), 0;
  else if (computerScore >= 5)
    return GameOver("Computer"), 0;
}
/**
 * Final Function for Game Over
 * @param {string} Winner - Name of winner
 */
function GameOver(Winner) {
  console.log("GAME OVER");
  if (Winner === "Player") Winner = PlayerName;
  let page = `<div class="center-cont">
   <h1 style="font-size:40px">${Winner} Won the Game</h1>
   <img src="./assets/img/GameOver.webp" title="Game Over - ${Winner} Won"  alt="Not Found">
   <button id="restartGame" class="btn-next">Play Again</button>
  </div>`;
  playerScore = 0;
  computerScore = 0;
  document.querySelector("body").innerHTML = page;

  document.querySelector("#restartGame").addEventListener("click", () => {
    gameInit();
  });
}



/* Functions For Animation and Other Useful Functions */

/**
 * Capitalize Function Capitalizes First Letter of Entered String
 * @param {string} string - string for which Capitalization should be done
 * @returns {string} First Letter Capitalized String
 */
function Capitalize(string) {
  string = string[0].toUpperCase() + string.substring(1);
  return string;
}
/**
 * Text Animation Fade
 * @param {object} element - DOM Element which should have animation
 * @param {number} timer(optional) - Timer between each character animation
 */
function animateInText(element, timer = 50) {
  let stringText = element.textContent;
  let splitText = stringText.split("");
  let textLength = splitText.length;
  element.textContent = "";
  for (var i = 0; i < textLength; i++) {
    element.innerHTML += "<span>" + splitText[i] + "</span>"
  }
  let character = 0;
  let Timer = setInterval(animate, timer);
  function animate() {
    const span = element.querySelectorAll("span")[character];
    span.classList.add("fade");
    character++;
    if (character === textLength) {
      done();
      return;
    }
    function done() {
      clearInterval(Timer);
      Timer = null;
    }
  }
}

animateInText(document.querySelector(".heading_name"), 75);
