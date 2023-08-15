import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  lastRenderTime = 0;
  gameOver = false;
  gameBoard: any;
  snakeSpeed = 1;
  foodPosition: any;
  expansionRate = 1;
  score = 0;
  bestScore = 0;
  level = 1;
  headTurn = 0;
  timerSubscription!: Subscription;
  time: number = 0;
  isRunning: boolean = false;
}
