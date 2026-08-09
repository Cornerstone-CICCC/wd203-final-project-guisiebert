import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CartSidebar from './CartSidebar'

export default function Layout() {
  const [cartOpen, setCartOpen] = useState(false)
  const { pathname } = useLocation()

  // Every new page starts at the top.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen lg:pr-80">
      <Header onOpenCart={() => setCartOpen(true)} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}
