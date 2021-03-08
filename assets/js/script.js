// timer variable
var timer = 0;
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
// TODO add timer function

// TODO add display highscores function
var highscoreLink = document.querySelector("#highscore-link");

var displayHighScore = function() {
    console.log(questionArr[4].answerChoices[2]);
};
// TODO add display questions functions

// TODO add endgame function

// TODO add answering questions function (removing previous questions and answer)

// TODO add right wrong display 1 second, with "Question #"

// TODO add localStorage functions and loading

highscoreLink.addEventListener("click", displayHighScore)