import only from 'clownface/filter'
import language from '../lib/languages'

export default function ({html, subject}, { descrition }) {
    const [term] = descrition.filter(only.taggedLiteral(language)).terms
    return html`<span>${term?.value || ''}</span>`
}
