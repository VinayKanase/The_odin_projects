/**
 * Function  for return of Computer's Choice between Rock Paper and Scissor
 */

 const optionArr = ["rock","paper","scissor"];
 let playerScore = 0,computerScore = 0;
function computerPlay(){
    let rdNum = Number(Math.floor(Math.random() * 3));
    return optionArr[rdNum];
}

/**
 * Function 
 * @param {string} playerChoice - Choice Made By Player
 * @param {string} computerChoice - Choice Made By Computer
 * @return {string} String that tells who is winner of round
 */
function playRound(playerChoice,computerChoice){
  playerChoice = playerChoice.toLowerCase();
  if(playerChoice === computerChoice){
       return "Tie game";
   }
   else if((playerChoice === optionArr[0] && computerChoice === optionArr[2]) || playerChoice === optionArr[1] && computerChoice === optionArr[0] || playerChoice === optionArr[2] && computerChoice === optionArr[1]){
       //In all of this cases Player wins
       ++playerScore;
       if(playerScore === 1) 
         return `You Won, ${Capitalize(playerChoice)} beats ${Capitalize(computerChoice)}`;
       else if(playerScore > 4){
         return `Congratulations!!! You Won, ${Capitalize(playerChoice)} beats ${Capitalize(computerChoice)}`;
        //  endGame(); 
       }
       else if(playerScore > 1)
         return `You Won again, ${Capitalize(playerChoice)} beats ${Capitalize(computerChoice)}`;
   }
   else if((computerChoice === optionArr[0] && playerChoice === optionArr[2]) || computerChoice === optionArr[1] && playerChoice === optionArr[0] || computerChoice === optionArr[2] && playerChoice === optionArr[1]){
     //In all of this cases Computer Wins
     ++computerScore;
       if(computerScore === 1) 
         return `You Lose, ${Capitalize(computerChoice)} beats ${Capitalize(playerChoice)}`;
       else if(computerScore > 4){
         return `Oh ohhh!!! You Lost, ${Capitalize(computerChoice)} beats ${Capitalize(playerChoice)}`;
        //  endGame(); 
       }
       else if(computerScore > 1)
         return `You Lose again, ${Capitalize(computerChoice)} beats ${Capitalize(playerChoice)}`;
   }
   else
   console.log(computerChoice,PlayerChoice);
}
/**
 * Resets the game on user choice
 */
function tryAgain(){
  let Confirm = confirm("Do you want to try again the Game");
  if(Confirm){
    playerScore = 0;
    computerScore = 0;
    setTimeout(()=>{
      console.log(`%c ${game()}`,"font-family:sans-serif;font-weight:500;font-size:16px;padding:10px 5px;");
      },500);
  }
  else{
    alert("That's Fine,Hope You Like The Game");
  }
}
/**
 * Main function game 
 * @returns {string} Final Result of Game
 */
function game(){
  for(let i = 0; i < 5;i++){
    console.log(playRound(Prompt("Enter Your Choice:"),computerPlay()));
    scoreBoard(); 
  }
  if(playerScore > computerScore){
    tryAgain();
  return "Woah!!!, You Won The game";
  }
  else if(computerScore > playerScore){
    tryAgain();
    return "You Lost it";
  }
  else if(computerScore === playerScore){
    tryAgain(); 
    return "Game Tied";
  }

}
//Setting timeout so it starts after 500 milliseconds 
setTimeout(()=>{
console.log(`%c ${game()}`,"font-weight:500;font-size:16px;padding:10px 5px;");
},500);
/*
 Other Useful functions
*/

function Prompt(string){
  let playerChoice = prompt(string),condition = false;
  if(playerChoice == null) return Prompt(string);
 console.log(playerChoice);
 optionArr.forEach((elem)=>{
  if(playerChoice.toLowerCase() === elem)
   condition = true;
 });
 if(condition)
   return playerChoice;
 else
  return Prompt(string + "\n Wrong input please select choice between \n  Rock \n  Paper \n  Scissor");
}
function scoreBoard(){
  console.log(`%c Your Score: ${playerScore} \n Computer Score: ${computerScore}`,"background:blue;font-size:14px;color:white");
}
function Capitalize(string){
    string = string[0].toUpperCase() + string.slice(1).toLowerCase();
    return string;
}