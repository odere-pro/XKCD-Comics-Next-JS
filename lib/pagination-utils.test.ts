import { getPaginationItems, ELIPSIS_LIMIT, DELTA, ELIPSIS } from '@/lib/pagination-utils'
import { describe, expect, test } from 'vitest'

describe('@/lib/pagiantion-utils', () => {
    describe('getPaginationItems', () => {
        test(`Expect to return array without elipsis if total pages below ${ELIPSIS_LIMIT + 1}`, () => {
            Array.from({ length: ELIPSIS_LIMIT }, (_, i) => i + 1).forEach((_, totalPages) => {
                expect(getPaginationItems({ currentPage: 1, totalPages })).toEqual(
                    Array.from({ length: totalPages }, (_, i) => i + 1),
                )
            })
        })

        test(`Expect to return array with elipsis to the right if total pages more than ${ELIPSIS_LIMIT + 1}, and current page is below ${DELTA}`, () => {
            let expectedResult = []
            expectedResult = [1, 2, ELIPSIS, 10]
            expect(getPaginationItems({ currentPage: 1, totalPages: 10 })).toEqual(expectedResult)
            expectedResult = [1, 2, 3, ELIPSIS, 10]
            expect(getPaginationItems({ currentPage: 2, totalPages: 10 })).toEqual(expectedResult)
            expectedResult = [1, 2, 3, 4, ELIPSIS, 10]
            expect(getPaginationItems({ currentPage: 3, totalPages: 10 })).toEqual(expectedResult)
        })

        test(`Expect to return array with elipsis to the left if total pages more than ${ELIPSIS_LIMIT + 1}, and current page less then total pages in ${DELTA}`, () => {
            let expectedResult = []
            expectedResult = [1, ELIPSIS, 7, 8, 9, 10]
            expect(getPaginationItems({ currentPage: 8, totalPages: 10 })).toEqual(expectedResult)
            expectedResult = [1, ELIPSIS, 8, 9, 10]
            expect(getPaginationItems({ currentPage: 9, totalPages: 10 })).toEqual(expectedResult)
            expectedResult = [1, ELIPSIS, 9, 10]
            expect(getPaginationItems({ currentPage: 10, totalPages: 10 })).toEqual(expectedResult)
        })

        test(`Expect to return array with  two elipsis if total pages more than ${ELIPSIS_LIMIT + 1}, and current page is in the middle`, () => {
            let expectedResult = []
            expectedResult = [1, ELIPSIS, 3, 4, 5, ELIPSIS, 10]
            expect(getPaginationItems({ currentPage: 4, totalPages: 10 })).toEqual(expectedResult)
            expectedResult = [1, ELIPSIS, 4, 5, 6, ELIPSIS, 10]
            expect(getPaginationItems({ currentPage: 5, totalPages: 10 })).toEqual(expectedResult)
            expectedResult = [1, ELIPSIS, 5, 6, 7, ELIPSIS, 10]
            expect(getPaginationItems({ currentPage: 6, totalPages: 10 })).toEqual(expectedResult)
            expectedResult = [1, ELIPSIS, 6, 7, 8, ELIPSIS, 10]
            expect(getPaginationItems({ currentPage: 7, totalPages: 10 })).toEqual(expectedResult)
        })
    })
})
