export const ELIPSIS_LIMIT = 7
export const DELTA = 4
export const ELIPSIS = 0

export const getPaginationItems = (props: {
    currentPage: number
    totalPages: number
}): number[] => {
    const { currentPage, totalPages } = props
    let sanitisedCurrentPage = currentPage

    if (currentPage > totalPages) {
        sanitisedCurrentPage = totalPages
    }

    // arr = [1, 2, 3, 4, 5, 6]
    // arr = [1, 2, 3, 4, 5]
    // arr = [1, 2, 3, 4]
    // arr = [1, 2, 3]
    // arr = [1, 2]
    // arr = [1]
    const isBelowElipsisLimit = totalPages < ELIPSIS_LIMIT
    if (isBelowElipsisLimit) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // arr = [1, 2, 3, 4, ELIPSIS, 7]
    // arr = [1, 2, 3, ELIPSIS, 7]
    // arr = [1, 2, ELIPSIS, 7]
    const elipsisIsRight = sanitisedCurrentPage < DELTA
    if (elipsisIsRight) {
        return [
            ...Array.from({ length: sanitisedCurrentPage + 1 }, (_, i) => i + 1),
            ELIPSIS,
            totalPages,
        ]
    }

    // arr = [1, ELIPSIS, 6, 7]
    // arr = [1, ELIPSIS, 5, 6, 7]
    // arr = [1, ELIPSIS, 4, 5, 6, 7]
    const elipsisIsLeft = sanitisedCurrentPage + DELTA - 1 > totalPages
    if (elipsisIsLeft) {
        return [
            1,
            ELIPSIS,
            ...Array.from(
                { length: 2 + (totalPages - sanitisedCurrentPage) },
                (_, i) => i - 1 + sanitisedCurrentPage,
            ),
        ]
    }

    // arr = [1, ELIPSIS, 3, 4, 5, ELIPSIS, 7]
    return [
        1,
        ELIPSIS,
        sanitisedCurrentPage - 1,
        sanitisedCurrentPage,
        sanitisedCurrentPage + 1,
        ELIPSIS,
        totalPages,
    ]
}
