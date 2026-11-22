export class Timer {
    constructor(duration, onTick, onTimeUp) {
        this.duration = duration;
        this.timeLeft = duration;
        this.onTick = onTick;
        this.onTimeUp = onTimeUp;
        this.intervalId = null;
    }

    start() {
        this.stop(); // Pastikan tidak ada timer ganda
        this.timeLeft = this.duration;
        this.onTick(this.timeLeft);

        this.intervalId = setInterval(() => {
            this.timeLeft--;
            this.onTick(this.timeLeft);

            if (this.timeLeft <= 0) {
                this.stop();
                this.onTimeUp();
            }
        }, 1000);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}
