import {html, css, LitElement} from 'lit'
import language, {filterTaggedLiterals} from '../lib/languages';

customElements.define('dataset-result-main', class extends LitElement {
    static get properties() {
        return {
            subject: {type: Object},
            props: {type: Object}
        }
    }

    static get styles() {
        return css`
          :host {
            display: block;
            padding: 5px;
            padding-left: 10px;
          }
          
          a {
            text-decoration: none;
            color: black;
            white-space: nowrap;
            overflow: hidden;
            width: 100%;
            display: inline-block;
            line-height: 1.5;
          }

          h4 {
            margin-top: -3px;
            margin-bottom: 0;
          }
        `
    }

    render() {
        const titlePrefix = this.props.dataset.terms ? 'Dataset' : '';
        const [titleString] = filterTaggedLiterals(this.props.title)
        const [contactString] = filterTaggedLiterals(this.props.contactName)

        return html`<span>
            <a href="${this.subject.value}">${titlePrefix}</a>
        </span>
        <h4>
            <a href="${this.subject.value}">${titleString.value}</a>
            <span style="font-weight: 100"></span>
        </h4>
        <span>Contact: ${contactString?.value}</span>
        <br>
        ${this.__rDate('Created', this.props.dateCreated)}
        ${this.__rDate('Published', this.props.datePublished)}
        ${this.__rDate('Modified', this.props.dateModified)}`
    }

    __rDate(title, {value}) {
        if (!value) {
            return ''
        }

        return html`<span>${title}: ${new Date(value).toLocaleDateString(language[0])}</span>`
    }
})
