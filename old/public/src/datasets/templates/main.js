import { html } from 'lit'
import '../components/dataset-result-main'

export default function ({ subject }, props) {
    return html`<dataset-result-main .subject="${subject}" .props="${props}"></dataset-result-main>`
}
