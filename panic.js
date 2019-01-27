class Panic extends Phaser.Scene {
  constructor() {
    super({ key: 'Panic' });
  }

  preload() {
    this.load.spritesheet('panicBG', 'assets/panic-mode.png'),
      {
        frameWidth: 400,
        frameHeight: 7600
      };
  }

  create() {
    this.background = this.add.sprite(800, 38000, 'panicBG');

    this.cameras.main.setBounds(0, 0, 1600 * 2, 7600 * 2);
    this.physics.world.setBounds(0, 0, 1600 * 2, 7600 * 2);

    this.anims.create({
      key: 'flashBackground',
      frames: this.anims.generateFrameNumbers('panicBG', {
        start: 0,
        end: 1
      }),
      frameRate: 15,
      repeat: -1
    });
  }

  update() {
    this.background.anims.play('flashBackground', true);
  }
}
