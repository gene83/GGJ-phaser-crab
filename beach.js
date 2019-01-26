class Beach extends Phaser.Scene {
  constructor() {
    super({ key: 'Beach' });
  }

  preload() {
    this.load.image('bg', 'assets/background-sand.png');
    this.load.spritesheet('crab', 'assets/crab.png', {
      frameWidth: 250,
      frameHeight: 200
    });
  }

  create() {

    this.add.image(400, 300, 'bg');

    this.cameras.main.setBounds(0, 0, 800 * 2, 600 * 2);
    this.physics.world.setBounds(0, 0, 800 * 2, 600 * 2);

    this.player = this.physics.add.sprite(300, 400, 'crab');
    this.player.setCollideWorldBounds(true);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);




    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('crab', {
        start: 0,
        end: 1
      }),
      frameRate: 10,
      repeat: -1
    });

    this.key_UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.key_LEFT = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    this.key_DOWN = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );
    this.key_RIGHT = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
  }

  update(delta) {
    if (this.key_UP.isDown) {
      this.player.setVelocityY(-160);

      this.player.anims.play('walk', true);
    } else if (this.key_LEFT.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play('walk', true);
    } else if (this.key_DOWN.isDown) {
      this.player.setVelocityY(160);

      this.player.anims.play('walk', true);
    } else if (this.key_RIGHT.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play('walk', true);
    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);

      this.player.anims.play('walk', false);
    }
  }
}
