import { questions } from './questions.js';
import { Timer } from './timer.js';

export class QuizGame {
    constructor(uiElements) {
        this.ui = uiElements;
        this.currentIndex = 0;
        this.score = 0;
        // Set waktu 15 detik per soal
        this.timer = new Timer(
            15,
            (time) => this.ui.timeLeft.textContent = time,
            () => this.handleTimeUp()
        );
    }

    start() {
        this.currentIndex = 0;
        this.score = 0;
        this.updateScoreDisplay();
        this.showScreen('quiz');
        this.loadQuestion();
    }

    showScreen(screenName) {
        this.ui.startScreen.classList.remove('active');
        this.ui.quizScreen.classList.remove('active');
        this.ui.resultScreen.classList.remove('active');

        if (screenName === 'start') this.ui.startScreen.classList.add('active');
        if (screenName === 'quiz') this.ui.quizScreen.classList.add('active');
        if (screenName === 'result') this.ui.resultScreen.classList.add('active');
    }

    loadQuestion() {
        const currentQ = questions[this.currentIndex];
        this.ui.questionNumber.textContent = `Soal ${this.currentIndex + 1}/${questions.length}`;
        this.ui.questionText.textContent = currentQ.question;
        this.ui.optionsContainer.innerHTML = '';

        currentQ.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            button.addEventListener('click', () => this.selectAnswer(button, option, currentQ.answer));
            this.ui.optionsContainer.appendChild(button);
        });

        this.timer.start();
    }

    selectAnswer(selectedBtn, selectedOption, correctAnswer) {
        this.timer.stop();
        const allButtons = this.ui.optionsContainer.querySelectorAll('.option-btn');
        
        // Matikan semua tombol setelah memilih
        allButtons.forEach(btn => btn.disabled = true);

        if (selectedOption === correctAnswer) {
            selectedBtn.classList.add('correct');
            this.score += 20; // Tambah 20 poin jika benar
            this.updateScoreDisplay();
        } else {
            selectedBtn.classList.add('wrong');
            // Tunjukkan jawaban yang benar
            allButtons.forEach(btn => {
                if (btn.textContent === correctAnswer) {
                    btn.classList.add('correct');
                }
            });
        }

        // Lanjut ke soal berikutnya setelah 1.2 detik
        setTimeout(() => this.nextQuestion(), 1200);
    }

    handleTimeUp() {
        const currentQ = questions[this.currentIndex];
        const allButtons = this.ui.optionsContainer.querySelectorAll('.option-btn');
        
        allButtons.forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === currentQ.answer) {
                btn.classList.add('correct');
            }
        });

        setTimeout(() => this.nextQuestion(), 1200);
    }

    nextQuestion() {
        this.currentIndex++;
        if (this.currentIndex < questions.length) {
            this.loadQuestion();
        } else {
            this.endGame();
        }
    }

    updateScoreDisplay() {
        this.ui.scoreDisplay.textContent = `Skor: ${this.score}`;
    }

    endGame() {
        this.showScreen('result');
        this.ui.finalScore.textContent = this.score;
    }
}
