const options = document.querySelector('.options').children;
const answerTrackerContainer = document.querySelector('.answer-tracker')
const questionNumberSpan = document.querySelector('.question-num-value');
const totalQuestionSpan = document.querySelector('.total-question');
const question = document.querySelector('.question ');
const op1 = document.querySelector('.option1');
const op2 = document.querySelector('.option2');
const op3 = document.querySelector('.option3');
const op4 = document.querySelector('.option4');
// let questionIndex = 0; questions IN ORDER
let questionIndex; //Random questions
let index = 0;

// questions and options and answers

const questions = [{
    q: 'How do you call a function named "myFunction"?',
    options: ['myFunction()', 'call myFunction()', 'call function myFunction', 'all the above'],
    answer: 0
}, {
    q: 'How to write an IF statement?',
    options: ['if i == 5 then', 'if (i == 5)', 'if i = 5', 'if i = 5 then'],
    answer: 1
}, {
    q: 'How does a FOR loop start?',
    options: ['for (i = 0; i <= 5)', 'for (i <= 5; i++)', 'for i = 1 to 5', 'for (i = 0; i <= 5; i++)'],
    answer: 3
}, {
    q: 'How do you declare a JavaScript variable?',
    options: ['variable carName;', 'var carName;', 'v carName;', 'none of these'],
    answer: 1
}, {
    q: 'Which operator is used to assign a value to a variable?',
    options: ['-', '=', '+', '*'],
    answer: 1
}]

// set questions and options and question number
totalQuestionSpan.innerHTML = questions.length;

function load() {
    questionNumberSpan.innerHTML = index + 1;
    question.innerHTML = questions[questionIndex].q;
    op1.innerHTML = questions[questionIndex].options[0];
    op2.innerHTML = questions[questionIndex].options[1];
    op3.innerHTML = questions[questionIndex].options[2];
    op4.innerHTML = questions[questionIndex].options[3];
    index++;
}

function check(element) {
    // check if the option is correct
    if (element.id == questions[questionIndex].answer) {
        element.classList.add('correct');
        updateAnswerTracker('correct');
    } else {
        element.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    // if the user selected one option then disable all options
    disabledOptions();
}

function disabledOptions() {
    for (let i = 0; i < options.length; i++) {
        options[i].classList.add('disabled');
    }
}

function next() {
    // before going to the next question, check if any answer is selected, if not then alert('please select')

}

function randomQuestion() {
    let randomNumber = Math.floor(Math.random() * questions.length);
    questionIndex = randomNumber;
    // console.log(questionIndex);
    load();
}

function answerTracker() {
    for (let i = 0; i < questions.length; i++) {
        const div = document.createElement('div');
        answerTrackerContainer.appendChild(div);
    }
}

function updateAnswerTracker(className) {
    answerTrackerContainer.children[index - 1].classList.add(className);
}
window.onload = function() {
    randomQuestion()
    answerTracker()
}