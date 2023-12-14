import Providers from '@/components/Providers'
import ToneCSSUtils from '@/utils/css'
import NavMenu from '@sone-dao/tone-react-nav-menu'
import useUserStore from '@sone-dao/tone-react-user-store'
import { getRandomAAColor, randomColor } from 'accessible-colors'
import localforage from 'localforage'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import './globals.css'

export default function App({ Component, pageProps }: AppProps) {
  localforage.config({ name: 'Tone Shell' })

  const searchParams = useSearchParams()

  const isBeta =
    searchParams.get('debug') === 'true' && searchParams.get('env') == 'beta'

  pageProps = { ...pageProps, useUserStore }

  useEffect(() => {
    loadGlobalColors()
  })

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Providers>
        <div className="h-screen w-full flex flex-col">
          {isBeta && <NavMenu useUserStore={useUserStore} />}
          <Component {...pageProps} />
        </div>
      </Providers>
    </>
  )

  async function loadGlobalColors() {
    const colorPrimary = randomColor()
    const colorSecondary = getRandomAAColor(colorPrimary)

    ToneCSSUtils.setColors('global', colorPrimary, colorSecondary)
  }
}
