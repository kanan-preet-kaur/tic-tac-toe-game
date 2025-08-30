console.log("Welcome to Tic Tac Toe");
let audioturn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let isgameOver = false;
let gameState = "loading";
changeState(gameState);


setTimeout(()=>{
    gameState = "playing";
    changeState(gameState);
},2000)

//function to change gameState
function changeState(state){
    document.querySelectorAll(".screen").forEach((s)=>s.style.display = "none");
    document.getElementsByClassName(state)[0].style.display = "flex";
}

let turn = "X";
//function to change the turn
const changeTurn = ()=> {
    return turn==="X"?"O":"X";
};

//funtion to check for draw
const checkDraw = ()=>{
    let boxTexts = Array.from(document.getElementsByClassName("box-text"));
    let isDraw = boxTexts.every((e) => e.innerText!="")
     if( isDraw && gameState != "winner"){
         document.querySelector(".winner .info").innerText = "It's a Draw!";
         isgameOver = true;
         setTimeout(()=>{
            gameover.play();
            gameState = "winner";
            changeState(gameState);
        },500);
    }
};
//function to check a win
const checkWin = ()=> {
    let boxTexts = document.getElementsByClassName("box-text");
    let wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    wins.forEach(e => {
        if( (boxTexts[e[0]].innerText === boxTexts[e[1]].innerText) && (boxTexts[e[1]].innerText === boxTexts[e[2]].innerText) && (boxTexts[e[0]].innerText !== "") ){
            document.querySelector(".winner .info").innerText = boxTexts[e[0]].innerText + " won!";
            isgameOver = true;
            setTimeout(()=>{
                gameover.play();
                gameState = "winner";
                changeState(gameState);
            },500);
        }     
    })
}

//Game logic ->
let boxes = document.querySelectorAll(".box");
Array.from(boxes).forEach(element => {
    let boxText = element.querySelector(".box-text");
    element.addEventListener("click",()=>{
        if(boxText.innerText === "" && !isgameOver){
            boxText.innerText = turn;
            turn = changeTurn();
            audioturn.play();
            checkWin();
            checkDraw();
            if(!isgameOver)
                document.querySelector(".info").innerText = "Turn for "+turn;
        }
    })
});

//reset button
document.querySelector("#reset").addEventListener("click",() => {
    window.location.reload();
});
