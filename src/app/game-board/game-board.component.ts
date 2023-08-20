import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { FoodService } from '../services/food.service';
import { InputService } from '../services/input.service';
import { ObstaclesService } from '../services/obstacles.service';
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
    private readonly obstacles: ObstaclesService,
  ) {}

  get snakeSpeed(): number {
    return this.m.level < 10
      ? this.m.baseSpeed + this.m.level
      : this.m.baseSpeed + 10;
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

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Space') {
        this.togglePause();
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.code === 'KeyR') {
        this.restart();
      }
    });
  }

  ngOnDestroy(): void {
    this.m.timerSubscription.unsubscribe();
  }

  start(currentTime: any): void {
    if (this.m.isPaused) return;
    if (this.m.gameOver) {
      this.m.isRunning = false;
      return console.log('Game Over');
    }
    window.requestAnimationFrame(this.start.bind(this));
    const secondsSinceLastRender = (currentTime - this.m.lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / this.snakeSpeed) return;
    this.m.lastRenderTime = currentTime;
    this.update();
    if (!this.m.gameOver) this.draw();
  }

  togglePause(): void {
    this.m.isPaused = !this.m.isPaused;
    if (!this.m.isPaused) {
      this.start(performance.now());
    }
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
    this.obstacles.draw(this.m.gameBoard);
  }

  checkDeath(): void {
    if (!this.m.gameOver) return;
    this.m.gameBoard.classList.add('blur');
  }

  restart(): void {
    this.m.time = 0;
    window.location.reload();
  }
}
