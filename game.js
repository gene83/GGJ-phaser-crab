const config = {
  type: Phaser.auto,
  width: 1200,
  height: 800,
  physics: {
    default: 'arcade'
  },
  scene: [Beach]
};

const game = new Phaser.Game(config);
