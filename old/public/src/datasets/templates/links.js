export default function ({html, subject}, props) {
    let landingPage = ''
    if (props.landingPage.value) {
        landingPage = html`<span>
            <a target="_blank" href="${props.landingPage.value}">Info</a>
        </span>
        <br>`
    }

    let sparqlEndpoint = ''
    if (props.sparqlEndpoint.value) {
        sparqlEndpoint = html`<span>
            SPARQL Endpoint: <a href="${props.sparqlEndpoint.value}" target="_blank">${props.sparqlEndpoint.value}</a>
        </span>`
    }

    return html`${landingPage}${sparqlEndpoint}`
}
