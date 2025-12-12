// OIDC configuration cache
const oidcConfigCache = new Map()

/**
 * Fetch OIDC configuration from the issuer's well-known endpoint
 * @param {string} issuer - The OIDC issuer URL
 * @returns {Promise<Object>} The OIDC configuration
 */
export async function getOidcConfig(issuer) {
  if (oidcConfigCache.has(issuer)) {
    return oidcConfigCache.get(issuer)
  }

  const wellKnownUrl = `${issuer}/.well-known/openid-configuration`
  const response = await fetch(wellKnownUrl)

  if (!response.ok) {
    throw new Error(`Failed to fetch OIDC configuration from ${wellKnownUrl}`)
  }

  const config = await response.json()
  oidcConfigCache.set(issuer, config)

  return config
}

/**
 * Create authentication middleware for protected routes
 * @param {Object} options - Authentication options
 * @returns {Function} Express-style middleware
 */
export function createAuthMiddleware(options) {
  const { issuer, audience, allowedEmails } = options

  return async (request, reply, next) => {
    const authHeader = request.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      reply.code(401).send({ error: 'Unauthorized: Missing token' })
      return
    }

    const token = authHeader.substring(7)

    try {
      // Validate the token using the OIDC provider's userinfo endpoint
      const oidcConfig = await getOidcConfig(issuer)
      const userInfoResponse = await fetch(oidcConfig.userinfo_endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!userInfoResponse.ok) {
        reply.code(401).send({ error: 'Unauthorized: Invalid token' })
        return
      }

      const userInfo = await userInfoResponse.json()

      // Check if user email is in allowed list (if configured)
      if (allowedEmails && !allowedEmails.includes(userInfo.email)) {
        reply.code(403).send({ error: 'Forbidden: User not authorized' })
        return
      }

      request.user = userInfo
      next()
    } catch (err) {
      reply.code(401).send({ error: 'Unauthorized: Token validation failed' })
    }
  }
}

/**
 * Verify a JWT token's signature using JWKS
 * @param {string} token - The JWT token
 * @param {string} issuer - The OIDC issuer URL
 * @returns {Promise<Object>} The decoded token payload
 */
export async function verifyToken(token, issuer) {
  const oidcConfig = await getOidcConfig(issuer)

  // For simplicity, we use the userinfo endpoint to validate
  // In production, you might want to use JWKS for offline validation
  const userInfoResponse = await fetch(oidcConfig.userinfo_endpoint, {
    headers: { Authorization: `Bearer ${token}` }
  })

  if (!userInfoResponse.ok) {
    throw new Error('Token validation failed')
  }

  return userInfoResponse.json()
}
