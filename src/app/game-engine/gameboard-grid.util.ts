import { Position } from '../shared/interfaces/position';

const gridSizeX = 21;
const gridSizeY = 21;

export function randomGridPosition(): Position {
  return {
    x: Math.floor(Math.random() * gridSizeX) + 1,
    y: Math.floor(Math.random() * gridSizeY) + 1,
  };
}

export function outsideGrid(position: any): boolean {
  return (
    position.x < 1 ||
    position.x > gridSizeX ||
    position.y < 1 ||
    position.y > gridSizeY
  );
}
