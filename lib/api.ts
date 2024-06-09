'use server'

import type { ComicResponseData } from '@/types'

export async function fetchLastComics(): Promise<ComicResponseData | undefined> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/info.0.json`

    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
            next: { revalidate: 3600 * 24 },
        })

        const data = await response.json()

        return data
    } catch (error: any) {
        console.error(`Fail to fetch last comics: ${url}`, error)
        return
    }
}

export async function getLastComicsID(): Promise<number> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/info.0.json`

    try {
        const data = await fetchLastComics()

        return data?.num || 1
    } catch (error: any) {
        console.error(`Fail to fetch last comics: ${url}`, error)
        return 1
    }
}

export async function fetchComicsById(id: string): Promise<ComicResponseData | undefined> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/${id}/info.0.json`

    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
            next: { revalidate: false },
        })

        const data = await response.json()

        return data
    } catch (error: any) {
        console.error(`Fail to fetch last comics: ${url}`, error)
        return
    }
}

export async function fetchComicsByIds(ids: string[]): Promise<ComicResponseData[] | undefined> {
    if (!ids.length) {
        return
    }

    try {
        const data = (await Promise.all(ids.map(id => fetchComicsById(id)))).filter(
            Boolean,
        ) as ComicResponseData[]

        return data
    } catch (error: any) {
        console.error(`Fail to fetch comics batch: ${ids}`, error)
        return
    }
}
