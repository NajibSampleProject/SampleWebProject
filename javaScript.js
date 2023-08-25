var playing = false;
var score;
var action;
var timeremaining;

var correctAnswer;



document.getElementById("startreset").onclick = function(){
  if(playing == true){
    location.reload();
  } else{

    //change mode to playing
    playing = true;

    //Initially set score to 0
    score = 0;
    document.getElementById("scorevalue").innerHTML = score;

    //Show the time remaining box 
    show("timeremaining");

    // initial time in seconds
    timeremaining = 60;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    hide("gameover");

    //Change button to Reset Game
    document.getElementById("startreset").innerHTML = "Reset Game";

    //Start countdown 
    startCountdown();


    //Generate Q&A
    generateQA();
  }
  
} 



// Defined Functions
function startCountdown(){
  action = setInterval(function(){
    timeremaining -= 1;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    if(timeremaining == 0){
      //gameover
      stopCountdown();

      //show the game over sign
      show("gameover");
      document.getElementById("gameover").innerHTML = "<p>GAME OVER!</p> <p>YOUR SCORE IS: "+score+"</p>";
      
      //hide the time box
      hide("timeremaining");

      // hide the correct
      hide("correct");

      // hide the try again
      hide("wrong");

      // Changing the playing mode to variable
      playing = false;
      document.getElementById("startreset").innerHTML = "Start Game";
    }
  }, 1000);
}



//Function Sections Are Here!

//Stop Countdown Function
function stopCountdown(){
  clearInterval(action);
}

// hide function
function hide(Id){
  document.getElementById(Id).style.display = "none";
}

// show function
function show(Id){
  document.getElementById(Id).style.display = "block";
}


// Generate Q&A
function generateQA(){
  var x; 
  var y;
  x = Math.round((Math.random()*9) + 1);
  y = Math.round((Math.random()*9) + 1);
  correctAnswer = x * y;
  
  document.getElementById("questions").innerHTML = x+"X"+y;

  var correctPosition = Math.round((Math.random()*3) + 1);
  document.getElementById("box"+correctPosition).innerHTML = correctAnswer;

  // fill the other boxes with wrong anwers
  var answers = [correctAnswer];
  for(i=1; i<5; i++){
    if(i !== correctPosition){
      var wrongAnswer;
       do{wrongAnswer = Math.round((Math.random()*9) + 1) * Math.round((Math.random()*9) + 1);} while(answers.indexOf(wrongAnswer)>-1){
        document.getElementById("box"+i).innerHTML = wrongAnswer;

        answers.push(wrongAnswer);
      }
    }
  }
}

        // clicking on answer box
        for(i=1; i<5; i++){
          document.getElementById("box"+i).onclick = function(){
            if(playing == true){
              if(this.innerHTML == correctAnswer){
                // correct
                score++;
                document.getElementById("scorevalue").innerHTML = score;
  
                // hide the wrong box and show the correct box
                hide("wrong");
                show("correct");
                setTimeout(() => {
                  hide("correct")
                }, 1000);
                generateQA();
              } else{
                hide("correct");
                show("wrong");
                setTimeout(() => {
                  hide("wrong");
                }, 1000);
              }
            }
          }
        }
       
