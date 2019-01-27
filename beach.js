class Beach extends Phaser.Scene {
  constructor() {
    super({ key: 'Beach' });
  }

  preload() {
    this.load.image('bg', 'assets/background-sand.png');
    this.load.spritesheet('crab', 'assets/crab.png', {
      frameWidth: 100,
      frameHeight: 55
    });
    this.load.image('light', 'assets/spotlight.png');
  }

  create() {
    this.background = this.add.image(0, 0, 'bg');
    this.background.height = game.height;
    this.background.weight = game.weight;

    this.lights = this.add.group();

    this.cameras.main.setBounds(0, 0, 800 * 2, 3800 * 2);
    this.physics.world.setBounds(0, 0, 800 * 2, 3800 * 2);

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

    // ADDS SPOTLIGHTS
    this.spriteBounds = Phaser.Geom.Rectangle.Inflate(
      Phaser.Geom.Rectangle.Clone(this.physics.world.bounds),
      -100,
      -100
    );

    for (let i = 0; i < 20; i++) {
      let pos = Phaser.Geom.Rectangle.Random(this.spriteBounds);

      let block = this.physics.add.image(pos.x, pos.y, 'light');

      this.lights.add(block);

      block.setVelocity(
        Phaser.Math.Between(200, 400),
        Phaser.Math.Between(200, 400)
      );

      block.setBounce(1).setCollideWorldBounds(true);

      if (Math.random() > 0.5) {
        block.body.velocity.x *= -1;
      } else {
        block.body.velocity.y *= -1;
      }
    }

    this.input.keyboard.on('keyup', e => {
      if (e.key == '2') {
        this.scene.start('Panic');
      }
    });

    this.physics.add.collider(
      this.player,
      this.lights
      //   () => {
      //   this.scene.start('Panic');
      // }
    );

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
      this.player.setVelocityY(-400);

      this.player.anims.play('walk', true);
    } else if (this.key_LEFT.isDown) {
      this.player.setVelocityX(-400);

      this.player.anims.play('walk', true);
    } else if (this.key_DOWN.isDown) {
      this.player.setVelocityY(400);

      this.player.anims.play('walk', true);
    } else if (this.key_RIGHT.isDown) {
      this.player.setVelocityX(400);

      this.player.anims.play('walk', true);
    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);

      this.player.anims.play('walk', false);
    }
  }
}
