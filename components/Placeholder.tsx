import { CSSProperties } from 'react'

type PlaceholderProps = {
  children?: string
  style?: CSSProperties
}

export default function Placeholder({ children, style }: PlaceholderProps) {
  return (
    <div
      className="border-3 border-dashed p-6 flex items-center justify-center"
      style={style}
    >
      {children}
    </div>
  )
}
