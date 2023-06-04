

// initialization 
const boxes= document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newgameBtn = document.querySelector(".btn"); 
let p1=prompt("Enter Player-1 Name", "X");
let p2=prompt("Enter Player-2 Name", "O");
const name1= document.querySelector(".name1");
const name2= document.querySelector(".name2");




let currentPlayer;
let gameGrid;

const winposition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],

];

// function for initialise the game 

function initGame(){

    name1.innerText = p1;
    name2.innerText = p2;
    
    currentPlayer = p1 ;  // default value for current player
    gameGrid=["","","","","","","","",""]; //grid is empty 
  

    //update on ui (innitialy it is empty )
    boxes.forEach((box,index)=>{
         box.innerText="";
         boxes[index].style.pointerEvents="all"; // pointer is curser 

    //rmoving the added green color 
    //by adding the intial property of the boxes 
    box.classList=`box box${index+1}`;

    });

    newgameBtn.classList.remove("active"); // initialy butten hide 

    gameinfo.innerText =`Current Player - ${currentPlayer}`; // set game info

   





}

// function call 

 initGame();


// swap turn function 
function swapTurn()
{
    if(currentPlayer===p1)
    {
        currentPlayer=p2;
    }
    else
    {
        currentPlayer=p1;
    }

    // here we update the game info (heading that say which turn is going )
    gameinfo.innerText=`Current Player - ${currentPlayer}`;
}


function gameOver()
{
    let answer="";

    winposition.forEach((position)=>{
        // check all 3 boxes are non empty and should be same value

        if((gameGrid[position[0]]!=="" && gameGrid[position[1]]!=="" && gameGrid[position[2]]!=="")
        && (gameGrid[position[0]]===gameGrid[position[1]]) &&(gameGrid[position[1]]===gameGrid[position[2]]))
        {
            // check who is winner 
            if(gameGrid[position[0]]===p1)
            {
                answer=p1;
            }
           else answer=p2;

           //disable pointer when winner found 

           boxes.forEach((box)=>{
            box.style.pointerEvents="none";
           });

           //change the color of winner boxes 
           boxes[position[0]].classList.add("win");
           boxes[position[1]].classList.add("win");
           boxes[position[2]].classList.add("win");
        }
    });


    // when we got winner 
    if(answer!=="")
    {
        //change the game info
        gameinfo.innerText=`Winner Player - ${answer}`;
        newgameBtn.classList.add("active");
        return;
    }


    //check tie condition 

    let fillcount =0;

    gameGrid.forEach((box)=>{
        if(box!=="")
        {
            fillcount++;
        }

    });

    if(fillcount===9)
    {
        gameinfo.innerText=`Game Tied!`;
        newgameBtn.classList.add("active");
    }
    
};


// handle click function 
function handleClick(index)
{
    if(gameGrid[index]=="")
    {
        boxes[index].innerHTML=currentPlayer; // this update on UI
        gameGrid[index]=currentPlayer;        // this update our game grid trck
        boxes[index].style.pointerEvents="none"; // if value is there then pointer is not curser 
        //swap turn  
        swapTurn()

        // cheeck game is over 
        gameOver()  
          
    }
}


// add ecvent listner for each box 

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

newgameBtn.addEventListener("click",initGame);