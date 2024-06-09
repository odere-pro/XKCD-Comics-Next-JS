import Comics from '@/components/Comics'
import Loading from '@/components/Loading'
import Pagination from '@/components/Pagination'
import { fetchComicsById } from '@/lib/api'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
export interface ComicsPageProps {
    params: { id: string }
}

export default async function ComicsPage(props: ComicsPageProps) {
    const { id } = props.params
    const data = await fetchComicsById(id)

    if (!data) {
        notFound()
    }

    return (
        <div className="flex w-full flex-col items-center gap-y-4 font-mono text-sm">
            <Suspense fallback={<Loading />}>
                <Pagination currentPage={parseInt(id, 10)} />
                <Comics {...data} alt={data.alt} withDetails />
            </Suspense>
        </div>
    )
}
