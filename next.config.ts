import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/saffron-and-co' : '',
  assetPrefix: isProd ? '/saffron-and-co/' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/saffron-and-co' : '',
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
