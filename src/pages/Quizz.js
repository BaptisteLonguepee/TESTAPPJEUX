import React, { useEffect } from 'react';
import './css/quizz.css'

const Quizz = () => {

    useEffect(() => {
        // Importer la fonction startQuiz ici si nécessaire
        const startButton = document.getElementById("start-button");
        if (startButton) {
            startButton.addEventListener("click", startQuiz);
        }

        // Nettoyage de l'écouteur d'événements lors du démontage du composant
        return () => {
            if (startButton) {
                startButton.removeEventListener("click", startQuiz);
            }
        };
    }, []);
    return(
        <div className="quiz-container">
            <h1>Quiz App</h1>
            <div id="question-container">
                <p id="question-text"></p>
                <div id="answer-buttons"></div>
            </div>
            <div id="controls-container">
                <button id="start-button">Start Quiz</button>
                <div id="timer-container">
                    <span id="timer-text">Time Left: <span id="timer">0</span></span>
                </div>
            </div>
        </div>
    )
}
export default Quizz;
export const Head = () => <title>Quizz Page</title>;

function startQuiz() {
// Define an array of quiz questions
    const quizQuestions = [
        {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Rome"],
            correctAnswer: "Paris"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: "Mars"
        },
        {
            question: "What is the chemical symbol for gold?",
            options: ["Au", "Ag", "Cu", "Fe"],
            correctAnswer: "Au"
        }
    ];

// Variables to track quiz state
    let currentQuestionIndex = 0;
    let score = 0;
    let timeLeft = 30;
    let timerInterval;

// Function to start the quiz
    function startQuiz() {
        // Hide the start button and display the first question
        document.getElementById("start-button").style.display = "none";
        displayQuestion();
        startTimer();
    }

// Function to display a question and its options
    function displayQuestion() {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        const questionText = document.getElementById("question-text");
        const answerButtons = document.getElementById("answer-buttons");

        // Clear previous question and answer options
        questionText.innerHTML = "";
        answerButtons.innerHTML = "";

        // Display the current question
        questionText.innerHTML = currentQuestion.question;

        // Create answer buttons for each option
        currentQuestion.options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.classList.add("answer-button");
            answerButtons.appendChild(button);

            // Add click event listener to check the answer
            button.addEventListener("click", function() {
                checkAnswer(option);
            });
        });
    }

// Function to check the selected answer
    function checkAnswer(selectedOption) {
        const currentQuestion = quizQuestions[currentQuestionIndex];

        // Check if the selected answer is correct
        if (selectedOption === currentQuestion.correctAnswer) {
            score++;
        }

        // Move to the next question or end the quiz if all questions are answered
        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    }

// Function to start the timer
    function startTimer() {
        timerInterval = setInterval(function() {
            timeLeft--;

            // Update the timer text
            document.getElementById("timer").textContent = timeLeft;

            // End the quiz if time runs out
            if (timeLeft <= 0) {
                endQuiz();
            }
        }, 1000);
    }

// Function to end the quiz
    function endQuiz() {
        // Stop the timer
        clearInterval(timerInterval);

        // Calculate the score percentage
        const scorePercentage = (score / quizQuestions.length) * 100;

        // Display the final score
        const questionContainer = document.getElementById("question-container");
        questionContainer.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Your Score: ${score} out of ${quizQuestions.length}</p>
    <p>Score Percentage: ${scorePercentage}%</p>
  `;
    }

// Add event listener to start the quiz when the start button is clicked
    document.getElementById("start-button").addEventListener("click", startQuiz);
}
