import { Injectable } from '@angular/core';
import { outsideGrid } from '../game-engine/gameboard-grid.util';
import { AppConstants } from '../shared/constants/constants';
import { Position } from '../shared/interfaces/position';
import { ModelService } from '../shared/types/model.service';
import { InputService } from './input.service';
import { ObstaclesService } from './obstacles.service';

@Injectable({
  providedIn: 'root',
})
export class SnakeService {
  snakeBody: Position[] = [{ x: 20, y: 11 }];
  newSegments = 0;

  constructor(
    private readonly m: ModelService,
    private readonly input: InputService,
    private readonly obstacles: ObstaclesService,
  ) {}

  listenToInputs(): void {
    this.input.getInputs();
  }

  update(): void {
    this.addSegments();
    const inputDirection = this.input.getInputDirection();
    for (let i = this.snakeBody.length - 2; i >= 0; i--) {
      this.snakeBody[i + 1] = { ...this.snakeBody[i] };
    }

    const newHeadX =
      ((this.snakeBody[0].x + inputDirection.x + AppConstants.gridSizeX - 1) %
        AppConstants.gridSizeX) +
      1;
    const newHeadY =
      ((this.snakeBody[0].y + inputDirection.y + AppConstants.gridSizeY - 1) %
        AppConstants.gridSizeY) +
      1;

    if (
      (this.m.level < 5 &&
        outsideGrid(this.snakeBody[0], { x: newHeadX, y: newHeadY })) ||
      this.obstacles.checkObstacleCollision(this.snakeBody[0])
    )
      this.m.gameOver = true;

    this.snakeBody[0] = { x: newHeadX, y: newHeadY };

    const intersectionIndex = this.snakeIntersection();
    if (intersectionIndex) {
      if (this.m.level < 10) this.m.gameOver = true;
      else {
        this.snakeBody.splice(intersectionIndex);
        this.m.score = this.snakeBody.length - 1;
        this.m.levelUpdate();
      }
    }
  }

  draw(gameBoard: any): void {
    this.snakeBody.forEach((segment, i) => {
      const snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = segment.y.toString();
      snakeElement.style.gridColumnStart = segment.x.toString();
      snakeElement.classList.add('snake');

      snakeElement.innerText += i.toString();
      if (i === 0) {
        snakeElement.innerText += '.' + i.toString();
        snakeElement.classList.add('head');
        snakeElement.style.transform = 'rotate(' + this.m.headTurn + 'deg)';
      }
      gameBoard.appendChild(snakeElement);
    });
  }

  expandSnake(): void {
    this.newSegments += this.m.expansionRate;
  }

  snakeIntersection(): number {
    for (let i = 1; i < this.snakeBody.length; i++) {
      if (this.equalPositions(this.snakeBody[0], this.snakeBody[i])) return i;
    }
    return 0;
  }

  onSnake(position: Position, { ignoreHead = false } = {}) {
    return this.snakeBody.some((segment, index) => {
      if (ignoreHead && index === 0) return false;
      return this.equalPositions(segment, position);
    });
  }

  equalPositions(pos1: Position, pos2: Position): boolean {
    return pos1.x === pos2.x && pos1.y === pos2.y;
  }

  addSegments(): void {
    for (let i = 0; i < this.newSegments; i++) {
      this.snakeBody.push({ ...this.snakeBody[this.snakeBody.length - 1] });
    }
    this.newSegments = 0;
  }
}
