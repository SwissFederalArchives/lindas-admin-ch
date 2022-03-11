export default function ({html, subject}, {landingPage, sparqlEndpoint}) {
    return html`<span>
        <a target="_blank" href="${landingPage}">Info</a>
    </span>
    <br>
    <span>
        SPARQL Endpoint: ${sparqlEndpoint}
    </span>`
}
