/** @type {import('next').NextConfig} */

import NextFederationPlugin from '@module-federation/nextjs-mf'

export default async () => {
  //process.env.NEXT_PRIVATE_LOCAL_WEBPACK = true

  return {
    webpack: (config, { isServer }) => {
      // NextFederationPlugin conveniently shares required modules

      config.plugins.push(
        new NextFederationPlugin({
          name: 'tone-shell',
          filename: 'static/chunks/remoteEntry.js',
        })
      )

      return config
    },
  }
}
