import { DisplayMode, Engine } from 'excalibur'
import { loader } from './resources'
import { Level1 } from './scenes/level1'
import { calculateExPixelConversion } from './utils'

class Game extends Engine {
  constructor() {
    super({
      width: 800,
      height: 600,
      canvasElementId: 'game',
      displayMode: DisplayMode.FitScreen,
    })
  }
  async initialize() {
    await this.start(loader)
    calculateExPixelConversion(game.screen)

    const level1 = new Level1()
    this.add('level1', level1)
    this.goToScene('level1')

    this.screen.events.on('resize', () =>
      calculateExPixelConversion(game.screen),
    )
  }
}

export const game = new Game()
game.initialize()
