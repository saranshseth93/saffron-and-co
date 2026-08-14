/**
 * Royalty-free image providers.
 *
 * Each adapter normalises a provider's search response into the same shape so
 * the resolver can pin a candidate and the credits generator can attribute it
 * without knowing which provider it came from.
 *
 * Pexels    — needs a free API key in PEXELS_API_KEY. Best photographic quality.
 * Openverse — no key required. CC0 / public-domain only, so attribution is
 *             always safe even though CC0 does not legally require it.
 */

/** @typedef {{
 *   provider: string,
 *   id: string,
 *   downloadUrl: string,
 *   sourcePage: string,
 *   creator: string,
 *   creatorUrl: string,
 *   licence: string,
 *   licenceUrl: string,
 *   alt: string,
 *   width: number,
 *   height: number,
 * }} Candidate
 */

const USER_AGENT =
  'pixel-pundit-demo-image-resolver (+https://github.com/saranshseth93)'

async function getJson(url, headers = {}) {
  const res = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT, Accept: 'application/json', ...headers },
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(
      `${new URL(url).host} responded ${res.status}: ${body.slice(0, 300)}`
    )
  }
  return res.json()
}

/**
 * @param {{ query: string, orientation?: string, count?: number, key: string }} opts
 * @returns {Promise<Candidate[]>}
 */
export async function searchPexels({ query, orientation, count = 40, key }) {
  const url = new URL('https://api.pexels.com/v1/search')
  url.searchParams.set('query', query)
  url.searchParams.set('per_page', String(Math.min(count, 80)))
  if (orientation) url.searchParams.set('orientation', orientation)

  const json = await getJson(url.href, { Authorization: key })

  return (json.photos ?? [])
    .filter((p) => p?.src?.original)
    .map((p) => ({
      provider: 'pexels',
      id: String(p.id),
      // `original` is the untouched upload; we downscale it ourselves.
      downloadUrl: p.src.original,
      sourcePage: p.url,
      creator: p.photographer ?? 'Unknown',
      creatorUrl: p.photographer_url ?? '',
      licence: 'Pexels License',
      licenceUrl: 'https://www.pexels.com/license/',
      alt: (p.alt ?? '').trim(),
      width: p.width ?? 0,
      height: p.height ?? 0,
    }))
}

/**
 * @param {{ query: string, orientation?: string, count?: number }} opts
 * @returns {Promise<Candidate[]>}
 */
export async function searchOpenverse({ query, orientation, count = 40 }) {
  const url = new URL('https://api.openverse.org/v1/images/')
  url.searchParams.set('q', query)
  // CC0 and public domain, plus CC-BY. Attribution is generated automatically
  // into CREDITS.md, so BY costs us nothing; share-alike and non-commercial
  // stay excluded because a client site should never inherit those terms.
  //
  // Restricting to cc0,pdm alone leaves the corpus far too thin: a first run
  // returned zero candidates for nine of twelve slots.
  url.searchParams.set('license', 'cc0,pdm,by')
  url.searchParams.set('page_size', String(Math.min(count, 20)))
  url.searchParams.set('mature', 'false')
  // Deliberately no aspect_ratio filter. Every slot is cropped to its own
  // aspect at build time anyway, so filtering here only shrinks an already
  // small result set.

  const json = await getJson(url.href)

  return (json.results ?? [])
    .filter((r) => r?.url)
    .map((r) => ({
      provider: 'openverse',
      id: String(r.id),
      downloadUrl: r.url,
      sourcePage: r.foreign_landing_url ?? r.url,
      creator: r.creator ?? 'Unknown',
      creatorUrl: r.creator_url ?? '',
      licence: [r.license?.toUpperCase(), r.license_version]
        .filter(Boolean)
        .join(' ')
        .trim(),
      licenceUrl: r.license_url ?? '',
      alt: (r.title ?? '').trim(),
      width: r.width ?? 0,
      height: r.height ?? 0,
    }))
}

/**
 * Pick the provider to use. Pexels when a key is present, Openverse otherwise,
 * so the pipeline still works on a fork with no secrets configured.
 * @param {string | undefined} pexelsKey
 */
export function selectProvider(pexelsKey) {
  if (pexelsKey) {
    return {
      name: 'pexels',
      search: (opts) => searchPexels({ ...opts, key: pexelsKey }),
    }
  }
  return { name: 'openverse', search: searchOpenverse }
}
