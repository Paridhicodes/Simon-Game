var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern=[];
var currentLevel=1;
var flag=false;
startGame();
  function startGame(){
  $(document).keypress(function(){
    if(!flag)
    {
    nextSequence();
    flag=true;
    }
  });
  }




function nextSequence() {
  userClickedPattern=[];
  var randomNumber = Math.floor(Math.random() * 4);
  gamePattern.push(buttonColours[randomNumber])
  console.log(gamePattern);
  levelHeading();
  playSound(buttonColours[randomNumber]);
  animatePress(buttonColours[randomNumber]);
 
 
  
  
}





$(".btn").click(function () {
  handler(this);
});

function handler(element) {
  var userChosenColour = $(element).attr("id");
  $("#" + userChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length-1);
  
}


function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
      $("#"+currentColor).removeClass("pressed");
  },100);
}


function playSound(colorRandom) {
  $(document).ready(function () {
    switch (colorRandom) {
      case "red":
        var audio1 = new Audio("sounds/red.mp3");
        audio1.play();
        break;
      case "blue":
        var audio2 = new Audio("sounds/blue.mp3");
        audio2.play();
        break;
      case "green":
        var audio3 = new Audio("sounds/green.mp3");
        audio3.play();
        break;
      case "yellow":
        var audio4 = new Audio("sounds/yellow.mp3");
        audio4.play();
        break;
    }
  });
}

function checkAnswer(i){
  
      if(gamePattern[i]!=userClickedPattern[i]){
        
        console.log(userClickedPattern);
        var audionew = new Audio("sounds/wrong.mp3");
        audionew.play();
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        },200);
         restart();
       

      
  }
  if(gamePattern.length==userClickedPattern.length){
   
  setTimeout(function(){
    currentLevel++;
  levelHeading();
  nextSequence();
  },1000);
  
}
}


function levelHeading(){
  $("h1").html("Level "+currentLevel);
  
}

function restart(){
  $("h1").html("Game Over,Press A key to Restart");
  gamePattern = [];
  currentLevel=1;
  flag=false;
  startGame();
  
}
