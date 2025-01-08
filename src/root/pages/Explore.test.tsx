import '@testing-library/jest-dom/vitest'
import { it, describe, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Explore from './Explore'

describe('Explore search input', () => {
  afterEach(cleanup)

  it('should allow type a search input', async () => {
    // setup userEvent
    const user = userEvent.setup()
    render(<Explore />)

    const input = await screen.getByRole('textbox', { name: /content/i })
    // type the input
    await user.type(input, 'TDD posts')
    expect(input).toHaveValue('TDD posts')
  })

  it('should show results on submit form', async () => {
    const user = userEvent.setup()
    render(<Explore />)
    const input = await screen.getByRole('textbox', { name: /content/i })
    await user.type(input, 'TDD posts')
    // user press enter
    await user.keyboard('{enter}')
    // check if the results are displayed
    expect(screen.getByText('Results of TDD posts')).toBeDefined()
  })

  it('should show a list of posts', async () => {
    const user = userEvent.setup()
    render(<Explore />)
    const input = await screen.getByRole('textbox', { name: /content/i })
    await user.type(input, 'TDD posts')
    // user press enter
    await user.keyboard('{enter}')
    expect(screen.getByRole('list')).toBeDefined()
  })
})
