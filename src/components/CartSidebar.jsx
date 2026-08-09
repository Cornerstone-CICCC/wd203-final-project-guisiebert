import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/adaptProducts'

export default function CartSidebar({ open, onClose }) {
  const { items, total, removeItem } = useCart()

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/70 lg:hidden" onClick={onClose} />}

      <aside
        className={`fixed top-0 right-0 z-40 flex h-screen w-80 flex-col border-l border-neutral-800 bg-neutral-950 transition-transform lg:translate-x-0 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-5">
          <h2 className="section-title">Your cart</h2>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-100 lg:hidden">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 && <p className="text-sm text-neutral-500">Nothing here yet.</p>}

          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 border-b border-neutral-900 py-3">
              <img
                src={item.photo}
                alt={item.name}
                className="h-12 w-12 object-cover grayscale transition hover:grayscale-0"
              />
              <div className="flex-1">
                <p className="text-sm">{item.name}</p>
                <p className="text-xs text-neutral-500">
                  {item.quantity} × {formatPrice(item.price)}
                </p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-neutral-600 hover:text-amber-400"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="border-t border-neutral-800 px-6 py-5">
          <div className="mb-4 flex justify-between text-sm">
            <span className="text-neutral-500">Total</span>
            <span className="text-amber-400">{formatPrice(total)}</span>
          </div>
          <Link to="/cart" onClick={onClose} className="btn-outline w-full">
            Go to cart
          </Link>
        </div>
      </aside>
    </>
  )
}
