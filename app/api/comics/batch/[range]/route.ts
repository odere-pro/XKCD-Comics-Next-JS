import { NextResponse } from 'next/server'
import { fetchComicsByIds } from '@/lib/api'
import { getBatchIds } from '@/lib/utils'

type Params = {
    range: string
}

// Expect to get 1-12, 13-24, ..., etc
const parseRage = (range: string): [number, number] | undefined => {
    const [startStr, endStr] = range.split('-')

    if (!startStr || !endStr) {
        return
    }

    try {
        const start = parseInt(startStr, 10)
        const end = parseInt(endStr, 10)
        return [start, end]
    } catch (error) {
        console.error('Invalid range param, example: 1-12, 13-24')
    }
}

export async function GET(_request: Request, context: { params: Params }) {
    const { range } = context.params
    const result = parseRage(range)

    if (!result) {
        return NextResponse.json(
            { data: 'Invalid range param, example: 1-12, 13-24' },
            { status: 500 },
        )
    }

    const [start, end] = result
    const ids = getBatchIds(start, end)

    const data = await fetchComicsByIds(ids)

    if (!data?.length) {
        return NextResponse.json({ data: 'Not found comics' }, { status: 404 })
    }

    return NextResponse.json({ data }, { status: 200 })
}
