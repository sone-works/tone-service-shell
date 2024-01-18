import ToneCSSUtils from '@/utils/css'
import { win } from '@sone-dao/sone-react-utils'
import NavMenu from '@sone-dao/tone-react-nav-menu'
import useStyleStore from '@sone-dao/tone-react-style-store'
import useUserStore from '@sone-dao/tone-react-user-store'
import { getRandomAAColor, randomColor } from 'accessible-colors'
import localforage from 'localforage'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { useDarkMode } from 'usehooks-ts'
import './globals.css'

export default function App({ Component, pageProps, router }: AppProps) {
  const {
    isDarkMode,
    enable: enableDarkMode,
    disable: disableDarkMode,
  } = useDarkMode()

  localforage.config({ name: 'Tone Shell' })

  const user = useUserStore()

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

  useEffect(() => {
    isDarkMode
      ? document.querySelector('body')?.classList.add('dark')
      : document.querySelector('body')?.classList.remove('dark')
  }, [isDarkMode])

  pageProps = { ...pageProps, useUserStore, useStyleStore }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="h-full">
        <NavMenu user={user} />
        <main className="bg-global h-full">
          {' '}
          <Component {...pageProps} />
        </main>
      </div>
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
        darkMode: searchParams.darkMode,
      }

      if (searchParams.darkMode) {
        searchParams.darkMode == 'true' && enableDarkMode()

        searchParams.darkMode == 'false' && disableDarkMode()

        console.log('Dark Mode set to', searchParams.darkMode)
      }

      console.log('Debug environment initialized.')
    }
  }
}
