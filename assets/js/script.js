// timer variable
var timerEl = document.getElementById('time-left');
var timeLeft = 0;
var highscoreLink = document.getElementById("highscore-header");
var questionArea = document.getElementById("questions");
var answerBoxesArea = document.getElementById("answer-boxes");
var correctWrongArea = document.getElementById("correct-wrong");
var questionNumber = 0;
var highscoreArr = [];
var enteredInitials = "";
var currentScore = {
    playerInitials: "",
    Score:0
};
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
        correctAnswer:"3. quotes"
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
    questionArea.innerHTML = "";
    answerBoxesArea.innerHTML = "";
    correctWrongArea.innerHTML = "";

    var allDone = document.createElement("div");
    allDone.className = "pregameHeader";
    allDone.textContent = "All Done!"
    questionArea.appendChild(allDone);

    var postgameP = document.createElement('p');
    postgameP.className = "pregameParagraph";
    postgameP.textContent = "Your final score is " + timeLeft;
    questionArea.appendChild(postgameP);

    var formDiv = document.createElement("div");
    formDiv.innerHTML = "<form id='initials-form'><div class='form-group'><input type='text' name='initials-name' placeholder='Enter your initials here!' /></div><div class='form-group'><button class='buttons center' id='save-highscore' type='button'>Save Highscore!</button></div></form>"
    questionArea.appendChild(formDiv);

    initialsInput();
}

// function to acknowledge the newly created save highscore button and add eventlistener
function initialsInput() {
    var saveHighscoreBtn = document.querySelector('#save-highscore');
    console.log("initialsInput function is referenced");
    saveHighscoreBtn.addEventListener("click", saveHighscoreFunc);
}

// inputing the entered initials
function saveHighscoreFunc() {
    enteredInitials = document.querySelector("input[name='initials-name']").value;
    enteredInitials = enteredInitials.toUpperCase();
    console.log(enteredInitials);
    if (enteredInitials.length != 2) {
        alert("You need to enter your two letter initials!");
        endgame();
    }
    else {
        currentScore.playerInitials = enteredInitials;
        currentScore.Score = timeLeft;
        console.log(currentScore);
        highscoreArr.push(currentScore);

        //stringifying the highscore array to be saved in localstorage
        var stringifiedHighscoreArr = JSON.stringify(highscoreArr);
        localStorage.setItem("savedScoreArr", stringifiedHighscoreArr);
        displayHighScore();
    };
}

// pregame function
var preGame = function () {

    // clear fields before each game starts
    questionArea.innerHTML = "";
    answerBoxesArea.innerHTML = "";
    correctWrongArea.innerHTML = "";

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
    startGameButton.className = "buttons center";
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

// function for removing correctwrong prompt after 1 seconds
var removeBottom = function(){setTimeout(function() {correctWrongArea.innerHTML = "";},1000)};

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
        correctWrongArea.textContent = "You got question #" + questionNumber + " correct!"
        removeBottom();
    } else {
        console.log("you got it wrong!")
        timeLeft = timeLeft - 10;
        timerEl.textContent = timeLeft;
        questionNumber++;
        questionHandler(questionNumber);
        correctWrongArea.textContent = "You got question #" + questionNumber + " wrong."
        removeBottom();
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
function obtainSavedScores () {
    highscoreArr = localStorage.getItem("savedScoreArr");
    highscoreArr = JSON.parse(highscoreArr);
};

var displayHighScore = function() {
    questionArea.innerHTML = "";
    answerBoxesArea.innerHTML = "";
    correctWrongArea.innerHTML = "";

    var scoreboardTitle = document.createElement("div");
    scoreboardTitle.className = "pregameHeader";
    scoreboardTitle.textContent = "Highscore List"
    questionArea.appendChild(scoreboardTitle);

    for (var i = 0; i < highscoreArr.length; i++) {
        var individualScore = document.createElement("div");
        individualScore.className = "pregameParagraph";
        individualScore.textContent = highscoreArr[i].playerInitials + " - " + highscoreArr[i].Score;
        questionArea.appendChild(individualScore);
    };

    var goBackBtn = document.createElement("div");
    goBackBtn.className = "buttons center";
    goBackBtn.textContent = "Start Over";
    answerBoxesArea.appendChild(goBackBtn);
    goBackBtn.addEventListener("click", preGame);

    var clrBoard = document.createElement("div");
    clrBoard.className = "buttons center";
    clrBoard.textContent = "Clear scoreboard";
    answerBoxesArea.appendChild(clrBoard);
    clrBoard.addEventListener("click", clearScoreboard);

}

function clearScoreboard() {
    highscoreArr = [];
    var stringifiedHighscoreArr = JSON.stringify(highscoreArr);
    localStorage.setItem("savedScoreArr", stringifiedHighscoreArr);
    displayHighScore();
}
// TODO add localStorage functions and loading



highscoreLink.addEventListener("click", displayHighScore);
obtainSavedScores();
preGame();