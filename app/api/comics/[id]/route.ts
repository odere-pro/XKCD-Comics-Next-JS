import { NextResponse } from 'next/server'
import { fetchComicsById } from '@/lib/api'

type Params = {
    id: string
}

export async function GET(_request: Request, context: { params: Params }) {
    const { id } = context.params

    const data = await fetchComicsById(id)

    if (!data) {
        return NextResponse.json({ data: 'Not found comics' }, { status: 404 })
    }

    return NextResponse.json({ data }, { status: 200 })
}
