// timer variable
var timerEl = document.getElementById('time-left');
var timeLeft = 0;
var highscoreLink = document.getElementById("highscore-header");
var questionArea = document.getElementById("questions");
var answerBoxesArea = document.getElementById("answer-boxes");
var correctWrongArea = document.getElementById("correct-wrong");
var questionNumber = 0;

//question array
var questionArr = [
    {
        question:"Commonly used data types DO NOT include:",
        answerChoices:["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer:"3. alerts"
    },
    {
        question:"The condition in an if/else statement enclosed with",
        answerChoices:["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        correctAnswer:"3. parentheses"
    },
    {
        question:"Arrays in Javascript can be used to store:",
        answerChoices:["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer:"4. all of the above"
    },
    {
        question:"String values must be enclosed within _____ when being assigned to variables",
        answerChoices:["1. comma", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer:"4. parentheses"
    },
    {
        question:"A very useful tool used during development and debugging for printing content to the debugger is:",
        answerChoices:["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer:"4. console.log"
    }
]

// TODO add endgame function
var endgame = function () {
    console.log("LOL we should have put an endgame")
    stopCountdown();
}

// pregame function
var preGame = function () {

    // adding pregame header data
    var pregameHeader = document.createElement("h1");
    pregameHeader.className = "pregameHeader";
    pregameHeader.textContent = "Coding Quiz Challenge";
    questionArea.appendChild(pregameHeader);

    // adding paragraph explaining the game
    var pregameP = document.createElement('p');
    pregameP.className = "pregameParagraph"
    pregameP.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by 10 seconds!"
    questionArea.appendChild(pregameP);

    // inserting the start button that starts the game
    var startGameButton = document.createElement("div");
    startGameButton.className = "buttons start-game";
    startGameButton.id = "start-game-id"
    startGameButton.textContent = "Start Game";
    answerBoxesArea.appendChild(startGameButton);

    // inserting interactivity with the start button
    var startGameButtonEl = document.getElementById("start-game-id");
    startGameButtonEl.addEventListener("click", startGame);
};

// stopping all counttdowns
function stopCountdown() {
    for(i=0; i<10000; i++) {
        window.clearInterval(i);
    }
};

var timerFunction = function() {
    if (timeLeft > 0) {
        timeLeft--;
        timerEl.textContent = timeLeft;
    } else {
        timeLeft = 0;
        timerEl.textContent = timeLeft;
        stopCountdown();
        endgame();
    }
} 

// interval for countdownfunction
var countdown = function(){setInterval(timerFunction,1000);}


function startGame() {
    console.log("test startGame")
    timeLeft = 75;
    timerEl.textContent = timeLeft;
    countdown();
    // for loop for all questions (maybe switch for the final question?)
    // reseting question number to 1 (or 0 in arrays)
    questionNumber = 0;
    questionHandler(questionNumber);
}
    
function answerCheck(clickedId) {
    console.log(clickedId)
    if (clickedId === correctAnswer) {
        console.log("you got it right!")
        questionNumber++;
        questionHandler(questionNumber);
    } else {
        console.log("you got it wrong!")
        timeLeft = timeLeft - 10;
        timerEl.textContent = timeLeft;
        questionNumber++;
        questionHandler(questionNumber);
    }
};

//function to handle each question
function questionHandler(i) {
    // creating if else statement to handle last question
    if (i < questionArr.length) {
        // clean main area to insert questions immediately after
        questionArea.innerHTML = "";
        answerBoxesArea.innerHTML = "";
        correctWrongArea.innerHTML = "";
        questionArea.textContent = questionArr[i].question;
        correctAnswer = questionArr[i].correctAnswer;
        //for loop to enter each answerchoice
        for (var j = 0; j < questionArr[i].answerChoices.length; j++) {
            var answerButton = document.createElement("div");
            answerButton.className = "buttons";
            answerButton.id = questionArr[i].answerChoices[j];
            answerButton.textContent = questionArr[i].answerChoices[j];
            answerButton.setAttribute('onclick', "answerCheck(this.id)");
            answerBoxesArea.appendChild(answerButton);
        }
    } else {
        endgame();
    }
};



    


// TODO add display highscores function

var displayHighScore = function() {
    //startGame();
    stopCountdown();
}


// TODO add answering questions function (removing previous questions and answer)

// TODO add right wrong display 1 second, with "Question #"

// TODO add localStorage functions and loading

highscoreLink.addEventListener("click", displayHighScore);
preGame();