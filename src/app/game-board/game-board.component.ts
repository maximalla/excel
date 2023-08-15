import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { outsideGrid } from '../game-engine/gameboard-grid.util';
import { FoodService } from '../services/food.service';
import { InputService } from '../services/input.service';
import { SnakeService } from '../services/snake.service';
import { AppConstants } from '../shared/constants/constants';
import { ModelService } from '../shared/types/model.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    readonly m: ModelService,
    private readonly food: FoodService,
    private readonly snake: SnakeService,
    private readonly input: InputService,
  ) {}

  get snakeSpeed(): number {
    const score = this.m.score;
    if (score < 10) return 4;
    if (score > 10 && score < 15) return 5;
    if (score > 15 && score < 20) return 6;
    return 7;
  }

  ngOnInit(): void {
    this.m.bestScore =
      Number(localStorage.getItem(AppConstants.localStorageRecordKey)) || 0;
    this.snake.listenToInputs();
    this.m.timerSubscription = interval(1000).subscribe(() => {
      if (this.m.isRunning) this.m.time++;
    });
  }

  ngAfterViewInit(): void {
    this.m.gameBoard = document.querySelector('.game-board');
    window.requestAnimationFrame(this.start.bind(this));
  }

  ngOnDestroy(): void {
    this.m.timerSubscription.unsubscribe();
  }

  start(currentTime: any): void {
    if (this.m.gameOver) {
      this.m.isRunning = false;
      return console.log('Game Over');
    }
    window.requestAnimationFrame(this.start.bind(this));
    const secondsSinceLastRender = (currentTime - this.m.lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / this.snakeSpeed) return;
    this.m.lastRenderTime = currentTime;
    this.update();
    this.draw();
  }

  dpadMovement(direction: string): void {
    this.input.setDirection(direction);
  }

  update(): void {
    this.snake.update();
    this.food.update();
    this.checkDeath();
  }

  draw(): void {
    this.m.gameBoard.innerHTML = '';
    this.snake.draw(this.m.gameBoard);
    this.food.draw(this.m.gameBoard);
  }

  checkDeath(): void {
    this.m.gameOver =
      outsideGrid(this.snake.getSnakeHead()) || this.snake.snakeIntersection();
    if (!this.m.gameOver) return;
    this.m.gameBoard.classList.add('blur');
  }

  restart(): void {
    this.m.time = 0;
    window.location.reload();
  }
}
