import { NextUIProvider } from '@nextui-org/react'
import { ReactNode } from 'react'

export default function Providers({ children }: ProvidersProps) {
  return <NextUIProvider>{children as any}</NextUIProvider>
}

type ProvidersProps = {
  children: ReactNode
}
