

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
    secondsLeft -= 30;
}
}
e.stopPropagation();
}
}

//----------------------function to get to next question
function nextQuest(){
//  remove previous multiple choise answer
resetQuestions()

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
resetQuestions()
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

