var buttonColors = ["#red","#green","#yellow","#blue"];
// var audios = [new Audio("./sounds/red.mp3"),new Audio("./sounds/green.mp3"),new Audio("./sounds/yellow.mp3"),new Audio("./sounds/blue.mp3")];
var wrongAudio = new Audio("./sounds/wrong.mp3");
var buttonSequence = [];
var answerSequence = [];
var level = 0;
var gameOver = false;
function playSound(currentButton){
  var sound = new Audio("./sounds/"+currentButton.attr("id")+".mp3");
  sound.play();
}
function lose (){
  gameOver = true;
  answerSequence=[];
  buttonSequence=[];
  level = 0;
  $("h1").text("Game Over! Press any key to play again");
}
$(document).keydown(function(event){
    if(event.key=='a'){
        setTimeout(nextSequence,1000);
        $(document).off("keydown");
    }
});
var i =0;
function nextSequence(){   
    answerSequence = [];
    i=0;
    level++;
    $("h1").text("Level " + level);
    var currentButton = $(buttonColors[Math.floor(Math.random() * 4)]);
    playSound(currentButton);
    currentButton.addClass("pressed");
    setTimeout(function(){currentButton.removeClass("pressed")},100);
    buttonSequence.push(currentButton.attr("id"));
} 
$(".btn").click(function(event){
  var userChosenColor = $(event.target).attr("id");
  $(event.target).addClass("pressed");
  playSound($(event.target));
  setTimeout(function(){$(event.target).removeClass("pressed")},100);
  answerSequence.push(userChosenColor);
  if(answerSequence.length <= level){
    if(answerSequence[i]!=buttonSequence[i]){
      wrongAudio.play();
      $("body").addClass("game-over");
      setTimeout(function(){$("body").removeClass("game-over")},200);
      lose();
    }
    else 
      i++;
  }
  if(answerSequence.length == level){
    if(!gameOver){
      setTimeout(nextSequence,1000);
    }
    else{
      gameOver = false;
      $(document).keydown(function(){
        setTimeout(nextSequence,1000);
        $(document).off("keydown");
      });
    }
  }
    
});
