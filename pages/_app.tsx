import Providers from '@/components/Providers'
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
import './globals.css'

export default function App({ Component, pageProps, router }: AppProps) {
  localforage.config({ name: 'Tone Shell' })

  const user = useUserStore()
  const styles = useStyleStore()

  useColorWatcher()

  useEffect(() => {
    loadGlobalColors()
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
        <title>Tone</title>
      </Head>
      <Providers>
        <div className="min-h-screen h-full w-full flex flex-col">
          {<NavMenu user={user} />}
          <Component {...pageProps} />
        </div>
      </Providers>
    </>
  )

  async function useColorWatcher() {
    useEffect(() => {
      if (styles.global[0] && styles.global[1])
        ToneCSSUtils.setColors('global', styles.global[0], styles.global[1])

      if (styles.user[0] && styles.user[1])
        ToneCSSUtils.setColors('user', styles.user[0], styles.user[1])
    }, [styles])

    useEffect(() => {
      useStyleStore.setState({
        user: user.colors || [styles.global[0], styles.global[1]],
      })
    }, [user.colors])
  }

  async function loadGlobalColors() {
    const colorPrimary = randomColor()
    const colorSecondary = getRandomAAColor(colorPrimary)

    useStyleStore.setState({ global: [colorPrimary, colorSecondary] })
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
