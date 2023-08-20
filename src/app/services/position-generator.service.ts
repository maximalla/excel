import { Injectable } from '@angular/core';
import { AppConstants } from '../shared/constants/constants';
import { Position } from '../shared/interfaces/position';
import { ModelService } from '../shared/types/model.service';

@Injectable({
  providedIn: 'root',
})
export class PositionGeneratorService {
  private readonly excludeRadius: number;
  private readonly maxX: number;
  private readonly maxY: number;

  constructor(private readonly m: ModelService) {
    this.excludeRadius = 5;
    this.maxX = AppConstants.gridSizeX - 2;
    this.maxY = AppConstants.gridSizeY - 2;
  }

  getRandomGridPosition(): Position {
    let newPosition: Position;
    do {
      newPosition = this.generateRandomPosition();
    } while (this.isInvalidPosition(newPosition));

    return newPosition;
  }

  private generateRandomPosition(): Position {
    return {
      x: Math.floor(Math.random() * this.maxX) + 1,
      y: Math.floor(Math.random() * this.maxY) + 1,
    };
  }

  private isInvalidPosition(position: Position): boolean {
    return (
      this.isOccupiedPosition(position, this.m.snakeBody) ||
      this.isOccupiedPosition(position, this.m.obstacles) ||
      this.isOccupiedPosition(position, [this.m.foodPosition])
    );
  }

  private isOccupiedPosition(
    position: Position,
    elements: Position[],
  ): boolean {
    return elements.some(
      (element) =>
        (Math.abs(element.x - position.x) <= this.excludeRadius &&
          Math.abs(element.y - position.y) <= this.excludeRadius) ||
        (element.x === position.x && element.y === position.y),
    );
  }
}
