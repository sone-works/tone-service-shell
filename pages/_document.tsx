import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function CustomDocument() {
  return (
    <Html className="w-full h-full">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://use.typekit.net/dve7mwf.css" />
        <Script
          src="https://kit.fontawesome.com/db877d7948.js"
          crossOrigin="anonymous"
          async
          strategy="beforeInteractive"
        />
      </Head>
      <body className="flex flex-col bg-global text-global scrollbar-none w-full h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
