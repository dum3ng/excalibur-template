import { Actor, vec } from 'excalibur'
import { Resources } from './resources'

export class Player extends Actor {
  constructor(private onclick: Function) {
    super({
      pos: vec(150, 150),
      width: 100,
      height: 100,
    })
  }

  onInitialize() {
    this.graphics.add(Resources.Sword.toSprite())
    this.on('pointerup', () => {
      this.onclick()
    })
  }
}
