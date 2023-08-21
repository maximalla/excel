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
  expansionRate = 1;
  score = 0;
  bestScore = 0;
  headTurn = 0;
  timerSubscription!: Subscription;
  time: number = 0;
  requiredObstacles: number = 0;

  foodPosition: Position = { x: -5, y: -5 };
  snakeBody: Position[] = [{ x: 20, y: 11 }];
  obstacles: Position[] = [];

  private _level = 1;
  private _isPaused = false;
  private _gameOver!: boolean;

  get level(): number {
    return this._level;
  }

  set level(value: number) {
    if (value < 5) this.gameBoard.style.border = '5px solid red';
    else this.gameBoard.style.border = '5px solid blue';

    if (value >= 10) this.requiredObstacles = value;
    else this.requiredObstacles = 0;

    this._level = value;
  }

  get isPaused(): boolean {
    return this._isPaused;
  }

  set isPaused(value: boolean) {
    this._isPaused = value;
  }

  get gameOver(): boolean {
    return this._gameOver;
  }

  set gameOver(value: boolean) {
    this._gameOver = value;
    if (value) this.isPaused = true;
  }

  levelUpdate() {
    this.level = Math.ceil((this.score + 1) / 10);
  }
}
