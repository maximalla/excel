import { Injectable } from '@angular/core';
import { ModelService } from '../shared/types/model.service';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private startTime: number = -10;

  constructor(private readonly m: ModelService) {}

  pauseTimer() {
    if (!this.m.isPaused) {
      this.m.isPaused = true;
    }
  }

  resumeTimer() {
    if (this.m.isPaused) {
      this.startTime = performance.now() - this.m.time * 1000; // Відновити час, що пройшов під час паузи
      this.m.isPaused = false;
    }
  }

  updateTime() {
    if (!this.m.isPaused) {
      if (this.startTime === -10) this.startTime = performance.now() - 1;
      const currentTime = performance.now();
      const deltaTime = (currentTime - this.startTime) / 1000; // перетворити в секунди
      this.m.time = Math.floor(deltaTime);
    }
  }
}
