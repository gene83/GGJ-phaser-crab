class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'Menu' });
  }

  preload() {
    this.load.image('menu-screen', 'assets/menu.png');
    this.load.audio('start', 'assets/start.mp3');
  }

  create() {
    this.background = this.add.image(600, 600, 'menu-screen');
    const playButton = this.add.text(475, 800, 'PLAY', { fill: '#F57C00', font: '100px monospace' });
    this.start = this.sound.add('start');
    playButton.setInteractive().on('pointerhover', () => { this.playButton.setStyle({ fill: '#fff' }); }).on('pointerdown', () => {

      this.start.play();
      setTimeout(() => {
        this.scene.start('Beach');
      }, 2000);
    });
  }

  update(delta) {

  }
}