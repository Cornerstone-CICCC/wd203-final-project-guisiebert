import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
import { useProducts } from '../context/ProductsContext'

const PER_PAGE = 12

export default function Items() {
  const { products, loading } = useProducts()
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(products.length / PER_PAGE)
  const start = (page - 1) * PER_PAGE
  const visibleProducts = products.slice(start, start + PER_PAGE)

  function goToPage(number) {
    setPage(number)
    window.scrollTo(0, 0)
  }

  return (
    <div className="page">
      <div className="flex items-baseline justify-between border-b border-neutral-800 pb-4">
        <h1 className="text-3xl">Menu</h1>
        <span className="section-title">{products.length} items</span>
      </div>

      {loading ? (
        <p className="pt-8 text-neutral-500">Loading the menu…</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-6 pt-8 md:grid-cols-3 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
        </>
      )}
    </div>
  )
}
