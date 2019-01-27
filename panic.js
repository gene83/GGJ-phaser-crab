class Panic extends Phaser.Scene {
  constructor() {
    super({ key: 'Panic' });
  }

  preload() {
    this.load.image('redBG', 'assets/background-sand-red.png');
  }

  create() {
    this.background = this.add.image(400, 400, 'redBG');
    this.background.height = game.height;
    this.background.weight = game.weight;

    console.log(game.height, game.width);
    // this.anims.create({
    //   key: 'flashBackground',
    //   frames: this.anims.generateFrameNumbers('panicBG', {
    //     start: 0,
    //     end: 1
    //   }),
    //   frameRate: 15,
    //   repeat: -1
    // });
  }

  update() {
    // this.background.anims.play('flashBackground', true);
  }
}
