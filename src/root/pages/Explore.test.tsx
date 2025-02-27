import '@testing-library/jest-dom/vitest'
import { it, describe, expect, afterEach, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Explore from './Explore'
// import * as customHooks from '@/hooks/usePosts'

vi.mock('@/hooks/usePosts', () => {
  return {
    useSearchPosts: vi.fn(() => ({ data: vi.fn() }))
  }
})

describe('Explore search input', () => {
  afterEach(cleanup)

  it('should allow type a search input', async () => {
    // setup userEvent
    const user = userEvent.setup()
    render(<Explore />)

    const input = await screen.getByRole('textbox', { name: /search/i })
    // type the input
    await user.type(input, 'TDD posts')
    expect(input).toHaveValue('TDD posts')
  })

  it('should show results on submit form', async () => {
    const user = userEvent.setup()
    render(<Explore />)
    const input = await screen.getByRole('textbox', { name: /search/i })
    await user.type(input, 'TDD posts')
    // user press enter
    await user.keyboard('{enter}')
    // check if the results are displayed
    await expect(screen.getByText('Results of TDD posts')).toBeDefined()
  })

  it('should show loading on search', async () => {
    const user = userEvent.setup()
    render(<Explore />)
    // const useSearchPostsSpy = vi
    //   .spyOn(customHooks, 'useSearchPosts')
    //   .mockReturnValue({ isPending: true })

    vi.mock('@/hooks/usePosts', () => {
      return {
        useSearchPosts: vi.fn(() => ({ isPending: true }))
      }
    })

    const input = await screen.getByRole('textbox', { name: /search/i })
    await user.type(input, 'tdd')
    // user press enter
    await user.keyboard('{enter}')
    await expect(screen.getByText('Loading...')).toBeDefined()
    // useSearchPostsSpy.mockRestore()
  })
})
