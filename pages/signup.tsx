import { Suspense, lazy } from 'react'

export default function SignupPage(pageProps: any) {
  const SignupPageProd = lazy(() => import('@sone-dao/tone-react-page-signup'))

  return (
    <Suspense fallback={<></>}>
      <SignupPageProd {...pageProps} />
    </Suspense>
  )
}
