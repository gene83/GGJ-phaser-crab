class End extends Phaser.Scene {
  constructor() {
    super({ key: 'End' });
  }

  init(data) {
    this.points = data.points;
  }

  create() {
    this.text = this.add.text(`YOU'VE BEEN CAUGHT
    Score: ${this.points}`);
  }
}
