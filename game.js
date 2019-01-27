const config = {
  type: Phaser.auto,
  width: 1200,
  height: 1200,
  physics: {
    default: 'arcade'
  },
  scene: [Beach]
};

const game = new Phaser.Game(config);
