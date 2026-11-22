import { QuizGame } from './game.js';

document.addEventListener('DOMContentLoaded', () => {
    const uiElements = {
        startScreen: document.getElementById('start-screen'),
        quizScreen: document.getElementById('quiz-screen'),
        resultScreen: document.getElementById('result-screen'),
        startBtn: document.getElementById('start-btn'),
        restartBtn: document.getElementById('restart-btn'),
        questionNumber: document.getElementById('question-number'),
        timeLeft: document.getElementById('time-left'),
        scoreDisplay: document.getElementById('score-display'),
        questionText: document.getElementById('question-text'),
        optionsContainer: document.getElementById('options-container'),
        finalScore: document.getElementById('final-score')
    };

    const game = new QuizGame(uiElements);

    uiElements.startBtn.addEventListener('click', () => game.start());
    uiElements.restartBtn.addEventListener('click', () => game.start());
});
