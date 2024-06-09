import { createLink } from '@/lib/xkcd-utils'
import { describe, expect, test } from 'vitest'

describe('@/utils/xkcd-utils', () => {
    describe('createLink', () => {
        let link = 'http://dot.com'
        const num = 1

        test('Expect to return the link if the link is provided', () => {
            const result = createLink({ num, link })
            expect(result).toBe(link)
        })

        test('Expect to return empty string id NEXT_PUBLIC_API_URL not set and no link provided', () => {
            const result = createLink({ num, link: undefined })
            expect(result).toBe('')
        })

        test('Expect to generate a link', () => {
            process.env.NEXT_PUBLIC_API_URL = 'https://xkcd.com/'

            const result = createLink({ num, link: undefined })
            expect(result).toBe('https://xkcd.com/1')
        })
    })
})
