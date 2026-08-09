import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'gimme-coffee-cart'

export function CartProvider({ children }) {
  // check if there are any items in localStorage, if not, return an empty array.
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })

  // stores items in localStorage so they kept after a refresh.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  // adds an item to the cart
  function addItem(product) {
    setItems((current) => {
      const inCart = current.find((item) => item.id === product.id)
      // if the item is already in the cart, increase the quantity.
      if (inCart) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      // if the item is not in the cart, add it to the cart.
      const { id, name, price, photo } = product
      return [...current, { id, name, price, photo, quantity: 1 }]
    })
  }


  function changeQuantity(id, amount) {
    setItems((current) =>
      current
        // increase the quantity of the item.
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + amount } : item))
        // if the quantity is less than 0, remove the item from the cart.
        .filter((item) => item.quantity > 0),
    )
  }

  // removes an item from the cart.
  function removeItem(id) {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  // clears the cart.
  function clearCart() {
    setItems([])
  }

  // calculates the total price and count of items
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, changeQuantity, removeItem, clearCart, total, count }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
