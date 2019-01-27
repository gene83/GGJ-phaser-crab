class Beach extends Phaser.Scene {
  constructor() {
    super({ key: 'Beach' });
  }

  init(data) {
    this.score = data.points;
  }

  preload() {
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });

    progressBar.x = 190;
    progressBar.y = 300;
    progressBox.x = 190;
    progressBox.y = 300;
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });

    percentText.setOrigin(0.5, 0.5);

    this.load.on('progress', value => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
      percentText.setText(parseInt(value * 100) + '%');
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
    });

    this.load.image('bg', 'assets/background-sand.png');
    this.load.image('hole', 'assets/hole.png');
    this.load.audio('ping', 'assets/ding.wav');
    this.load.audio('rize', 'assets/rize-up.mp3');
    this.load.audio('main', 'assets/main.mp3');

    this.load.spritesheet('crab', 'assets/crab.png', {
      frameWidth: 100,
      frameHeight: 55
    });
    this.load.image('light', 'assets/spotlight.png');
    this.load.spritesheet('plankton', 'assets/plankton.png', {
      frameWidth: 90,
      frameHeight: 85,
      endFrame: 3
    });
  }

  create() {
    this.background = this.add.image(800, 6000, 'bg');
    this.background.height = this.game.height;
    this.background.weight = this.game.weight;
    this.hole = this.add.image(800, 11900, 'hole');
<<<<<<< HEAD

    this.ping = this.sound.add('ping');
=======
    //Sounds
    this.music = this.sound.add('sfx');
<<<<<<< HEAD
    this.mainTheme = this.sound.add('main');
    this.mainTheme.play();

=======
>>>>>>> c59660e41c0570d53d719540637b3dc17b364c4d
    this.rize = this.sound.add('rize');
    this.rize.play();
>>>>>>> f6e8881c34bcf1dcb374323c9ecc337411a4867f

    this.lights = this.add.group();
    this.shining = this.add.group();

    if (!this.score) {
      this.score = 0;
    }

    this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
      font: '60px monospace',
      fill: 'rgba(255, 255, 255, 0.75)'
    });
    this.scoreText.setScrollFactor(0);

    this.cameras.main.setBounds(0, 0, 800 * 2, 6000 * 2);
    this.physics.world.setBounds(0, 0, 800 * 2, 6000 * 2);

    this.player = this.physics.add.sprite(800, 11860, 'crab');
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

    this.anims.create({
      key: 'shine',
      frames: this.anims.generateFrameNumbers('plankton', {
        start: 0,
        end: 1
      }),
      frameRate: 5,
      repeat: -1
    });

    for (let i = 0; i < 90; i++) {
      this.plankton = this.physics.add.sprite(
        Math.ceil(Math.random() * 1600) + 1,
        Math.ceil(Math.random() * 11500) + 1,
        'plankton'
      );
      this.plankton.setCollideWorldBounds(true);
      this.shining.add(this.plankton);
    }

    this.shining.playAnimation('shine');

    this.physics.add.overlap(this.shining, this.player, e => {
      e.disableBody(true, true);
      this.score += 100;
      this.scoreText.setText('Score: ' + this.score);
      this.music.play();

      null, this;
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

    this.physics.add.overlap(
      this.player,
      this.lights,
      () => {
        this.timedEvent = this.time.delayedCall(400, onEvent, [], this);
        this.mainTheme.stop();
        if (!this.lights.overlap) {
          return this.timedEvent;
        }
      },
      null,
      this
    );

    function onEvent() {
      this.scene.start('Panic', {
        points: this.score
      });
    }

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
