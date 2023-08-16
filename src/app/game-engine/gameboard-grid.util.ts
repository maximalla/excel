import { AppConstants } from '../shared/constants/constants';
import { Position } from '../shared/interfaces/position';

export function randomGridPosition(): Position {
  return {
    x: Math.floor(Math.random() * (AppConstants.gridSizeX - 2)) + 1,
    y: Math.floor(Math.random() * (AppConstants.gridSizeY - 2)) + 1,
  };
}

export function outsideGrid(position: any): boolean {
  return (
    position.x < 1 ||
    position.x > AppConstants.gridSizeX ||
    position.y < 1 ||
    position.y > AppConstants.gridSizeY
  );
}
