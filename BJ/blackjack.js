const ca = document.getElementById("card");
const sc = document.getElementById("score");
const ha = document.getElementById("hand");
const re = document.getElementById("result");


const drawButton = document.getElementById("draw");
const finishButton = document.getElementById("finish");
const resetButton = document.getElementById("reset");

let card = ['J','Q','K'];
for (let i = 10; i >= 2; i -= 1){
    card.unshift(String(i));
}
card.unshift('A');


var hand = [];
var index = -1;
var score_min = 0;
var score_max = 0;
var cntA11 = 0;

var fin = false;

function draw(){
    if (fin) return;
    let index = Math.floor(Math.random()*13);
    ca.textContent = `card : ${card[index]}`;
    hand.push(card[index]);
    ha.textContent = `hand : ${hand.join(" ")}`;
    if (10 <= index && index <= 12){
        score_min += 10;
        score_max += 10;
    } else if (index == 0){
        score_min += 1;
        if (score + 11 > 21){
            score_max += 1;
        } else {
            score_max += 11;
            cntA11 += 1;
        }
    }
    else {
        score_min += index + 1;
        score_max += index + 1;
    }
    if (score_max > 21 && cntA11 > 0){
        score_max -= 10;
        cntA11 -= 1;
    }
    sc.textContent = `score : min ${score_min}, max ${score_max}`;
    if (score_min > 21){
        fin = true;
        sc.textContent = `score : ${score_min} Bust !!!`;
        re.textContent = `BUST !!!`;
        re.style.color = "red";
        re.style.fontSize = "80px";
    }
}

function finish(){
    if (fin) return;
    fin = true;
    re.textContent = `score : ${score_max}`;
    re.style.color = "blue";
    re.style.fontSize = "80px";
}

function reset(){
    fin = false;
    score_min = 0;
    score_max = 0;
    re.textContent = "";
    ca.textContent = "card :";
    ha.textContent = "hand :";
    sc.textContent = "score : 0";
    hand = [];
}

drawButton.onclick = draw;
finishButton.onclick = finish;
resetButton.onclick = reset;