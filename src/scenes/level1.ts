import { signal } from '@preact/signals'
import { Engine, Scene } from 'excalibur'
import { html, render } from 'htm/preact'
import { ui } from '../ui/level1'
import { Player } from '../player'

export class Level1 extends Scene {
  score = signal(0)

  onInitialize(_engine: Engine<any>): void {
    const player = new Player(() => {
      this.score.value++
    })
    this.add(player)

    this.buildUI()
  }

  buildUI() {
    render(
      html`<${ui} score=${this.score} />`,
      document.querySelector('#menu')!,
    )
  }
}
