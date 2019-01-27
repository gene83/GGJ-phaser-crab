const config = {
  type: Phaser.auto,
  width: 1200,
  height: 1200,
  physics: {
    default: 'arcade'
  },
  scene: [Menu, Beach, Panic, End]
};

const game = new Phaser.Game(config);
