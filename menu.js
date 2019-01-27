class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'Menu' });
  }

  preload() {
    this.load.image('menu-screen', 'assets/menu.png');
  }

  create() {
    this.background = this.add.image(600, 600, 'menu-screen');
    const playButton = this.add.text(475, 800, 'PLAY', { fill: '#F57C00', font: '100px monospace' });
    playButton.setInteractive().on('pointerhover', () => { this.playButton.setStyle({ fill: '#fff' }); }).on('pointerdown', () => this.scene.start('Beach'));
  }

  update(delta) {

  }
}