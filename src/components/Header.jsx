import { Link, NavLink } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

function linkClass({ isActive }) {
  return isActive ? 'text-amber-400' : 'text-neutral-400 hover:text-neutral-100'
}

// On small screens the cart button replaces this link.
function cartLinkClass(props) {
  return `hidden sm:block ${linkClass(props)}`
}

export default function Header({ onOpenCart }) {
  const { count } = useCart()

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" className=" whitespace-nowrap lowercase sm:text-lg">
          gimme<span className="font-extrabold">coffee</span>
        </Link>

        <nav className="flex items-center gap-5 text-sm sm:gap-8">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/items" className={linkClass}>
            Menu
          </NavLink>
          <NavLink to="/cart" className={cartLinkClass}>
            Cart
          </NavLink>
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 text-neutral-400 hover:text-amber-400 lg:hidden"
          >
            <ShoppingBag size={18} />
            {count > 0 && <span>{count}</span>}
          </button>
        </nav>
      </div>
    </header>
  )
}
