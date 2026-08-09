import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ page, totalPages, onChange }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className="flex items-center justify-center gap-2 pt-12">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="p-2 text-neutral-400 hover:text-amber-400 disabled:opacity-30 disabled:hover:text-neutral-400"
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((number) => (
        <button
          key={number}
          onClick={() => onChange(number)}
          className={`h-9 w-9 text-sm transition ${
            number === page
              ? 'bg-amber-400 text-neutral-950'
              : 'text-neutral-400 hover:text-amber-400'
          }`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="p-2 text-neutral-400 hover:text-amber-400 disabled:opacity-30 disabled:hover:text-neutral-400"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}
