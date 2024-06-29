let questions = [
    {
        question: "Which is the largest animal in the world",
        answer: [
            {text:"Elephant",    correct: false},
            {text:"Shark" ,      correct: false},
            {text:"Blue Whale",  correct: true},
            {text:"Giraffe" ,    correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answer: [
            {text:"Nepal",    correct: false},
            {text:"Vatican City",  correct: true},
            {text:"Bhutan" ,      correct: false},
            {text:"Shri Lanka" ,    correct: false},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answer: [
            {text:"Antartica",  correct: true},
            {text:"Gobi",    correct: false},
            {text:"Sahara" ,      correct: false},
            {text:"Kalahari" ,    correct: false},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answer: [
            {text:"Aisa",    correct: false},
            {text:"Africa" ,      correct: false},
            {text:"Arctic" ,    correct: false},
            {text:"Australia ",  correct: true},
        ]
    },
];

let questionElement = document.getElementById("question");
let answerButton = document.getElementById("ans-btn");
let nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.answer.forEach(answer => {
        let button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);

    })

}

function resetState(){
    nextButton.style.display = 'none';
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add('correct');
        }
        button.disabled = true;

    });
    nextButton.style.display = 'block';
    
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})




startQuiz();





