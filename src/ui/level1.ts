import { html } from 'htm/preact'

export function ui(props: { score: number }) {
  return html`<div
    class=" ex-scale trans-tl text-lg font-bold text-white pt-2 pl-2"
  >
    SCORE: ${props.score}
  </div>`
}
