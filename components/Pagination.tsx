import clsx from 'clsx'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import { getLastComicsID } from '@/lib/api'
import { getPaginationItems } from '@/lib/pagination-utils'

export interface PaginationProps {
    currentPage?: number
}

const Pagination = async ({ currentPage = 1 }: PaginationProps) => {
    const totalPages = await getLastComicsID()
    const pages = getPaginationItems({ currentPage, totalPages })
    const defaultPageLinkCN = 'border-transparent text-gray-500 hover:text-gray-700 '
    const highlightedPageLinkCN = 'border-indigo-500 text-indigo-600'

    const prevIdx = currentPage - 1 < 1 ? 1 : currentPage - 1
    const nextIdx = currentPage + 1 > totalPages ? totalPages : currentPage + 1

    return (
        <nav className="flex w-full flex-row items-center justify-between gap-0 md:gap-2 lg:flex-row">
            <div className="flex h-8 flex-1 md:h-10">
                <a
                    href={`/comics/${prevIdx}`}
                    className={clsx(
                        'inline-flex items-center border-t-2 border-transparent pl-1 pt-2 text-xs font-medium text-gray-500 hover:text-gray-700 md:pt-4 md:text-sm',
                        currentPage === 1 && 'hidden',
                    )}
                >
                    <ArrowLongLeftIcon
                        className="h-5 w-5 text-gray-400 md:mr-3"
                        aria-hidden="true"
                    />
                    <span className="hidden md:inline">Previous</span>
                </a>
            </div>

            <div className="flex h-8 md:h-10">
                {pages.map((pageIdx, idx) => (
                    <a
                        key={idx}
                        href={`/comics/${pageIdx}`}
                        className={clsx(
                            'inline-flex items-center border-t-2 px-2 pt-2 text-xs font-medium md:px-4 md:pt-4 md:text-sm',
                            pageIdx === currentPage ? highlightedPageLinkCN : defaultPageLinkCN,
                        )}
                    >
                        {pageIdx || '...'}
                    </a>
                ))}
            </div>

            <div className="flex h-8 flex-1 justify-end md:h-10">
                <a
                    href={`/comics/${nextIdx}`}
                    className={clsx(
                        'inline-flex items-center border-t-2 border-transparent pl-1 pt-2 text-xs font-medium text-gray-500 hover:text-gray-700 md:pt-4 md:text-sm',
                        currentPage === totalPages && 'hidden',
                    )}
                >
                    <span className="hidden md:inline">Next</span>
                    <ArrowLongRightIcon
                        className="h-5 w-5 text-gray-400 md:ml-3"
                        aria-hidden="true"
                    />
                </a>
            </div>
        </nav>
    )
}

export default Pagination
