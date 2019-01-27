class End extends Phaser.Scene {
  constructor() {
    super({ key: 'End' });
  }

<<<<<<< HEAD
  preload() {
    this.load.image('menu-screen', 'assets/menu.png');
  }

  create() {
    this.highScore = this.add.text(475, 800, 'HighScore: ');
  }

  update(delta) {

=======
  init(data) {
    this.points = data.points;
  }

  create() {
    this.text = this.add.text(`YOU'VE BEEN CAUGHT
    Score: ${this.points}`);
>>>>>>> f6e8881c34bcf1dcb374323c9ecc337411a4867f
  }
}
