import Providers from '@/components/Providers'
import ToneCSSUtils from '@/utils/css'
import { win } from '@sone-dao/sone-react-utils'
import NavMenu from '@sone-dao/tone-react-nav-menu'
//import usePlayerStore from '@sone-dao/tone-react-player-store'
import useStyleStore from '@sone-dao/tone-react-style-store'
import useUserStore from '@sone-dao/tone-react-user-store'
import { getRandomAAColor, randomColor } from 'accessible-colors'
import localforage from 'localforage'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import './globals.css'

export default function App({ Component, pageProps, router }: AppProps) {
  localforage.config({ name: 'Tone Shell' })

  const user = useUserStore()
  //const player = usePlayerStore()

  useEffect(() => {
    const globalDarker = document
      .querySelector('html')
      ?.style.getPropertyValue('--global-darker')

    const globalLighter = document
      .querySelector('html')
      ?.style.getPropertyValue('--global-lighter')

    if (!globalDarker || !globalLighter) loadGlobalColors()
  }, [])

  const searchParams = router.query

  useEffect(() => {
    loadDebug()
  }, [searchParams])

  pageProps = { ...pageProps, useUserStore, useStyleStore }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Providers>
        <div className="max-h-screen h-screen w-full flex flex-col overflow-y-hidden">
          <NavMenu user={user} />
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

  async function loadDebug() {
    if (searchParams.debug) {
      win.__TONE_DEBUG__ = {
        api: searchParams.api,
        isDebug: searchParams.debug == 'true',
        env: searchParams.env,
      }

      console.log('Debug environment initialized.')
    }
  }
}
