import { Injectable } from '@angular/core';
import { AppConstants } from '../shared/constants/constants';
import { Position } from '../shared/interfaces/position';
import { ModelService } from '../shared/types/model.service';

@Injectable({
  providedIn: 'root',
})
export class InputService {
  inputDirection = { x: 0, y: 0 };
  lastInputDirection = { x: 0, y: 0 };

  constructor(private readonly m: ModelService) {}

  getInputs(): void {
    window.addEventListener('keydown', (e) => {
      if (!this.m.isPaused && !this.m.gameOver) {
        const direction = AppConstants.keyToDirection[e.code];
        if (direction) this.setDirection(direction);
      }
    });
  }

  setDirection(direction: string): void {
    switch (direction) {
      case 'ArrowUp':
        if (this.lastInputDirection.y !== 0) break;
        this.inputDirection = { x: 0, y: -1 };
        this.m.headTurn = 180;
        break;
      case 'ArrowDown':
        if (this.lastInputDirection.y !== 0) break;
        this.inputDirection = { x: 0, y: 1 };
        this.m.headTurn = 0;
        break;
      case 'ArrowLeft':
        if (this.lastInputDirection.x !== 0) break;
        this.inputDirection = { x: -1, y: 0 };
        this.m.headTurn = 90;
        break;
      case 'ArrowRight':
        if (this.lastInputDirection.x !== 0) break;
        this.inputDirection = { x: 1, y: 0 };
        this.m.headTurn = -90;
        break;
    }
    this.m.isRunning = true;
  }

  getInputDirection(): Position {
    this.lastInputDirection = this.inputDirection;
    return this.inputDirection;
  }
}
