/**
 * CSP Violation Reporting Endpoint
 * Receives and logs CSP violations for security monitoring and alerting
 *
 * CSP violations indicate potential XSS attacks being blocked
 */

export default async function (trifid) {
  const { server } = trifid

  // Register content type parser for CSP reports
  server.addContentTypeParser('application/csp-report', { parseAs: 'string' }, (req, body, done) => {
    try {
      const json = JSON.parse(body)
      done(null, json['csp-report'] || json)
    } catch (err) {
      done(err)
    }
  })

  return {
    defaultConfiguration: async () => {
      return {
        methods: ['POST'],
        paths: ['/api/csp-violations']
      }
    },
    routeHandler: async () => {
      return async (request, reply) => {
        const violation = request.body

        // Extract key violation information
        const {
          'blocked-uri': blockedUri = '',
          'violated-directive': violatedDirective = '',
          'source-file': sourceFile = '',
          'original-policy': originalPolicy = ''
        } = violation

        // Log the violation
        const logEntry = {
          timestamp: new Date().toISOString(),
          type: 'CSP_VIOLATION',
          blockedUri,
          violatedDirective,
          sourceFile,
          originalPolicy,
          clientIp: request.ip,
          userAgent: request.headers['user-agent']
        }

        console.error('[CSP VIOLATION]', logEntry)

        // Detect if this looks like an attack pattern
        const isAttackPattern = detectAttackPattern({
          blockedUri,
          violatedDirective,
          sourceFile
        })

        if (isAttackPattern) {
          console.error('[SECURITY ALERT] Possible XSS attack detected', {
            timestamp: logEntry.timestamp,
            blockedUri,
            violatedDirective,
            sourceFile,
            clientIp: request.ip
          })
          // TODO: Send email alert to security team
          // TODO: Add to incident tracking system
        }

        // Return 204 No Content (standard for CSP reports)
        reply.code(204).send()
      }
    }
  }
}

/**
 * Detect common XSS attack patterns in CSP violations
 * @param {Object} violation - The CSP violation object
 * @returns {boolean} true if attack pattern detected
 */
function detectAttackPattern (violation) {
  const { blockedUri = '', violatedDirective = '', sourceFile = '' } = violation

  // Common XSS attack patterns
  const attackPatterns = [
    /javascript:/i, // javascript: protocol
    /onerror/i, // onerror event handler
    /onload/i, // onload event handler
    /onclick/i, // onclick event handler
    /onpointerover/i, // onpointerover event handler
    /onmouseover/i, // onmouseover event handler
    /onmouseenter/i, // onmouseenter event handler
    /<script/i, // script tag
    /eval\(/i, // eval() call
    /expression\(/i, // CSS expression
    /src\s*=/i, // src attribute
    /href\s*=/i // href attribute
  ]

  const violationText = `${blockedUri}|${violatedDirective}|${sourceFile}`.toLowerCase()

  return attackPatterns.some(pattern => pattern.test(violationText))
}
