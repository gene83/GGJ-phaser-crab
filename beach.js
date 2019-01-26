class Beach extends Phaser.Scene {
  constructor() {
    super({ key: 'Beach' });
  }

  preload() {
    this.load.image('crab', 'assets/crab.png');
  }

  create() {
    this.image = this.add.image(300, 500, 'crab');

    this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }

  update(delta) {
    if (this.key_W.isDown) {
      this.image.y--;
    }
    if (this.key_A.isDown) {
      this.image.x--;
    }
    if (this.key_S.isDown) {
      this.image.y++;
    }
    if (this.key_D.isDown) {
      this.image.x++;
    }
  }
}
