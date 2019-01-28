class Panic extends Phaser.Scene {
  constructor() {
    super({ key: 'Panic' });
    this.points = null;
  }

  init(data) {
    this.points = data.points;
  }

  preload() {
    this.load.image('BG', 'assets/background-sand.png');
    this.load.spritesheet('crab', 'assets/crab.png', {
      frameWidth: 100,
      frameHeight: 55
    });

    this.load.image('hole', 'assets/hole.png', {
      frameWidth: 100,
      frameHeight: 55
    });

    this.load.spritesheet('net', 'assets/net.png', {
      frameWidth: 336,
      frameHeight: 560
    });
    this.load.audio('tada', 'assets/ta-da.mp3');
    this.load.audio('panic-track', 'assets/Panic.mp3');
  }

  create() {
    this.background = this.add.image(800, 5000, 'BG');
    this.cameras.main.setBounds(0, 0, 800 * 2, 5000 * 2);
    this.physics.world.setBounds(0, 0, 800 * 2, 5000 * 2);
    // (this.score = this.points),
    this.scoreText = this.add.text(16, 16, `Score: ${this.points}`, {
      font: '60px monospace',
      fill: 'rgba(255, 255, 255, 0.75)'
    });
    this.scoreText.setScrollFactor(0);

    this.dreaded = this.sound.add('panic-track');
    this.dreaded.play();

    this.hole = this.physics.add.image(800, 9900, 'hole');
    // this.hole.setCollideWorldBounds(true);
    this.nets = this.add.group();

    this.player = this.physics.add.sprite(300, 400, 'crab');
    this.nets = this.add.group();

    this.player.setCollideWorldBounds(true);
    this.cameras.main.startFollow(this.player, true, 0.5, 0.5, null, -100);

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
      frameRate: 4
    });

    this.createNet = function () {
      this.net = this.physics.add.sprite(
        Math.ceil(Math.random() * 2000) + 1,
        this.player.y + 420,
        'net'
      );

      this.net.anims.play('netDown', false);

      // this.net.on(
      //   'animationcomplete',
      //   function() {
      //     this.net.destroy();
      //   },
      //   this
      // );

      this.nets.add(this.net);
      this.net.anims.play('netDown', true);
    };

    this.makeNet = this.createNet.bind(this);

    this.intervalId = setInterval(this.makeNet, 450);
    this.nets.playAnimation('netDown');

    this.physics.add.overlap(
      this.player,
      this.hole,
      () => {
        clearInterval(this.intervalId);
        this.player.disableBody(true, true);
        this.cameras.main.fade(2000, 0, 0, 0);
        this.dreaded.stop();

        setTimeout(() => {
          this.scene.start('Beach', { points: this.points });
        }, 2000);
      },
      null,
      this
    );

    this.physics.add.overlap(this.nets, this.player, e => {
      if (e.frame.name == 3) {
        this.dreaded.stop();
        this.scene.pause();
        setTimeout(() => {
          this.scene.start('End', { points: this.points });
        }, 1000);
      }
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
      this.player.anims.play('panicWalk', true);
    }

    this.cameras.main.flash(500, 198, 40, 40, false);
    this.cameras.main.shake(1000, 0.005, false);
  }
}
