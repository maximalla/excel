import { Injectable } from '@angular/core';
import { randomGridPosition } from '../game-engine/gameboard-grid.util';
import { AppConstants } from '../shared/constants/constants';
import { Position } from '../shared/interfaces/position';
import { ModelService } from '../shared/types/model.service';
import { SnakeService } from './snake.service';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(
    private readonly m: ModelService,
    private readonly snake: SnakeService,
  ) {
    this.m.foodPosition = this.getRandomFoodPosition();
  }

  set addScore(val: number) {
    this.m.score += val;
    this.m.levelUpdate();
    if (this.m.score > this.m.bestScore) {
      this.m.bestScore = this.m.score;
      localStorage.setItem(
        AppConstants.localStorageRecordKey,
        this.m.bestScore.toString(),
      );
    }
  }

  update(): void {
    if (this.snake.onSnake(this.m.foodPosition)) {
      this.snake.expandSnake();
      this.m.foodPosition = this.getRandomFoodPosition();
      this.addScore = 1;
    }
  }

  draw(gameBoard: any): void {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = this.m.foodPosition.y;
    foodElement.style.gridColumnStart = this.m.foodPosition.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
  }

  getRandomFoodPosition(): Position {
    let newFoodPosition = randomGridPosition();
    while (
      this.snake.onSnake(newFoodPosition) ||
      this.m.obstacles.includes(newFoodPosition)
    ) {
      newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
  }
}
