import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['../../assets/sass/board.scss']
})
export class BoardComponent implements OnInit, OnChanges {

  @Input() click: boolean = false;
  @Output() hole: EventEmitter<any> = new EventEmitter();
  public score: number;
  public time: number;
  public lastHole;
  public timeUp;
  public holeName;
  public clicked = false;
  public holeClasses: any = [];
  public slap = new Audio();
  public belichick = new Audio();

  constructor() { }

  ngOnInit() {
    this.slap.src = '../../assets/audio/slap.mp3';
    this.startGame();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['click'] && this.timeUp == true) {
      this.startGame();
    }
  }

  startGame() {
    this.score = 0;
    this.time = 20;
    this.timeUp = false;
    this.startTimer();
    this.popUp();
  }

  getTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  getHole() {
    const id = Math.floor(Math.random() * 9);
    const hole = 'hole' + id;

    if (hole == this.lastHole) {
      return this.getHole();
    }
    this.lastHole = hole;
    this.clicked = false;
    return hole;
  }

  getPlayer() {
    const id = Math.floor(Math.random() * 3);
    let player;

    switch(id) {
      case 0:
        player = 'belichick';
        break;
      case 1:
        player = 'edelman';
        break;
      case 2:
        player = 'brady';
        break;
    }
    return player;
  }

  startTimer() {
    setTimeout(() => {
      if (this.time !== 0) {
        this.time--;
        this.startTimer();
      } else {
        this.timeUp = true;
      }
    }, 1000);
  }

  popUp() {
    const time = this.getTime(400, 1200);

    this.holeName = this.getHole();
    this.holeClasses[this.holeName] = this.getPlayer();
    setTimeout(() => {
      if (!this.timeUp) {
        this.popUp();
      }
    }, time);
  }

  calculatePoints() {
    if (!this.clicked) {
      this.score += 5;
    }
    this.clicked = true;
  }

  handleClick() {
    this.slap.load();
    this.slap.play();
    if (this.holeClasses[this.holeName] == 'belichick') {
      const id = Math.floor(Math.random() * 4);
      this.belichick.src='../../assets/audio/belichick_' + id + '.mp3';
      this.belichick.load();
      this.belichick.play();
    }
    this.calculatePoints();
  }
}
