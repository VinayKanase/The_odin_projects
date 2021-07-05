

const data = (function(){
    let player1Name = "";
    let player2Name = "";

    let playBtn = document.getElementById("play");
    playBtn.addEventListener("click",()=>{
        let player1NameInp = document.getElementById("player1Name");
        let player2NameInp = document.getElementById("player2Name"); 
        setData(player1NameInp, player2NameInp);
        console.log({player1Name,player2Name});
        StartGame();
    });
    function setData(player1NameInp, player2NameInp, player1MarkInp){
        player1Name = player1NameInp.value === "" ? "Player 1" : player1NameInp.value;
        player2Name = player2NameInp.value === "" ? "Player 2" : player2NameInp.value;
        return;
    }
    function getData(){
        return {player1Name, player2Name};
    }   
    return getData;
})();

let displayDOM = (function(){
    const playGround = document.querySelector(".gameBoard");
    const allPosition = playGround.querySelectorAll("div");
    const message = document.getElementById("messageText");
    let Player1,Player2;
    const updateHead = newMessage => message.textContent = newMessage;
    function clear(){
        allPosition.forEach(div => div.textContent = "");
    }
    function setPlayers(P1, P2){
        Player1 = P1;
        Player2 = P2;
        GameManager.setPlayers(P1, P2);
        GameManager.currentTurnOf = Player1;
    }
    playGround.addEventListener("click",e => {
        if(e.target.dataset.position){
            let temp = GameManager.currentTurnOf;
            let dataset = e.target.dataset.position;
            if(Player1.MarkedPostions.check(+dataset) || Player2.MarkedPostions.check(+dataset)) return;
            e.target.textContent = temp.mark;
            if(temp.name === Player1.name){
                Player1.MarkedPostions.add(dataset);
                GameManager.currentTurnOf = Player2;
                updateHead(`${Player2.name}'s Turn`);
            }else if(temp.name === Player2.name){
                Player2.MarkedPostions.add(dataset);
                GameManager.currentTurnOf = Player1;
                updateHead(`${Player1.name}'s Turn`);
            }
            let checkWin = GameManager.checkWin();
            if(typeof checkWin === "object") {
                setWinner(checkWin);
            }
            if(Player1.MarkedPostions.get().length + Player2.MarkedPostions.get().length === 9) return setWinner("Tie");
        }
    });
    function setWinner(WinnerPlayer){
        if(WinnerPlayer === "Tie"){
            updateHead("Match Tie");
            message.classList.add("font-lg");
            playGround.classList.add("blur");
            ResetGame();
            return;
        }
        playGround.classList.add("blur");
        updateHead(`${WinnerPlayer.name} Won`);
        message.classList.add("font-lg");
        ResetGame();
    }
    return {clear, setPlayers, updateHead};
})();
let GameManager = (function(){
    let Player1,Player2,currentTurnOf;
    function setPlayers(p1,p2){
        Player1 = p1;
        Player2 = p2;
        currentTurnOf = Player1;
        displayDOM.updateHead(`${Player1.name}'s Turn`);
    }
    function checkWin(){
        let positionsMarkedPly1 = Player1.MarkedPostions.get();
        let positionsMarkedPly2 = Player2.MarkedPostions.get();
         
        let check = checkConditionsupdateDOM(positionsMarkedPly1);
        if(check) return Player1;
        check = checkConditionsupdateDOM(positionsMarkedPly2);
        if(check) return Player2;

    }
    function checkConditionsupdateDOM(P){
        let temp1 = checkPos(P);
        let temp2 = checkPos(P,20,24);
        let temp3 = checkPos(P,30,34);
        if(temp1 || temp2 || temp3) return true;
        return false;
    }
    function checkPos(array,min = 10,max = 14){
        let temp = array.filter(elem => min < elem && elem < max);
        if(temp.length === 3){
            return true;
        }else{
            let temp2 = array.filter(elem => elem === 11 || elem === 22 || elem === 33);
            if(temp2.length === 3) return true; 
            else temp2 = array.filter(elem => elem === 11 || elem === 21 || elem === 31)
            if(temp2.length === 3) return true;
            else temp2 = array.filter(elem => elem === 12 || elem === 22 || elem === 32)  
            if(temp2.length === 3) return true;
            else temp2 = array.filter(elem => elem === 13 || elem === 23 || elem === 33)
            if(temp2.length === 3) return true;
        }
        return false;
    }
    return {setPlayers,checkWin};
})();

function StartGame(){
    document.getElementById("start").classList.add("off");
    document.getElementById("gamePlayground").classList.remove("off");
    document.querySelector(".gameBoard").classList.remove("blur");

    let Player1 = Player(data().player1Name,"X");
    let Player2 = Player(data().player2Name, "O");
    displayDOM.clear();
    displayDOM.setPlayers(Player1, Player2);
}
function ResetGame(){
 let resetBtn = document.querySelector(".resetBtn button");
 resetBtn.parentElement.classList.remove("off");
 resetBtn.addEventListener("click",()=>{
    StartGame();
 });
}
function Player(name,mark){
    let MarkedPostionsArr = [];
    const MarkedPostions = { 
        add : element =>{
            MarkedPostionsArr.push(+element);
        },
        get : ()=>{
            return MarkedPostionsArr;
        },
        check :  element =>{
            let result = MarkedPostionsArr.find(elem => elem === element);
            return !!result; 
        }
    } 
    return {name, mark, MarkedPostions};
}