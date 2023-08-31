let player1Dice = document.querySelector(".dice .img1");
let player2Dice = document.querySelector(".dice .img2");
let titleText = document.querySelector("h1");
let dice = ["./images/dice1.png","./images/dice2.png","./images/dice3.png","./images/dice4.png","./images/dice5.png","./images/dice6.png"];
let button = document.querySelector(".btn");
function rollDices(){
    let player1Score = Math.ceil(Math.random()*6);
    let player2Score = Math.ceil(Math.random()*6);
    player1Dice.setAttribute("src",dice[player1Score-1]);
    player2Dice.setAttribute("src",dice[player2Score-1]);
    if(player1Score > player2Score){
        titleText.textContent = "Player 1 wins!";
    }
    else if(player1Score < player2Score){
        titleText.textContent = "Player 2 wins!";
    }
    else{
        titleText.textContent = "Draw"
    }
}
button.addEventListener("click",rollDices);
