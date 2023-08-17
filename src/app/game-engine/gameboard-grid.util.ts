import { AppConstants } from '../shared/constants/constants';
import { Position } from '../shared/interfaces/position';

export function randomGridPosition(): Position {
  return {
    x: Math.floor(Math.random() * (AppConstants.gridSizeX - 2)) + 1,
    y: Math.floor(Math.random() * (AppConstants.gridSizeY - 2)) + 1,
  };
}

export function outsideGrid(position1: Position, position2: Position): boolean {
  return (
    (position1.x === 1 && position2.x === AppConstants.gridSizeX) ||
    (position1.x === AppConstants.gridSizeX && position2.x === 1) ||
    (position1.y === 1 && position2.y === AppConstants.gridSizeY) ||
    (position1.y === AppConstants.gridSizeY && position2.y === 1)
  );
}
