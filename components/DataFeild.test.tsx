import DataField from '@/components/DataField'
import { describe, expect, test, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'

describe('DataField component', () => {
    afterEach(() => {
        cleanup()
    })

    test('Expect to have label', () => {
        render(<DataField label="Test Label">Test Content</DataField>)
        expect(screen.getByText('Test Label')).toBeTruthy()
    })

    test('Expect to have content', () => {
        render(<DataField label="Test Label">Test Content</DataField>)
        expect(screen.getByText('Test Content')).toBeTruthy()
    })
})
