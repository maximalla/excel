export class AppConstants {
  static localStorageRecordKey = 'record';

  static readonly gridSizeX = 40;
  static readonly gridSizeY = 20;

  static keyToDirection: { [key: string]: string } = {
    ArrowUp: 'ArrowUp',
    KeyW: 'ArrowUp',
    Numpad8: 'ArrowUp',
    ArrowDown: 'ArrowDown',
    KeyS: 'ArrowDown',
    Numpad2: 'ArrowDown',
    ArrowLeft: 'ArrowLeft',
    KeyA: 'ArrowLeft',
    Numpad4: 'ArrowLeft',
    ArrowRight: 'ArrowRight',
    KeyD: 'ArrowRight',
    Numpad6: 'ArrowRight',
  };
}
