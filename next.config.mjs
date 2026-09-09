import { withPayload } from '@payloadcms/next/withPayload'

const payloadServerPackages = [
  'payload',
  '@payloadcms/db-mongodb',
  'mongodb',
  'mongoose',
  'pino',
  'pino-pretty',
  'pino-abstract-transport',
  'thread-stream',
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.1.31', 'localhost'],
  images: {
    domains: [
      'mea-nova.vercel.app',
      'meanova.vercel.app',
      'public.blob.vercel-storage.com',
    ],
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  serverExternalPackages: payloadServerPackages,
  webpack: (webpackConfig, { isServer }) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    if (isServer) {
      const externals = webpackConfig.externals || []
      webpackConfig.externals = [
        ...(Array.isArray(externals) ? externals : [externals]),
        ({ request }, callback) => {
          if (request === 'worker_threads' || payloadServerPackages.includes(request)) {
            return callback(null, `commonjs ${request}`)
          }
          callback()
        },
      ]
    } else {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        worker_threads: false,
        fs: false,
        'pino-pretty': false,
        'pino-abstract-transport': false,
        'thread-stream': false,
      }
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
