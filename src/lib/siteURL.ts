export function getSiteURL(): string {
  const explicit = (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.BASE_DOAMAIN ||
    ''
  ).replace(/\/$/, '')

  if (explicit) return explicit

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/^https?:\/\//, '')}`
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, '')}`
  }

  return 'http://localhost:3000'
}

export function absoluteUrl(path = '/'): string {
  const origin = getSiteURL()
  if (!path || path === '/') return origin
  return `${origin}${path.startsWith('/') ? path : `/${path}`}`
}
