import { describe, expect, it } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './Home'
import { render, screen } from '@testing-library/react'
import { PostsContextProvider } from '@/context/PostsContext'

const queryClient = new QueryClient()
const fake = {
  getRecentPosts: () =>
    Promise.resolve({
      documents: [
        {
          content: 'Getting prepared for miduconf',
          tags: ['programming', 'web', 'javascript'],
          $id: '66e9a2c6002157b5f44d'
        }
      ],
      total: 1
    })
}

describe('Home page', () => {
  it('should render recent posts', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <PostsContextProvider client={fake}>
          <Home />
        </PostsContextProvider>
      </QueryClientProvider>
    )

    const content = await screen.findByText('Getting prepared for miduconf')
    expect(content).toBeDefined()
  })
})
