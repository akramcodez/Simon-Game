let userSeq = [];
let gameSeq = [];
let allScore = [];

let colors = ["red", "yellow", "green", "blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;
    console.log("Game started");
    levelUp();
  }
});

function levelUp() {
  userSeq = [];
  level++;
  h2.innerHTML = `Level - ${level}`;

  let randNum = Math.floor(Math.random() * 3);
  let randColor = colors[randNum];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  gameFlash(randBtn);
}

function gameFlash(btn) {
  btn.classList.add("gameFlash");
  setTimeout(() => {
    btn.classList.remove("gameFlash");
  }, 250);
};

let allBtn = document.querySelectorAll(".btn");
for (Btn of allBtn) {
  Btn.addEventListener("click", btnPress);
}
function btnPress() {
  
  let btn = this; 
  userFlash(btn); 

  userColor = btn.getAttribute("id");
  userSeq.push(userColor); 

  checkAns(userSeq.length - 1); 
}


function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 150);
}

let body = document.querySelector("body");

function checkAns(idx) {

  if (userSeq[idx] === gameSeq[idx]) {

    if (userSeq.length == gameSeq.length) { 
      setTimeout(levelUp, 1000); 
    }
  } else {
    h2.innerHTML = `<p>Game Over! <b>Level - ${level}</b> <br> press any key to start</p>`; 
    body.classList.add("colorChange"); 
    setTimeout(function (){
        body.classList.remove("colorChange"); 
    },500);
    let highScore = level;
    allScore.push(highScore);
    reset();
  }
};

let newp = document.createElement("p");

function reset (){
  started = false;
  level = 0;
  userSeq = [];
  gameSeq = [];

  let maxScore = Math.max(...allScore);

  newp.innerHTML = `High score is level ${maxScore}`;
  newp.style.fontSize = "1.5rem";
  newp.style.marginTop = "0.5rem";
  body.appendChild(newp);
}

