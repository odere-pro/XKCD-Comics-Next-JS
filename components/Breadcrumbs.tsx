'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import type { ComicResponseData } from '@/types'
import { debounce } from 'lodash'

// TODO: make breadcrumbs more reusable
const Breadcrumbs = () => {
    const [data, setData] = useState<ComicResponseData | undefined>()
    const loaded = useRef(false)
    const { id } = useParams<{ id: string }>()

    const fetchComicsById = debounce(async (id: string): Promise<void> => {
        const url = `/api/comics/${id}`

        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
                next: { revalidate: false },
            })

            const json = await response.json()
            loaded.current = true
            setData(json.data)
        } catch (error: any) {
            console.error(`Fail to fetch last comics: ${url}`, error)
            loaded.current = true
        }
    }, 500)

    useEffect(() => {
        if (id && !loaded.current) {
            fetchComicsById(id)
        }
    }, [fetchComicsById, id])

    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-4">
                <li>
                    <div>
                        <a href="/" className="text-gray-400 hover:text-gray-500">
                            <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                            <span className="sr-only">Home</span>
                        </a>
                    </div>
                </li>

                {data?.title && (
                    <li>
                        <div className="flex items-center">
                            <ChevronRightIcon
                                className="h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                            />
                            <a
                                href={`/comics/${data?.num}`}
                                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                aria-current={'page'}
                            >
                                {data.title}
                            </a>
                        </div>
                    </li>
                )}
            </ol>
        </nav>
    )
}

export default Breadcrumbs
