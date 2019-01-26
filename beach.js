const Phaser = require('phaser');

class Beach extends Phaser.Scene {
  constructor() {
    super({key: 'Beach'})
  }
}

preload() {
  this.load.image('key', 'assets/example.jpg')
}

create() {
  this.image = this.add.image(400, 300, 'key')


}

update(delta) {
  
}