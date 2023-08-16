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
  private _gameOver = false;

  get gameOver(): boolean {
    return this._gameOver;
  }

  set gameOver(value: boolean) {
    this._gameOver = value;
    if (value) this.isRunning = false;
  }
}
