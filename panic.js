class Panic extends Phaser.Scene {
  constructor() {
    super({ key: 'Panic' });
  }

  preload() {
    this.load.image('redBG', 'assets/background-sand-red.png');
  }

  create() {
    this.background = this.add.image(800, 5000, 'redBG');
    this.cameras.main.setBounds(0, 0, 1600 * 2, 5000 * 2);
    this.physics.world.setBounds(0, 0, 1600 * 2, 5000 * 2);
  }

  update() {

  }
}
