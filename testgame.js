var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern;
var userClickedPattern;
var currentLevel=1;


newGame();
function newGame(){
    gamePattern=new Array();
    userClickedPattern=new Array();
    currentLevel=1;
    startGame();
    
}
function startGame(){
    $(document).keydown(function(){
        console.log(this);
        gameFacilitator(true);
    });
}

nextSequence();

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  
  gamePattern.push(buttonColours[randomNumber]);
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


function userResponses(){
    
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
      }
      

}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(){
    for(var i=0;i<gamePattern;i++){
        if(gamePattern[i]!=userClickedPattern[i]){
            gameFacilitator(false);
            break;
        }
       
    }
    currentLevel++;
    return true;
}

function gameFacilitator(result){
    if(result==true){
        nextSequence();
        for(var i=0;i<currentLevel;i++){
        userResponses();
        var check=checkAnswer();
        if(check==false){
            gameFacilitator(false);
        }
        } 
    }
    else{
        var audionew = new Audio("sounds/wrong.mp3");
        audionew.play();
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    // newGame();
    }
}




