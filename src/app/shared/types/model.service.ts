import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  lastRenderTime = 0;
  gameBoard: any;
  baseSpeed = 3;
  foodPosition: any;
  expansionRate = 1;
  score = 0;
  bestScore = 0;
  level = 1;
  headTurn = 0;
  timerSubscription!: Subscription;
  time: number = 0;
  isRunning = false;
  private _isPaused = false;
  private _gameOver = false;

  get isPaused(): boolean {
    return this._isPaused;
  }

  set isPaused(value: boolean) {
    this._isPaused = value;
    this.isRunning = !value;
  }

  get gameOver(): boolean {
    return this._gameOver;
  }

  set gameOver(value: boolean) {
    this._gameOver = value;
    if (value) this.isRunning = false;
  }
}
