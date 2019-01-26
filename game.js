const Phaser = require('phaser');

const config = {
  type: phaser.auto,
  width: 300,
  height: 600,
  physics: {
    default: 'arcade'
  },
  scene: [beach]
};

const game = new Phaser.Game(config);
