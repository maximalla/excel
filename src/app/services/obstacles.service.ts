import { Injectable } from '@angular/core';
import { randomGridPosition } from '../game-engine/gameboard-grid.util';
import { Position } from '../shared/interfaces/position';
import { ModelService } from '../shared/types/model.service';

@Injectable({
  providedIn: 'root',
})
export class ObstaclesService {
  constructor(
    // private readonly snake: SnakeService,
    private readonly m: ModelService,
  ) {
    this.initObstacles();
  }

  initObstacles(): void {
    // Згенеруємо 5 перешкод
    for (let i = 0; i < 5; i++) {
      this.m.obstacles.push(this.getRandomObstaclePosition());
    }
  }

  draw(gameBoard: any): void {
    this.m.obstacles.forEach((position) => {
      const obstacleElement = document.createElement('div');
      obstacleElement.style.gridRowStart = position.y.toString();
      obstacleElement.style.gridColumnStart = position.x.toString();
      obstacleElement.classList.add('obstacle');
      gameBoard.appendChild(obstacleElement);
    });
  }

  addObstacle(position: Position): void {
    this.m.obstacles.push(position);
  }

  getObstacles(): Position[] {
    return this.m.obstacles;
  }

  checkObstacleCollision(position: Position): boolean {
    return this.m.obstacles.some(
      (obstacle) => obstacle.x === position.x && obstacle.y === position.y,
    );
  }

  getRandomObstaclePosition(): Position {
    let newObstaclePosition: Position;
    do {
      newObstaclePosition = randomGridPosition();
    } while (
      this.checkObstacleCollision(newObstaclePosition) ||
      // this.snake.onSnake(newObstaclePosition) ||
      this.m.foodPosition === newObstaclePosition
    );
    return newObstaclePosition;
  }
}
