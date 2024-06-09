export const createLink = (props: { num: number; link?: string }): string => {
    const { num, link } = props
    if (link) {
        return link
    }

    const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

    if (!NEXT_PUBLIC_API_URL) {
        return ''
    }

    return `${process.env.NEXT_PUBLIC_API_URL}${num}`
}
