import { filterTaggedLiterals } from '../lib/languages'

export default function ({html, subject}, { descrition }) {
    const [term] = filterTaggedLiterals(descrition)
    return html`<span>${term?.value || ''}</span>`
}
