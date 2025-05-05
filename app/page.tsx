import Comics from '@/components/Comics'
import { ArrowLongUpIcon, ArrowLongDownIcon } from '@heroicons/react/20/solid'
import { fetchComicsByIds, getLastComicsID } from '@/lib/api'
import { getBatchIds } from '@/lib/utils'
import { notFound } from 'next/navigation'

const ONE_BATCH = 12

interface HomeProps {
    params: {}
    searchParams: { start: string; end: string; batch: string }
}

const parseSearchParams = async (
    searchParams: HomeProps['searchParams'],
    lastID = 1,
): Promise<{
    batch: number
    end: number
    start: number
}> => {
    let batch = ONE_BATCH
    let batchParam = (await searchParams).batch

    if (batchParam) {
        try {
            batch = parseInt(batchParam, 10)
        } catch (error) {
            console.warn('Failed to parse "batch" searchParams')
        }
    }

    batch = batch > ONE_BATCH ? ONE_BATCH : batch

    let end = lastID
    let endParam = (await searchParams).end

    if (endParam) {
        try {
            end = parseInt(endParam, 10)
        } catch (error) {
            console.warn('Failed to parse "batch" searchParams')
        }
    }

    end = end - ONE_BATCH <= 0 ? ONE_BATCH : end

    let start
    let startParam = (await searchParams).start
    start = end - batch + 1

    if (startParam) {
        try {
            start = parseInt(startParam, 10)
        } catch (error) {
            console.warn('Failed to parse "batch" searchParams')
        }
    }

    // Make sure that window is no more than a batch
    if (start + batch < end) {
        end = start + batch
    }

    return {
        batch,
        end,
        start,
    }
}
// Going with a sliding window size of no more than 24 images to tackle performance and international traffic issues
export default async function Home(props: HomeProps) {
    const { searchParams } = props
    const lastID = await getLastComicsID()
    const { start, end, batch } = await parseSearchParams(searchParams, lastID)
    const nextStart = start - batch
    const nextEnd = end - batch
    const prevStart = start + batch
    const prevEnd = end + batch

    const ids = getBatchIds(start, end)
    let data = await fetchComicsByIds(ids)

    if (!data) {
        notFound()
    }

    data = data.reverse()

    return (
        <>
            {/* Goto page with prev batch of comics */}
            {prevStart < lastID && (
                <a className="mt-8 inline-flex" href={`/?start=${prevStart}&end=${prevEnd}`}>
                    <ArrowLongUpIcon className="h-5 w-5 text-gray-400 md:mr-3" aria-hidden="true" />
                    <span>Show previous</span>
                </a>
            )}

            <ul
                role="list"
                className="image-grid mt-8 grid w-full grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2 lg:grid-cols-3"
            >
                {data.map((file, idx) => (
                    <li key={idx}>
                        <Comics {...file} alt={file.alt} withImageLink />
                    </li>
                ))}
            </ul>
            {/* Goto page with next batch of comics */}
            {nextEnd > 1 && (
                <a
                    className="mt-8 inline-flex"
                    href={`/?start=${nextStart}&end=${nextEnd}&batch=${batch}`}
                >
                    <ArrowLongDownIcon
                        className="h-5 w-5 text-gray-400 md:mr-3"
                        aria-hidden="true"
                    />
                    <span>Show more</span>
                </a>
            )}
        </>
    )
}
