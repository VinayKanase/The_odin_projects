/** Changes Whole Page Content
 * @param {object} currentMainContainer - Main container in DOM 
 */
function DOMPageChange(currentMainContainer, name = undefined) {
  if (currentMainContainer === "jumping jack.gif") {
    let jumpingJacksPage = `
      <div class="box">
       <div class="container">
       <div class="gif">
       <img src="./assets/img/${currentMainContainer}" alt="Image Not Found" />
     </div>
     <div class="text-heading">Jumping Jacks</div>
       </div>
        <button class="next-round">Play Next Round</button>
        </div>
        <audio src="./assets/sounds/jumping jacks.wav"></audio>
    `;
    document.querySelector(".playground").innerHTML = jumpingJacksPage;
    document.querySelector(".next-round").classList.add("enabled");
    return;
  }
  else if (currentMainContainer === "win") {
    let jumpingJacksPage = `
      <div class="box">
        <button class="next-round">Play Next Round</button>
        </div>
    `;
  }
  else if (typeof currentMainContainer === "string" && name != undefined) {
    let jumpingJacksPage = `
      <div class="box">
       <div class="container">
       <div class="gif">
       <img src="./assets/img/${currentMainContainer}" alt="Image Not Found" />
     </div>
     <div class="text-heading">${name}</div>
       </div>
        <button class="next-round">Play Next Round</button>
        </div>
        <audio src="./assets/sounds/${currentMainContainer.substr(0, currentMainContainer.indexOf("."))}.wav" id="movement">
        Audio Source Is Not Supported</audio>
    `;
    document.querySelector(".playground").innerHTML = jumpingJacksPage;
    let audios = document.querySelectorAll("audio");
    audios[1].addEventListener("ended", () => {
      audios[0].play();
    });
    setTimeout(() => {
      document.querySelector(".next-round").classList.add("enabled");
    }, 10000);
    return;
  }
  let body = document.querySelector("body");
  if (currentMainContainer.classList.contains("mainpage_container")) {
    let audio = document.querySelector("audio");
    // audio.addEventListener("ended", () => {
    //   setTimeout(() => {
    DOMPageChange(rulesPage);
    //   }, 1000);
    // });
  }
  else if (currentMainContainer.classList.contains("rulespage_container")) {

  }
}
/**
 * Changes Images Of DOM 
 * @param {string} playerChoice - Choice Of Options Choosen By Player
 * @param {string} computerChoice - Choice Of Options Choosen By Computer
 */
function changeDOMImages(playerChoice, computerChoice) {
  let choices = document.querySelectorAll(".choice");
  choices.forEach((choice) => {
    choice.classList.add("fadeOut");
  });
  AudioPlay();
  let PlayerImg = document.querySelector(".player-hand");
  let ComputerImg = document.querySelector(".computer-hand");
  console.log(playerChoice, computerChoice);
  setTimeout(() => {
    PlayerImg.setAttribute("src", "./assets/img/" + playerChoice + ".png");
    ComputerImg.setAttribute("src", "./assets/img/" + computerChoice + ".png");
  }, 4000);
  AnimatingHeading(document.querySelector(".infotext"));
  return;
}

function AnimatingHeading(element) {
  element.textContent = "Rock";
  setTimeout(() => {
    element.textContent = "Paper";
  }, 2000);
  setTimeout(() => {
    element.textContent = "Scissors";
  }, 3000);
}

function HeadingUpdateandScore(stringAddToHeading, player_score, computer_score) {
  document.querySelector(".infotext").textContent = stringAddToHeading;
  if (player_score != undefined && computer_score != undefined) {
    document.getElementById("playerScore").textContent = player_score;
    document.getElementById("computerScore").textContent = computer_score;
    console.log(document.getElementById("playerScore").textContent, document.getElementById("computerScore").textContent, player_score, computer_score);
  }
  return;
}
/**
 * If match is tie or lost then locomoter movement at Random
 * @param {string} string - String Telling Status Of Game
 */
function RoundPunishment(result) {
  let movements = ["Walk", "Slide/Skate", "Skip", "Run", "Leap", "Hop - 1 Foot", "Gallop", "Jump - 2 Feet"];
  let gifLinks = ["walk2.gif", "slide.gif", "skip.webp", "run 2.webp", "leap.webp", "hop.webp", "gallop 2.webp", "Jump.webp"];
  let RandomNum = Math.floor(Math.random() * movements.length);

  setTimeout(() => {
    if (result === "tie") {
      DOMPageChange("jumping jack.gif");
    }
    else if (result === "lost") {
      DOMPageChange(gifLinks[RandomNum], movements[RandomNum]);
    }
    else if (result === "win") {
      DOMPageChange("win");
    }
  }, 500);
}

function AudioPlay(PlayerChoice, string) {
  let audiosayit = document.querySelector(".sayit");
  if (string !== undefined) {
    setTimeout(() => {
      if (string === "tie" || string === "win" || string === "lost") {
        audiosayit.setAttribute("src", `./assets/sounds/${string} ${PlayerChoice}.wav`);
        audiosayit.play();
      }
    }, 500);
  }

  audiosayit.play();
}