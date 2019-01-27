class End extends Phaser.Scene {
  constructor() {
    super({ key: 'End' });
  }

  init(data) {
    this.points = data.points;
  }

  create() {
    this.message = this.add.text(280, 300, "YOU'VE BEEN CAUGHT!", {
      font: '60px monospace'
    });
    this.scoreData = this.add.text(450, 380, 'SCORE: ' + this.points, {
      font: '60px monospace'
    });
    this.restart = this.add.text(380, 700, "RESTART", { fill: '#F57C00', font: '100px monospace' });
    this.restart.setInteractive().on('pointerhover', () => { this.playButton.setStyle({ fill: '#fff' }); }).on('pointerdown', () => this.scene.start('Beach'));

  }
}
