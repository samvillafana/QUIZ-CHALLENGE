// connect to the html elements
const header = document.querySelector('.header-container')
const startButton = document.querySelector('.start-button');
const timerSection = document.querySelector('.timer-section');
const timer = document.querySelector('.timer');
const questionNumber = document.querySelector('.question-number');
const questionContainer = document.querySelector('.questions-container');
const currentQuestion = document.querySelector('.question');
const answerChoices = document.querySelectorAll('button');
const answer1 = document.querySelector('.answer-1')
const answer2 = document.querySelector('.answer-2')
const answer3 = document.querySelector('.answer-3')
const answer4 = document.querySelector('.answer-4')
const resultsContainer = document.querySelector('.results-container')
const answerResult = document.querySelector('.answer-result');
const summary = document.querySelector('.summary')

// questions array 
const questions = [{
        question: 'Who won the world cup in 1930?',
        answerChoice1: 'Brazil',
        answerChoice2: 'Uruguay',
        answerChoice3: 'Mexico',
        answerChoice4: 'USA',
        correctAns: 'Uruguay',
    },
    {
        question: 'Who won the world cup in 1934?',
        answerChoice1: 'Italy',
        answerChoice2: 'Colombia',
        answerChoice3: 'Germany',
        answerChoice4: 'France',
        correctAns: 'Italy',
    },
    {
        question: 'Who won the world cup in 1938?',
        answerChoice1: 'England',
        answerChoice2: 'Argentina',
        answerChoice3: 'Italy',
        answerChoice4: 'France',
        correctAns: 'Italy',
    },
    {
        question: 'Who won the world cup in 1942?',
        answerChoice1: 'Denmark',
        answerChoice2: 'Switzerland',
        answerChoice3: 'Not Held',
        answerChoice4: 'Norway',
        correctAns: 'Not Held',
    },
    {
        question: 'Who won the world cup in 1946?',
        answerChoice1: 'USA',
        answerChoice2: 'Not Held',
        answerChoice3: 'Canada',
        answerChoice4: 'India',
        correctAns: 'Not Held',
    },
    {
        question: 'Who won the world Cup in 1950?',
        answerChoice1: 'Brazil',
        answerChoice2: 'Japan',
        answerChoice3: 'Uruguay',
        answerChoice4: 'Spain',
        correctAns: 'Uruguay',
    },
    {
        question: 'Who won the world Cup in 1954?',
        answerChoice1: 'USA',
        answerChoice2: 'Mexico',
        answerChoice3: 'Sweden',
        answerChoice4: 'Germany',
        correctAns: 'Germany',
    },
    {
        question: 'Who won the world cup in 1958?',
        answerChoice1: 'Japan',
        answerChoice2: 'USA',
        answerChoice3: 'Brazil',
        answerChoice4: 'Trinidad and Tobago',
        correctAns: 'Brazil',
    },
]

// questions index to increment
let questionsIndex = 0;
let currentSelectedQuestion = questions[questionsIndex];
let clock = 60;
let correct = 0;

const hideHeader = () => {
    header.textContent = ''
}

let clockRun;
const runClock = () => {

    clockRun = setInterval(() => {
        if (clock > 0) {
            clock -= 1;
            timer.textContent = `Timer: ${clock} seconds`
        } else {
            stopTimer()
            displayResults()
        }

    }, 1000)
}


const stopTimer = () => {
    console.log('stop')
    clearInterval(clockRun)
}


const isCorrect = (choice, correctChoice) => {
    let array = choice.split(" ");
    let modChoice = array.filter(el => !el.includes('.')).join(" ")
    console.log(modChoice);
    console.log(modChoice === correctChoice)
    return modChoice === correctChoice;
}

const updateResult = (boolean) => {
    if (boolean) {
        correct += 1
        answerResult.style.color = 'green'
        answerResult.textContent = 'Correct!'
        setTimeout(() => {
            answerResult.textContent = ''
            nextQuestion()
        }, 2000)
    } else {
        answerResult.style.color = 'red'
        answerResult.textContent = 'Wrong!'
        setTimeout(() => {
            answerResult.textContent = ''
            nextQuestion()
        }, 2000)
    }
}

const displayResults = () => {
    questionNumber.style.display = 'none'
    questionContainer.style.display = 'none'
    summary.append(`You answered ${correct}/${questions.length} questions correctly which is a score of ${parseInt(correct/questions.length * 100)}% `)
}

const nextQuestion = () => {
    answer1.style.backgroundColor = '#318CE7'
    answer2.style.backgroundColor = '#318CE7'
    answer3.style.backgroundColor = '#318CE7'
    answer4.style.backgroundColor = '#318CE7'
    answer1.style.color = "#fff"
    answer2.style.color = "#fff"
    answer3.style.color = "#fff"
    answer4.style.color = "#fff"

    answer1.disabled = false
    answer2.disabled = false
    answer3.disabled = false
    answer4.disabled = false;
    if (questionsIndex !== questions.length - 1) {
        questionsIndex += 1;
        questionNumber.textContent = `${questionsIndex + 1}/${questions.length}`
        currentSelectedQuestion = questions[questionsIndex]
        let selectedQuestion = questions[questionsIndex];
        currentQuestion.textContent = selectedQuestion.question;
        answer1.textContent = `1. ${selectedQuestion.answerChoice1}`
        answer2.textContent = `2. ${selectedQuestion.answerChoice2}`
        answer3.textContent = `3. ${selectedQuestion.answerChoice3}`
        answer4.textContent = `4. ${selectedQuestion.answerChoice4}`
    } else {
        currentQuestion.textContent = '';
        answer1.textContent = ''
        answer2.textContent = ''
        answer3.textContent = ''
        answer4.textContent = ''
        displayResults()
        stopTimer()
    }
}


console.log(questionsIndex)

startButton.addEventListener('click', () => {
    let selectedQuestion = questions[questionsIndex];
    currentQuestion.textContent = selectedQuestion.question;
    answer1.textContent = `1. ${selectedQuestion.answerChoice1}`
    answer2.textContent = `2. ${selectedQuestion.answerChoice2}`
    answer3.textContent = `3. ${selectedQuestion.answerChoice3}`
    answer4.textContent = `4. ${selectedQuestion.answerChoice4}`
    timerSection.style.display = 'flex'
    questionContainer.style.display = 'block'
    timer.style.display = 'block';
    resultsContainer.style.display = 'block'
    questionNumber.style.display = 'block'
    questionNumber.textContent = `${questionsIndex + 1}/${questions.length}`
    hideHeader()
    runClock()
})


answer1.addEventListener('click', function (event) {
    answer1.disabled = true
    answer2.disabled = true
    answer3.disabled = true
    answer4.disabled = true;
    answer1.style.backgroundColor = '#fffdd0'
    answer1.style.color = '#000'

    if (isCorrect(answer1.textContent, currentSelectedQuestion.correctAns)) {
        updateResult(true)

    } else {
        updateResult(false)

    }

})

answer2.addEventListener('click', function (event) {
    answer1.disabled = true
    answer2.disabled = true
    answer3.disabled = true
    answer4.disabled = true;
    answer2.style.backgroundColor = '#fffdd0'
    answer2.style.color = '#000'
    if (isCorrect(answer2.textContent, currentSelectedQuestion.correctAns)) {
        updateResult(true)

    } else {
        updateResult(false)

    }
})

answer3.addEventListener('click', function (event) {
    answer1.disabled = true
    answer2.disabled = true
    answer3.disabled = true
    answer4.disabled = true;
    answer3.style.backgroundColor = '#fffdd0'
    answer3.style.color = '#000'


    if (isCorrect(answer3.textContent, currentSelectedQuestion.correctAns)) {
        updateResult(true)

    } else {
        updateResult(false)

    }
})

answer4.addEventListener('click', function (event) {
    answer1.disabled = true
    answer2.disabled = true
    answer3.disabled = true
    answer4.disabled = true;
    answer4.style.backgroundColor = '#fffdd0'
    answer4.style.color = '#000'


    if (isCorrect(answer4.textContent, currentSelectedQuestion.correctAns)) {
        updateResult(true)

    } else {
        updateResult(false)

    }
})