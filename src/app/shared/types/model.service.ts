import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Position } from '../interfaces/position';

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
  headTurn = 0;
  timerSubscription!: Subscription;
  time: number = 0;
  isRunning = false;
  obstacles: Position[] = [];
  private _level = 1;
  private _isPaused = false;
  private _gameOver = false;

  get level(): number {
    return this._level;
  }

  set level(value: number) {
    if (value < 5) this.gameBoard.style.border = '5px solid red';
    else this.gameBoard.style.border = '5px solid blue';
    this._level = value;
  }

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

  levelUpdate() {
    this.level = Math.ceil((this.score + 1) / 1);
  }
}
