import ReactPaginate from "react-paginate"

import { IoChevronForwardOutline } from "react-icons/io5"
import { IoChevronBackOutline } from "react-icons/io5"
import { useEffect, useState } from "react"

interface PaginationType {
  totalItemsInAllPages: number
  itemsPerPage: number
  selectPage: (page: number) => void
  isSearch?: boolean
  currentPageNumber: number
  onSearch?: () => void
  hasApi: boolean
  setCurrentPageOffset?: (page: number) => void
}

function PaginationSearchResult({
  totalItemsInAllPages,
  itemsPerPage,
  selectPage,
  isSearch,
  currentPageNumber,
  onSearch,
  hasApi,
  setCurrentPageOffset,
}: PaginationType) {
  const pageCount = Math.ceil(totalItemsInAllPages / itemsPerPage)

  const [currentPage, setCurrentPage] = useState(currentPageNumber - 1)

  useEffect(() => {
    if (isSearch === true && onSearch) {
      setCurrentPage(0)
      onSearch()
    }
  }, [isSearch, onSearch])

  const handlePageClick = (event: { selected: number }) => {
    if (hasApi) {
      setCurrentPage(event.selected)
      selectPage(event.selected + 1)
    }
    if (!hasApi && setCurrentPageOffset) {
      const newOffset = (event.selected * itemsPerPage) % totalItemsInAllPages
      console.log("handlePageClick", newOffset, event.selected, totalItemsInAllPages)
      selectPage(newOffset)
      setCurrentPageOffset(event.selected + 1)
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    setCurrentPage(currentPageNumber - 1)
  }, [currentPageNumber])

  return (
    <div>
      <ReactPaginate
        previousLabel={
          <div className="flex items-center justify-center px-4 py-[0.625rem] hover:bg-slate-100 focus:bg-slate-100">
            <IoChevronBackOutline className="mr-[0.625rem] text-black" />
            <span className="text-sm text-black">Previous</span>
          </div>
        }
        forcePage={currentPage}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        breakLabel="..."
        pageCount={pageCount}
        nextLabel={
          <div className="flex items-center justify-center px-4 py-[0.625rem] hover:bg-slate-100 focus:bg-slate-100">
            <span className="mr-[0.625rem] text-sm text-black">Next</span>
            <IoChevronForwardOutline className="text-black" />
          </div>
        }
        renderOnZeroPageCount={null}
        breakClassName="flex w-7 block decoration-0 h-[2.5rem] w-[2.5rem] mr-1 list-none items-center text-black justify-center rounded-md bg-white text-sm hover:bg-slate-100"
        pageLinkClassName="flex w-7 block decoration-0 h-[2.5rem] w-[2.5rem] mr-1 list-none items-center text-black justify-center rounded-md bg-white text-sm hover:bg-slate-100"
        containerClassName="items-center flex justify-center mb-3"
        activeLinkClassName="border-2 border-slate-200 decoration-0 list-none"
      />
    </div>
  )
}

export default PaginationSearchResult
