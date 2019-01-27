class End extends Phaser.Scene {
  constructor() {
    super({ key: 'End' });
  }

  preload() {
    this.load.image('menu-screen', 'assets/menu.png');
  }

  create() {
    this.highScore = this.add.text(475, 800, 'HighScore: ');
  }

  update(delta) {

  }
}
