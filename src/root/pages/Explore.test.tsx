import '@testing-library/jest-dom/vitest'
import { it, describe, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Explore from './Explore'

describe('Explore search input', () => {
  it('should allow type a search input', async () => {
    // setup userEvent
    const user = userEvent.setup()
    render(<Explore />)

    const input = await screen.getByRole('textbox', { name: /content/i })
    // type the input
    await user.type(input, 'TDD posts')
    expect(input).toHaveValue('TDD posts')
  })
})
