import { describe, expect, it } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './Home'
import { render, screen } from '@testing-library/react'
import { PostsContextProvider } from '@/context/PostsContext'

const queryClient = new QueryClient()

describe('Home page', () => {
  it('should render recent posts', async () => {
    const getRecentPostsFake = () =>
      Promise.resolve({
        documents: [
          {
            content: 'Level up your skills',
            tags: ['programming', 'web', 'javascript'],
            $id: '66e9a2c6002157b5f44d',
            $collectionId: '66e22516002ff99d7742',
            $createdAt: '2024-09-17T15:39:50.918+00:00',
            $databaseId: '66e2229e003345afds',
            $updatedAt: '2024-09-17T15:39:50.918+00:00',
            $permissions: ['a', 'b']
          }
        ],
        total: 1
      })

    render(
      <QueryClientProvider client={queryClient}>
        <PostsContextProvider client={getRecentPostsFake}>
          <Home />
        </PostsContextProvider>
      </QueryClientProvider>
    )

    const content = await screen.findByText('Level up your skills')
    expect(content).toBeDefined()
  })
})
