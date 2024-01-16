import NavMenu from '@sone-dao/tone-react-nav-menu'

type LayoutProps = {
  children: any
  user: any
}

export default function Layout({ children, user }: LayoutProps) {
  return (
    <div className="flex flex-col h-full">
      <NavMenu user={user} />
      <main className="grow">{children}</main>
    </div>
  )
}
