"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "../lib/utils/cn"



export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showFirstLast?: boolean
  siblingCount?: number
  className?: string
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ currentPage, totalPages, onPageChange, showFirstLast = true, siblingCount = 1, className }, ref) => {
    const generatePageNumbers = () => {
      const pages: (number | string)[] = []

      // Always show first page
      if (showFirstLast) {
        pages.push(1)
      }

      // Calculate range around current page
      const startPage = Math.max(showFirstLast ? 2 : 1, currentPage - siblingCount)
      const endPage = Math.min(showFirstLast ? totalPages - 1 : totalPages, currentPage + siblingCount)

      // Add ellipsis after first page if needed
      if (showFirstLast && startPage > 2) {
        pages.push("...")
      }

      // Add pages around current page
      for (let i = startPage; i <= endPage; i++) {
        if (showFirstLast && i === 1) continue // Skip if already added
        if (showFirstLast && i === totalPages) continue // Skip if will be added later
        pages.push(i)
      }

      // Add ellipsis before last page if needed
      if (showFirstLast && endPage < totalPages - 1) {
        pages.push("...")
      }

      // Always show last page
      if (showFirstLast && totalPages > 1) {
        pages.push(totalPages)
      }

      return pages
    }

    const pages = generatePageNumbers()

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Pagination Navigation"
        className={cn("flex items-center justify-center w-full lg:w-1/3", className)}
      >
        <div className="flex items-center gap-1 justify-between w-full">

          {/* Previous Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            aria-label="Go to previous page"
            className="w-9 h-9 lg:h-11 lg:w-11 p-0 hover:bg-[#e41b23] text-white group flex justify-center items-center cursor-pointer duration-700"
          >

               <ChevronLeft className="h-4 w-4 group-hover:text-white text-black" />
           
          </button>

          {/* Page Numbers */}

          <div className="flex items-center gap-1">

            {pages.map((page, index) => {
                
              if (page === "...") {
                return (
                  <div
                    key={`ellipsis-${index}`}
                    className="flex h-9 w-9 items-center justify-center"
                    aria-hidden="true"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </div>
                )
              }

              const pageNumber = page as number
              const isActive = pageNumber === currentPage

              return (
                <button
                  key={pageNumber}
                  onClick={() => onPageChange(pageNumber)}
                  aria-label={`Go to page ${pageNumber}`}
                  aria-current={isActive ? "page" : undefined}
                  className={cn("w-9 h-9 lg:h-11 lg:w-11 p-0 hover:bg-[#e41b23] hover:text-white", isActive && "bg-[#e41b23] text-white")}
                >
                  {pageNumber.toString().padStart(2, "0")}
                </button>
              )
            })}
          </div>



          {/* Next Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            aria-label="Go to next page"
            className="w-9 h-9 lg:h-11 lg:w-11 p-0 hover:bg-[#e41b23] text-white group flex justify-center items-center cursor-pointer duration-700"
          >
            <ChevronRight className="h-4 w-4 group-hover:text-white text-black" />
          </button>
        </div>
      </nav>
    )
  },
)

Pagination.displayName = "Pagination"

export default Pagination;
