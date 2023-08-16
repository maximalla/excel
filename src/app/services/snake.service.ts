import { Injectable } from '@angular/core';
import { AppConstants } from '../shared/constants/constants';
import { Position } from '../shared/interfaces/position';
import { ModelService } from '../shared/types/model.service';
import { InputService } from './input.service';

@Injectable({
  providedIn: 'root',
})
export class SnakeService {
  snakeBody: Position[] = [{ x: 11, y: 11 }];
  newSegments = 0;

  constructor(
    private readonly m: ModelService,
    private readonly input: InputService,
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

    this.snakeBody[0].x =
      (this.snakeBody[0].x + inputDirection.x + AppConstants.gridSizeX) %
      AppConstants.gridSizeX;

    this.snakeBody[0].y =
      (this.snakeBody[0].y + inputDirection.y + AppConstants.gridSizeY) %
      AppConstants.gridSizeY;
  }

  draw(gameBoard: any): void {
    this.snakeBody.forEach((segment, i) => {
      const snakeElement = document.createElement('div');
      snakeElement.innerText = i.toString();
      snakeElement.style.gridRowStart = segment.y.toString();
      snakeElement.style.gridColumnStart = segment.x.toString();
      snakeElement.classList.add('snake');
      if (i === 0) {
        snakeElement.classList.add('head');
        snakeElement.style.transform = 'rotate(' + this.m.headTurn + 'deg)';
      }
      gameBoard.appendChild(snakeElement);
    });
  }

  expandSnake(): void {
    this.newSegments += this.m.expansionRate;
  }

  getSnakeHead(): Position {
    return this.snakeBody[0];
  }

  snakeIntersection(): boolean {
    return this.onSnake(this.snakeBody[0], { ignoreHead: true });
  }

  onSnake(position: any, { ignoreHead = false } = {}) {
    return this.snakeBody.some((segment, index) => {
      if (ignoreHead && index === 0) return false;
      return this.equalPositions(segment, position);
    });
  }

  equalPositions(pos1: any, pos2: any): boolean {
    return pos1.x === pos2.x && pos1.y === pos2.y;
  }

  addSegments(): void {
    for (let i = 0; i < this.newSegments; i++) {
      this.snakeBody.push({ ...this.snakeBody[this.snakeBody.length - 1] });
    }
    this.newSegments = 0;
  }
}
