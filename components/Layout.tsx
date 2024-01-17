import NavMenu from '@sone-dao/tone-react-nav-menu'

type LayoutProps = {
  children: any
  user: any
}

export default function Layout({ children, user }: LayoutProps) {
  return (
    <div className="h-full">
      <NavMenu user={user} />
      <main className="bg-global h-full">{children}</main>
    </div>
  )
}
