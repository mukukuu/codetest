

var userAnswers = ["","","","",""];
var Correctanswer = 0;
var userScore = "";
var questionIndex = 0;
//----------timer
var timerInit = 0;
var timeLeft = 120;

var questionPrompt = $('#question-prompt');
var ansContainEl = $('#answer-buttons');

//---------btns
var startButton = $('#start-btn');
var prevButton = $('#prev-btn');
var nextButton = $('#next-btn');
var submitButton = $('#submit-btn');


//----------questions options btns
$(ansContainEl).on('click',selectAns)

// start button 
$(startButton).on('click',startQuiz)

// next button 
$(nextButton).on('click',nextQuest)

// prev button 
$(prevButton).on('click',prevQuest)

// submit button 
$(submitButton).on('click',results)


//------question array
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


//---------------------------startQuiz function
function startQuiz(){
    starTimer = 1;
    randQuestions = shuffle(questions);
    $(startButton).addClass('hide');
    $(questionPrompt).text(randQuestions[questionIndex].question);

    questions[questionIndex].options.forEach(ans => {

        let button = $("<button>")

        // create unique id to assign to each multiple choise option button
        let buttonId = uniqueId(ans);

        // button appearance using bootstrap
        $(button).addClass('btn btn-outline-dark btn-block chosen');

        // give each button a unique id using the answer it represents
        $(button).attr("id", buttonId);

        // add answer text to button
        $(button).text(ans);

        // append button to answer-button div area
        $("#answer-buttons").append(button);
    })

    // removing hide class to show first quiz question answers in answer field
    $(ansContainEl).removeClass('hide');

    // removing hide class 
    $(nextButton).removeClass('hide');
}



function selectAns(e){
 // select unanswered questions
if(userAnswers[questionIndex] === "") {

if(e.target !== e.currentTarget) {

// store answer in userAnswer array
userAnswers.splice(questionIndex, 1, e.target.textContent);
let ansId = uniqueId(questions[questionIndex].answer);
// compare the target button id with the correct id
if(e.target.id == ansId) {

// if the answer is correct show green styling
$('#'+e.target.id).addClass('btn-success');
$('#'+e.target.id).removeClass('btn-outline-dark');
 userCorrect++;
 }else{
// if the answer is incorrect, then show red styling
$('#'+e.target.id).addClass('btn-danger'); 
$('#'+e.target.id).removeClass('btn-outline-dark');

// minus 30 seconds off the clock
    timeremain -= 30;
}
}
e.stopPropagation();
}
}

//----------------------function to get to next question
function nextQuest(){
//  remove previous multiple choise answer
resetQ()

let qi = 1;

// keeps track of what question user is on.
questionState(qi)

$(questionPrompt).text(randQuestions[questionIndex].question);

 questions[questionIndex].options.forEach(ans => {

// create a new button element for each loop 
let button = $("<button>")

// create unique id option button
let buttonId = uniqueId(ans);
// add button bootstrap classes 
   $(button).addClass('btn btn-outline-dark btn-block chosen');

// give button a unique id 
   $(button).attr("id", buttonId);

// add answer text to button
        
   $(button).text(ans);

// append button to answer-button div area
   $("#answer-buttons").append(button);
    })
// call prevAnsStyle to check if question has already been aswered
    prevAnsStyle()
   if(questionIndex == 1) {
     $(prevButton).removeClass('hide');

    }
// adding hide class to the next button 
    if(questionIndex > 3) {
        $(nextButton).addClass('hide');
        $(submitButton).removeClass('hide');
    }
}



//-----------function to render previous questions
function prevQuest(){

//  remove previous answer options
resetQ()
let qi = -1;
questionState(qi)

$(questionPrompt).text(randQuestions[questionIndex].question);

questions[questionIndex].options.forEach(ans => {

let button = $("<button>")

// add id
let buttonId = uniqueId(ans);

 $(button).addClass('btn btn-outline-dark btn-block chosen');
// add id to btn
$(button).attr("id", buttonId);
$(button).text(ans);

$("#answer-buttons").append(button);
})

prevAnsStyle()

if(questionIndex == 0) {

$(prevButton).addClass('hide');
    }

if(questionIndex < 4) {
$(nextButton).removeClass('hide');
$(submitButton).addClass('hide');
    }
}


//-------------------function to render style
function prevAnsStyle() {
    if(userAnswers[questionIndex] != "") {
        
        let prevAnsId = uniqueId(userAnswers[questionIndex])
            //----id for correct one
        let ansId = uniqueId(questions[questionIndex].answer);

        // stylings for right and wrong answers 
        if(prevAnsId == ansId) {

            // if the answer was correct, then show green styling
            $('#'+prevAnsId).addClass('btn-success');

        }else{
            // else, then show previous red styling
            $('#'+prevAnsId).addClass('btn-danger'); 
        }
    }
}

function results() {

    userScore = ((userCorrect/userAnswers.length) * 100).toFixed(1);

    resetQ()

    var resultDiv = $("<div>");
    var lineDiv = $("<div>"); 
    var brk = $("<br/>");
    var scoreHist = $("<ul>");
    var formSave = $("<div>");
    var formLable = $("<label>");
    var formInput = $("<input>");
    var formSmall = $("<small>");
    var formBtns = $("<div>");
    var formSaveBtn = $("<button>");
    var formRetryBtn =  $("<button>");
    var formClearBtn =  $("<button>");

//------------------------------------------assignment 
    // add classes
    $(resultDiv).addClass('card-title');
    $(lineDiv).addClass('line');
    $(scoreHist).addClass('list-group list-group-flush hide');
    $(formSave).addClass('form-group');

    $(scoreHist).attr("id", "score-hist");

    // show user's current score
    $(resultDiv).text("Your Score: " + userScore + "%");
    $(scoreHist).text("Score History:");

    $("#quiz-container").append(resultDiv,lineDiv,brk,scoreHist,formSave,formBtns);

    // add classes to style the results section from elements
    $(formInput).addClass('form-control');
    $(formSmall).addClass('form-text text-muted');
    //
    $(formBtns).addClass('form-grp-btns');

    // add attributes the form countrols 
    $(formSave).attr("id", "form-save-score");
    $(formInput).attr("placeholder", "Your Initials");
    $(formBtns).attr("id", "form-control-btn");
    $(formInput).attr("id", "form-input-init");
    $(formLable).text("Enter Initials");
    $(formSmall).text("Click Save to register score");

    // append form in the card-body container
    $("#form-save-score").append(formLable,formInput,formSmall);

    // add bootstrap classes to the form buttons
    $(formSaveBtn).addClass('btn btn-outline-dark');
    $(formRetryBtn).addClass('btn btn-outline-dark');
    $(formClearBtn).addClass('btn btn-outline-danger hide');
    
    // add type attributes for acces
    $(formSaveBtn).attr("type", "submit");
    $(formRetryBtn).attr("type", "button");
    $(formClearBtn).attr("type", "button");

    // add form button controls id
    $(formSaveBtn).attr("id", "save-btn");
    $(formRetryBtn).attr("id", "retry-btn");
    $(formClearBtn).attr("id", "clear-btn");

    // add form button controls names in viewport
    $(formSaveBtn).text("Save");
    $(formRetryBtn).text("Retry");
    $(formClearBtn).text("Clear");

    // append save button 
    $("#form-control-btn").append(formSaveBtn,formRetryBtn,formClearBtn);

    // event listener on form-save-btn
    $("#form-control-btn").on('click',formControlHandler);

}

//--------------form handler 
function formControlHandler(e){
    
 if(e.target !== e.currentTarget) {

 if(e.target.id == "save-btn") {

$('#'+e.target.id).addClass('hide');
            
 $('#clear-btn').removeClass('hide');

$('#form-save-score').addClass('hide');

//----save data to localstorage

//----arrays
var results = [];
var prevResults = [];
var quizresult = [];
var userIn = $('#form-input-init').val();

quizresult.push(userScore);
quizresult.push(timeremain);
results.push(quizresult);

if (localStorage.getItem(userIn) == null){
    localStorage.setItem(userIn,JSON.stringify(results));
    }else{                
     for( var i = 0; i < localStorage.length; i++) {
      if(localStorage.key(i) == userIn) { 
      prevResults = JSON.parse(localStorage.getItem(userIn));
      prevResults.push(results[0]);
      results = prevResults;
      localStorage.setItem(userIn,JSON.stringify(results));

      }
      }
      }

// show score history
$('#score-hist').removeClass('hide');
for( var i = 0; i < localStorage.length; i++) {
prevResults = JSON.parse(localStorage.getItem(localStorage.key(i)));

for( var j = 0; j < prevResults.length; j++) {
resultText = localStorage.key(i) + " -    Score: " + prevResults[j][0] + " -    Time elapsed: " + (120 - prevResults[j][1]) + " sec";

// Create a <li> list item "x"
var x = $("<li>");

$(x).addClass('list-group-item');   
$(x).attr("id", "list-item");
$(x).text(resultText);  
// Append <li> elements to <ul> 
$('#score-hist').append(x);

  } 
  }
}else if(e.target.id == "retry-btn"){

// reload page 
location.reload();

 }else if(e.target.id == "clear-btn"){

// clear score history 
localStorage.clear();

$('#clear-btn').addClass('hide');
$("#score-hist").text("Score History: Cleared!"); 

   }
   }  
    e.stopPropagation();    
   }


// ----------------function to remove previous answer options
function resetQ() {

if(userScore == "") {

$("#answer-buttons").empty();

 }else {

// stop timer
starTimer = 0;

$("#quiz-container").empty();

}
}


//----------function to shuffle ( Fisher–Yates Shuffle. 2012. https://bost.ocks.org/mike/shuffle/)
function shuffle(array) {
    var m = array.length, t, i;
    while (m) {

      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
}

// use the first three char of the option text to create a unique multiple choise options button id selector 
function uniqueId(str) {
 let uniqueId = '';
     for(var i = 0; i < 3; i++) { 
        uniqueId += str.charAt(i)
    }
    return uniqueId;
}

// timer function
function timer() {

  var timerInterval = setInterval(function() {
    if (starTimer > 0){
        timeremain--;  
    }
    // show remaining time
    document.getElementById("display").value = "" + timeremain + " sec";

    if(timeremain <= 0) {

    if(timeremain < 0) {
        document.getElementById("display").value = " u suc"
        
        }
    clearInterval(timerInterval);
    results();
    }
}, 1000);
}


timer();


