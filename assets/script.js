// quiz questions
var questions = [
    {
        question: "What does 'JS' stand for?",
        choices: ["JavaScript", "Justin Stimberlake", "Jumanji Safari", "Jigsaw Scrabble"],
        correct: 0
    },
    {
        question: "What is the '++' operator used for?",
        choices: ["Checking if a value is true", "Addition", "Incrementing by 1", "Multiplying numbers"],
        correct: 2
    },
    {
        question: "How do you declare a variable in JavaScript?",
        choices: ["var", "let", "const", "All of the above"],
        correct: 3
    },
    {
        question: "What is an array in JavaScript?",
        choices: ["A collection of objects", "A single value", "A list of variables", "A loop structure"],
        correct: 0
    },
    {
        question: "Which function is used to display text in the console?",
        choices: ["print()", "console.log()", "displayText()", "show()"],
        correct: 1
    }
]

var QUESTION_TIME = 60

var currentQuestion = 0
var score = 0
var timeLeft = QUESTION_TIME
var timerInterval

var startButton = document.getElementById("start-button")
var quizContainer = document.getElementById("quiz-container")
var questionElement = document.getElementById("question")
var choicesList = document.getElementById("choices")
var scoreElement = document.getElementById("score")
var timerElement = document.getElementById("timer")
var inputContainer = document.getElementById("input-container")
var initialsInput = document.getElementById("initials")
var submitInitialsButton = document.getElementById("submit-initials")
var highScoresContainer = document.getElementById("high-scores")
var highScoreList = document.getElementById("high-score-list")

var highScores = JSON.parse(localStorage.getItem("highScores")) || []

// start quizContainer, hide start button
function startQuiz() {
    startButton.style.display = "none"
    quizContainer.style.display = "block"
    showQuestion()
    startTimer()
}

// begin timer tick down
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--
        timerElement.textContent = `Time: ${timeLeft}s`

        if (timeLeft <= 0) {
            endQuiz()
        }
    }, 1000)
}

// show questions until questions.length is reached
function showQuestion() {
    if (currentQuestion >= questions.length) {
        endQuiz()
        return
    }
    
    var q = questions[currentQuestion]
    questionElement.textContent = q.question
    
    for (var i = 0; i < q.choices.length; i++) {
        var choice = document.getElementById(`choice${i}`)
        choice.textContent = q.choices[i]
        choice.onclick = () => checkAnswer(i)
    }
}

// check answers against questions array and calculate score
function checkAnswer(choice) {
    if (choice === questions[currentQuestion].correct) {
        score += 20
    } else {
        timeLeft -= 10
    }

    scoreElement.textContent = `Score: ${score}`
    currentQuestion++
    showQuestion()
}

// clear timer, hide quiz container and show initials box
function endQuiz() {
    clearInterval(timerInterval)
    quizContainer.style.display = "none"
    inputContainer.style.display = "block"
}

// eventListener on submit button for initials
submitInitialsButton.addEventListener("click", () => {
    var initials = initialsInput.value.trim()
    if (initials !== "") {
        highScores.push({ initials, score })
        highScores.sort((a, b) => b.score - a.score)
        highScores.splice(3) // Keep only the top 3 scores
        localStorage.setItem("highScores", JSON.stringify(highScores))
        displayHighScores()
    }
})

// shows high scores container
function displayHighScores() {
    highScoresContainer.style.display = "block"
    highScoreList.innerHTML = ""
    highScores.forEach((entry, index) => {
        var li = document.createElement("li")
        li.textContent = `${index + 1}. ${entry.initials} - ${entry.score}`
        highScoreList.appendChild(li)
    })
}

// eventListener for start button
startButton.addEventListener("click", startQuiz)
