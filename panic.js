class Panic extends Phaser.Scene {
  constructor() {
    super({ key: 'Panic' });
  }

  preload() {
    this.load.image('BG', 'assets/background-sand.png');

    this.load.spritesheet('crab', 'assets/crab.png', {
      frameWidth: 100,
      frameHeight: 55
    });

    this.load.spritesheet('net', 'assets/net.png', {
      frameWidth: 336,
      frameHeight: 560
    });
  }

  create() {
    this.background = this.add.image(800, 5000, 'BG');
    this.cameras.main.setBounds(0, 0, 800 * 2, 5000 * 2);
    this.physics.world.setBounds(0, 0, 800 * 2, 5000 * 2);

    this.player = this.physics.add.sprite(300, 400, 'crab');
    this.player.setCollideWorldBounds(true);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    this.net = this.physics.add.sprite(400, 400, 'net');

    this.anims.create({
      key: 'panicWalk',
      frames: this.anims.generateFrameNumbers('crab', {
        start: 0,
        end: 1
      }),
      frameRate: 20
    });

    this.anims.create({
      key: 'netDown',
      frames: this.anims.generateFrameNumbers('net', {
        start: 0,
        end: 3
      }),
      frameRate: 4,
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
      this.player.setVelocityY(-800);

      this.player.anims.play('panicWalk', true);
    } else if (this.key_LEFT.isDown) {
      this.player.setVelocityX(-800);

      this.player.anims.play('panicWalk', true);
    } else if (this.key_DOWN.isDown) {
      this.player.setVelocityY(800);

      this.player.anims.play('panicWalk', true);
    } else if (this.key_RIGHT.isDown) {
      this.player.setVelocityX(800);

      this.player.anims.play('panicWalk', true);
    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);

      this.player.anims.play('panicWalk', true);
    }

    // this.cameras.main.flash(500, 198, 40, 40, false);
    // this.cameras.main.shake(1000, 0.005, false);

    this.net.anims.play('netDown', true);
  }
}
