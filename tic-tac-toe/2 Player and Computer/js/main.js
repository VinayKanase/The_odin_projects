let data = (function(){
    let _isComputer = false;
    let startBtn = document.getElementById("Start");
    startBtn.addEventListener("click",()=>{
        let select = document.getElementById("opponent");
        let errorMessage = document.querySelector(".errorMessage");
        errorMessage.textContent = "";
        if(select.value === "Select One Opponent"){
            errorMessage.textContent = "Select Your Opponent to Start Game";
        }else if(select.value === "computer"){
            _isComputer = true; 
            gameStart();
        }else if(select.value === "player 2"){
            _isComputer = false;
            gameStart();
        }
    });

    function getisComputer(){
        return _isComputer;
    }
    document.getElementById("mode").addEventListener("click",()=>{
        displayManager.toggleMode();
    });
    document.getElementById("info").addEventListener("click",()=>{
        if(document.querySelectorAll("section")[2].classList.contains("display-none"))
            displayManager.changeDisplayPage(2);
        else
            displayManager.changeDisplayPage(0);
    });
    document.getElementById("restartBtn").addEventListener("click",()=>{
        gameStart();
    });
    return {getisComputer};
})();
let displayManager = (function(){
    let playGround = document.querySelector(".playGround");
    function changeDisplayPage(pageNo){
        let sections = document.querySelectorAll("section");
        sections.forEach((section)=>{
            section.classList.add("display-none");
        });
        sections[pageNo].classList.remove("display-none");
    }
    function _changeHead(string){
            document.getElementById("message").textContent = string;
    }
    function clearPlayGround(){
        _changeHead("Player 1's Turn");
        let divs = playGround.querySelectorAll("div");
        divs.forEach((div)=>{
            div.textContent = "";
            div.addEventListener("click",()=>{
                if(div.textContent === ""){
                    if(data.getisComputer()){
                        let currPlayer = gameManager.getCurrentPlayer();
                        let otherPlayer = gameManager.getOtherPlayer();
                        _changeHead(`${otherPlayer.name}'s Turn`);
                        
                        if( currPlayer.name === "Player 1"){
                            div.textContent = currPlayer.mark;
                            
                            gameManager.addValuetogameBoard(div.dataset.position,currPlayer.mark);
                            let check = gameManager.checkWin();
                            if(check != undefined)
                              return  _declareWinnerOrTie(check);
                            playGround.style.pointerEvents = "none";
                               
                            //Computers Turn
                            setTimeout(() => {
                               currPlayer = gameManager.getCurrentPlayer();
                               otherPlayer = gameManager.getOtherPlayer()
                               _changeHead(`${otherPlayer.name}'s Turn`);
                                let compChoice = gameManager.ComputerChoice();
                                let compDiv = document.querySelector(`[data-position="${compChoice.i}${compChoice.j}"]`);
                                compDiv.textContent = "O";
                                gameManager.addValuetogameBoard(compDiv.dataset.position,currPlayer.mark);
                                let check = gameManager.checkWin();
                                if(check != undefined)
                                  return  _declareWinnerOrTie(check);
                             
                                playGround.style.pointerEvents = "all";
                            }, 200);
                        }
                    }
                    else if(!data.getisComputer()){
                        let currPlayer = gameManager.getCurrentPlayer();
                        let otherPlayer = gameManager.getOtherPlayer();
                        _changeHead(`${otherPlayer.name}'s Turn`);   
                        div.textContent = currPlayer.mark;
                        gameManager.addValuetogameBoard(div.dataset.position,currPlayer.mark);
                        let check = gameManager.checkWin();
                        if(check != undefined)
                            return _declareWinnerOrTie(check);
                    }
                }
            });
        });
    }
    function toggleMode(){
        document.body.classList.toggle("dark");
        return;
    }
    function _declareWinnerOrTie(player){
        playGround.style.pointerEvents = "none";
        setTimeout(() => {
            document.querySelector(".left").classList.add("over");
        }, 800);
        if(player.name === "tie"){
            _changeHead("Game Tie!!!");
            return;
        }
        _changeHead(player.name + " Wins!");
    }
    return {changeDisplayPage,clearPlayGround,toggleMode};
})();

let gameManager = (function(){
    let _gameBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    let _Player1 = {
        "name":"Player 1",
        mark : "X"
    };
    let _Player2 = {
        "name":"Player 2",
        mark : "O"
    }
    let _currentPlayer;
    function gameBoardreset(){
        _Player2.name = data.getisComputer() ? "Computer" : "Player 2";
        _gameBoard = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
    }
    function addValuetogameBoard(position,mark){
        _gameBoard[position.slice(0,1)][position.slice(1)] = String(mark);
    }
    function getCurrentPlayer(){
        if(_currentPlayer == undefined || _currentPlayer === _Player2){
            _currentPlayer = _Player1;
        } else if(_currentPlayer === _Player1){
            _currentPlayer = _Player2;
        }
        return _currentPlayer;
    }
    function getOtherPlayer(){
        if(_currentPlayer === _Player1)
            return _Player2;
        else if(_currentPlayer === _Player2)
            return _Player1;
    }
    function checkWin(gameBoard){
        if(gameBoard) _gameBoard = gameBoard;
        let tempRow = [],tempColumn = [],tempDiagonal = [];
        for(let i = 0; i < 3;i++){
            tempRow = [];
            tempColumn = [];
            tempDiagonal = [];
            //for elements in row
            for(let j = 0; j < 3; j++){
                tempRow.push(_gameBoard[i][j]);
            }
            if(tempRow.every(str => str === "X")){
                return _Player1;
            }else if(tempRow.every(str => str === "O")){
                return _Player2;
            }
            // for elements in column
            for(let k = 0; k < 3;k++){
                tempColumn.push(_gameBoard[k][i]);
            }
            if(tempColumn.every(str => str === "X")){
                return _Player1;
            }else if(tempColumn.every(str => str === "O")){
                return _Player2;
            }

            //for elements in diagnol
            for(let j = 0; j < 3; j++){
                tempDiagonal.push(_gameBoard[j][j]);
            }
            if(tempDiagonal.every(str => str === "X")){
                return _Player1;
            }
            else if(tempDiagonal.every(str=>str=== "O")){
                return _Player2;
            }

            if(_gameBoard[0][2] === _gameBoard[1][1] && _gameBoard[1][1] === _gameBoard[2][0] && _gameBoard[1][1] === "X"){
                return _Player1;
            }
            else if(_gameBoard[0][2] === _gameBoard[1][1] && _gameBoard[1][1] === _gameBoard[2][0] && _gameBoard[1][1] === "O"){
                return _Player2;
            }
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if(_gameBoard[i][j] == null){
                    return null;
                }
            }
        }
        return {
            name:"tie",
            mark:"tie"
        };  
    }
    function ComputerChoice(){
        let bestScore = -Infinity;
        let bestMove;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if(_gameBoard[i][j] === null){
                    _gameBoard[i][j] = "O";
                    let score = minimax(_gameBoard,0,false);
                    _gameBoard[i][j] = null;
                    if(score > bestScore){
                        bestScore = score;
                        bestMove = {i, j};
                    }
                }
            }
        }
        return bestMove;
    }
    return {gameBoardreset,addValuetogameBoard,getCurrentPlayer,getOtherPlayer,checkWin,ComputerChoice};
})();

function gameStart(){
    document.querySelector(".left").classList.remove("over");
    displayManager.changeDisplayPage(1);
    document.querySelector(".playGround").style.pointerEvents = "all";
    displayManager.clearPlayGround();
    gameManager.gameBoardreset();
}
let scores = {
    X:-1,
    O:+1,
    tie:0
}
function minimax(gameBoard, depth,isMaximizing){
    let check = gameManager.checkWin(gameBoard);
    if(check) {
        return scores[check.mark];
    }  
    if(isMaximizing){
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {   
                if(gameBoard[i][j] == null){
                    gameBoard[i][j] = "O";
                    let score = minimax(gameBoard,depth+1,false);
                    gameBoard[i][j] = null;
                    bestScore = max(score,bestScore);
                }
            }
        }
        return bestScore;
    }else{

        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {   
                if(gameBoard[i][j] == null){
                    gameBoard[i][j] = "X";
                    let score = minimax(gameBoard,depth+1,true);
                    gameBoard[i][j] = null;
                    bestScore = min(score,bestScore);
                }
            }
        }
        return bestScore;
    }
}

function max(a,b){
    if(a > b)
        return a;
    else 
        return b;
}
function min(a,b){
    if(a > b)
        return b;
    else
        return a;
}
