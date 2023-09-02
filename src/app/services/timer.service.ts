import { Injectable } from '@angular/core';
import { ModelService } from '../shared/types/model.service';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private startTime: number = -10;
  private accumulatedPausedTime: number = 0;

  constructor(private readonly m: ModelService) {}

  pauseTimer(): void {
    if (!this.m.isPaused) {
      this.m.isPaused = true;
      this.accumulatedPausedTime = performance.now() - this.startTime;
    }
  }

  resumeTimer(): void {
    if (this.m.isPaused && !this.m.gameOver) {
      this.startTime = performance.now() - this.accumulatedPausedTime;
      this.m.isPaused = false;
    }
  }

  updateTime(): void {
    if (this.startTime === -10) this.startTime = performance.now() - 1;
    if (!this.m.isPaused) {
      const currentTime: number = performance.now();
      const deltaTime: number = (currentTime - this.startTime) / 1000;
      this.m.time = Math.floor(deltaTime);
    }
  }
}
