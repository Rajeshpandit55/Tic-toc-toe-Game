const boxes=document.querySelectorAll('.box');
const gamePlayer=document.querySelector('.game-player');
const newGame=document.querySelector('.btn');


let currentPlayer;
let gameGrid;

const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function initialGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];

    boxes.forEach((box,index)=>{

            box.innerText="";

            boxes[index].style.pointerEvents="all";

            box.classList=`box box${index+1}`;
    });
    newGame.classList.remove("active");
    gamePlayer.innerText=`Current Player-${currentPlayer}`;
}

initialGame();

function swapTurnPlayer(){
    if(currentPlayer==="X"){
        currentPlayer="0";
    }else{
        currentPlayer="X"
    }
    gamePlayer.innerText =`Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer="";
    winningPosition.forEach((position)=>{

            if((gameGrid[position[0]]!==""||gameGrid[position[1]]!==""||gameGrid[position[2]]!=="")&&(gameGrid[position[0]]===gameGrid[position[1]] && gameGrid[position[1]]===gameGrid[position[2]]) ){
            
            
                if(gameGrid[position[0]]==="X"){
                    answer="X";
                }else{
                    answer="0";
                }

                boxes.forEach((box)=>{
                    box.style.pointerEvents="none";
                })
                
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            
            }
        
    });

    // iska mltb we have a winner
    if(answer!==""){
        gamePlayer.innerText=`Winner Player - ${answer}`;
        newGame.classList.add("active");
        return;
    }

    // check karo agar game draw kar gaya ho tab
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!=""){
            fillCount++;
        }
    })
    if(fillCount==9){
        gamePlayer.innerText="Game Tied !";
        newGame.classList.add("active");
    }
}


function handleClick(index){
    if(gameGrid[index]===""){
        // to here for UI
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";

        swapTurnPlayer();
        checkGameOver();
    }
}

newGame.addEventListener("click",initialGame);

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
})