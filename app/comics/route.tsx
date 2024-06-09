import { redirect } from 'next/navigation'
import { getLastComicsID } from '@/lib/api'

export async function GET() {
    const id = await getLastComicsID()

    if (id) {
        redirect(`/comics/${id}`)
    }
}
