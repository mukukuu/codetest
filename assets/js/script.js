
var timeEl = document.getElementById("#timer");
var takequizbtn = document.getElementById("#start-btn");
var startpageEl = document.querySelector("#startpage");
var quizpage = document.querySelector("#quizpage");

var scores = 0;
var questionNow = -1;
var timer;
var timeremain = 0;

//----------questions

var question = document.getElementById("question");
var choices = document.getElementById("choices");
var choice1 = document.getElementById("1");
var choice2 = document.getElementById("2");
var choice3 = document.getElementById("3");
var choice4= document.getElementById("4");


var questions = [ 
    /* question 1 */
    {
        question: "How do we view the code inside a browser?",
        options: ['open the tool bar','exit out the browser','run code', 'dev tool'],
        answer: "dev tool"
    },

    /* question 2 */
    {
        question:"Which line of code can correctly links a CSS stylesheet?",
        options:['<link rel="stylesheet" href="adress" />', '<links ref="styleshet" href="adress" />', '<link rel="stylesheet" href="adress" /', '<link css="stylesheet" href="adress" />'],
        answer: '<link rel="stylesheet" href="adress" />'
    },

    /* question 3 */
    {
        question: "How to comment out a block of js codes on MAC?",
        options: ['/', '--command +++-', 'command + /', '/!--/'],
        answer: "command + /"
    },

    /* question 4 */
    {
        question: "Is it illegal to use code library?",
        options: ["illigal", "legal", "illegal", "I don't know"],
        answer: "legal"
    },

    /* question 5 */
    {
        question: "what is the most common reason that your code doesn't work?",
        options: ["messy typing", "typo", "no internet connection", "unsaved works"],
        answer: "typo"
    },
     
    /* question 6 */
       {
        question: "what is a 'Var' ?",
        options: ["variable", "variable function", "storage", "var input"],
        answer: "variable"
       }
        
];



//star timer----------------------------
var start = function() {
    quiztime = 80;
   document.getElementById("timer").innerHTML = quiztime;

    timer = setInterval(function() {
        quiztime--;
    document.getElementById("#timer").innerHTML = quiztime;
        if(quiztime <= 0) {
            clearInterval(timer);
            // endQuiz();
        }
    }, 1000);
    // nextQuestion();
  
}

timeEl.addEventListener("submit",start);

