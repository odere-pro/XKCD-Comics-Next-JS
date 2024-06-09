// Use delay to test Suspense and loading states
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const getBatchIds = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, idx) => (idx + start).toString())
