import Comics from '@/components/Comics'
import { afterEach, describe, expect, test } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { ComicResponseData } from '@/types'

const comicDataMock: ComicResponseData = {
    month: '6',
    num: 2942,
    link: '',
    year: '2024',
    news: '',
    safe_title: 'Fluid Speech',
    transcript: '',
    alt: 'Test alt text',
    img: 'https://imgs.xkcd.com/comics/fluid_speech.png',
    title: 'Fluid Speech',
    day: '5',
}
describe('Comics component', () => {
    afterEach(() => {
        cleanup()
    })

    test('Expect to render image', () => {
        render(<Comics {...comicDataMock} alt={comicDataMock.alt} />)
        expect(screen.getByAltText(comicDataMock.alt)).toBeTruthy()
    })

    describe('Image details', () => {
        test('Expect to hide image details by default', () => {
            render(<Comics {...comicDataMock} alt={comicDataMock.alt} />)
            expect(() => screen.getByText(comicDataMock.title)).toThrow()
        })

        test('Expect to show image details', () => {
            render(<Comics {...comicDataMock} alt={comicDataMock.alt} withDetails={true} />)
            expect(screen.getByText(comicDataMock.title)).toBeTruthy()
        })

        // TODO: add tet cases for other details
    })
})
