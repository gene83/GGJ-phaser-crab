const config = {
  type: Phaser.auto,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade'
  },
  scene: [Beach]
};

const game = new Phaser.Game(config);
