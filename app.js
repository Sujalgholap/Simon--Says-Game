let gameseq=[];
let userseq=[];
let btns = ["one","two","three","four"];

let started = false;
let level=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game is started");
        started=true;

        levelup();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelup() {
    userseq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let ranIdx = Math.floor(Math.random()*3);
    let ranColor = btns[ranIdx];
    let ranBtn = document.querySelector(`.${ranColor}`);
    gameseq.push(ranColor);
    console.log(gameseq);
    // console.log(ranIdx);
    // console.log(ranColor);
    // console.log(ranBtn);
    gameFlash(ranBtn);
}

function checkAns(idx){
    // console.log("curr level : ", level);
    

    if(userseq[idx] === gameseq[idx]) {
        if(userseq.length == gameseq.length){
            setTimeout(levelup(),1000);
        }
        console.log("same values");
    }
    else{
        h2.innerHTML = `Game Over! Your score was <b${level}></b> Press any key to start` ;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },500);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkAns(userseq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
} 

let highScore = 0;

function updateHighScore() {
  if (level > highScore) {
    highScore = level;
    const highScoreText = document.querySelector('#high-score');
    highScoreText.textContent = `High Score: ${highScore}`;
  }
}

function reset(){
    started=false;
    userseq=[];
    gameseq=[];
    level=0;
}