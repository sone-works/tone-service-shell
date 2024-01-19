import ToneCSSUtils from '@/utils/css'
import { win } from '@sone-dao/sone-react-utils'
import ToneApiService from '@sone-dao/tone-react-api'
import NavMenu from '@sone-dao/tone-react-nav-menu'
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
    checkUserSession()

    checkForGlobalColors()

    !isDarkMode ? disableDarkMode() : enableDarkMode()
  }, [])

  const searchParams = router.query

  useEffect(() => {
    loadDebug()
  }, [searchParams])

  useEffect(() => {
    updateDarkMode(isDarkMode)
  }, [isDarkMode])

  const api = new ToneApiService()

  pageProps = { ...pageProps, useUserStore }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="bg-global text-global h-full">
        <NavMenu user={user} />
        <main className="bg-global h-full">
          {' '}
          <Component {...pageProps} />
        </main>
      </div>
    </>
  )

  async function checkUserSession() {
    const userSession = localStorage.getItem('tone.session')

    if (userSession) {
      api.user
        .getSelf()
        .then((response) => response.user)
        .then((user) => {
          console.log({ user })

          ToneCSSUtils.setColors('user', user.colors[0], user.colors[1])

          useUserStore.setState({
            userId: user.userId,
            colors: user.colors,
            display: user.display,
          })
        })
        .catch((error) => {
          // Clear user data here
        })
    }
  }

  async function checkForGlobalColors() {
    const globalDarker = document
      .querySelector('body')
      ?.style.getPropertyValue('--global-darker')

    const globalLighter = document
      .querySelector('body')
      ?.style.getPropertyValue('--global-lighter')

    if (!globalDarker || !globalLighter) loadGlobalColors()
  }

  async function loadGlobalColors() {
    const colorPrimary = randomColor()
    const colorSecondary = getRandomAAColor(colorPrimary)

    return ToneCSSUtils.setColors('global', colorPrimary, colorSecondary)
  }

  function updateDarkMode(isDarkMode: boolean) {
    return isDarkMode
      ? document.querySelector('body')?.classList.add('dark')
      : document.querySelector('body')?.classList.remove('dark')
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
