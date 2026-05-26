'use client'

import { useRouter, usePathname } from 'next/navigation'

export default function PaginationControls({ currentPage, totalPages }) {
  const router = useRouter()
  const pathname = usePathname()

  const handlePageChange = (page) => {
    router.push(`${pathname}?page=${page}`)
  }

  return (
    <div className="flex items-center justify-center gap-4 pt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`
        px-4 py-2 rounded-xl border text-sm font-semibold transition-all duration-200
        ${currentPage <= 1
            ? "bg-muted text-muted-foreground border-border cursor-not-allowed opacity-50"
            : "bg-card text-foreground border-border hover:bg-primary hover:text-white hover:border-primary shadow-sm"
          }
      `}
      >
        Previous
      </button>

      <div className="px-5 py-2 rounded-xl bg-card border border-border shadow-sm">
        <span className="text-sm font-medium text-muted-foreground">
          Page{" "}
          <span className="text-primary font-bold">
            {currentPage}
          </span>{" "}
          of{" "}
          <span className="text-foreground font-semibold">
            {totalPages}
          </span>
        </span>
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`
        px-4 py-2 rounded-xl border text-sm font-semibold transition-all duration-200
        ${currentPage >= totalPages
            ? "bg-muted text-muted-foreground border-border cursor-not-allowed opacity-50"
            : "bg-card text-foreground border-border hover:bg-primary hover:text-white hover:border-primary shadow-sm"
          }
      `}
      >
        Next
      </button>
    </div>
  )
}