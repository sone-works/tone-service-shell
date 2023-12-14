/** @type {import('next').NextConfig} */

import NextFederationPlugin from '@module-federation/nextjs-mf'

export default async () => {
  //process.env.NEXT_PRIVATE_LOCAL_WEBPACK = true

  return {
    webpack: (config, { isServer }) => {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'tone-shell',
          filename: 'static/chunks/remoteEntry.js',
          remotes: {
            /*bucket: `bucket@http://localhost:3000/_next/static/${
              isServer ? 'ssr' : 'chunks'
            }/remoteEntry.js`,*/
          },
        })
      )

      return config
    },
  }
}
