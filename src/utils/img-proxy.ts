export const getImageProxyUrl = ({
  url,
  width,
  height,
}: {
  url: string
  width: number
  height: number
}) => {
  return `https://webp.dev.follow.is?url=${encodeURIComponent(
    url,
  )}&width=${width}&height=${height}`
}

export const getUrlIcon = (url: string, fallback?: boolean | undefined) => {
  let src: string
  let fallbackUrl = ''

  try {
    const { host } = new URL(url)
    const pureDomain = getDomainWithoutSuffix(host)
    fallbackUrl = `https://avatar.vercel.sh/${pureDomain}.svg?text=${pureDomain
      ?.slice(0, 2)
      .toUpperCase()}`
    src = `https://unavatar.follow.is/${host}?fallback=${fallback || false}`
  } catch {
    const pureDomain = getDomainWithoutSuffix(url)
    src = `https://avatar.vercel.sh/${pureDomain}.svg?text=${pureDomain
      ?.slice(0, 2)
      .toUpperCase()}`
  }
  const ret = {
    src,
    fallbackUrl,
  }

  return ret
}

function getDomainWithoutSuffix(hostname: string): string {
  const parts = hostname.split('.')
  if (parts.length <= 2) return parts[0]

  // List of common TLDs (not exhaustive)
  const commonTLDs = [
    'com',
    'org',
    'net',
    'edu',
    'gov',
    'co.uk',
    'co.jp',
    'com.au',
  ]

  for (const tld of commonTLDs) {
    if (hostname.endsWith(`.${tld}`)) {
      return parts.at(-3)
    }
  }

  // Default case: return the second-to-last part
  return parts.at(-2)
}
