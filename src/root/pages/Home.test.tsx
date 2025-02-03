import { afterEach, describe, expect, it, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './Home'
import { cleanup, render, screen } from '@testing-library/react'
import { PostsContextProvider } from '@/context/PostsContext'
// import * as PostsHook from '@/hooks/usePosts'

const queryClient = new QueryClient()

// vi.mock('@/hooks/useIsInView', () => ({
//   useIsInView: () => ({ isInView: false })
// }))

// vi.mock('@/hooks/useIsInView', () => ({
//   useIsInView: vi.fn().mockReturnValue({ isInView: false })
// }))

// vi.mock('@/hooks/useIsInView')

vi.mock('react-router-dom', () => {
  return {
    useNavigate: vi.fn(() => ({ navigate: vi.fn() })),
    Link: vi.fn(),
    useViewTransitionState: vi.fn()
  }
})

describe('Home page', () => {
  afterEach(cleanup)

  it.skip('should render recent posts', async () => {
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
            $permissions: ['a', 'b'],
            creator: {
              id: 'w234asdas'
            }
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

  it.skip('should load more results on scroll', async () => {
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
            $permissions: ['a', 'b'],
            creator: {
              id: 'w234asdas'
            }
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

    // viewHook.useIsInView.mockReturnValueOnce({
    //   isInView: true
    // })

    const fetchNextPage = vi.fn()

    // vi.mock('@/hooks/useIsInView', () => ({
    //   useIsInView: () => ({ isInView: false })
    // }))

    // const spyView = vi.spyOn(viewHook, 'useIsInView').mockReturnValue({
    //   isInView: false
    // })

    // spyOn the custom hook and mock what we need
    // const spy = vi.spyOn(PostsHook, 'useGetRecentPosts').mockReturnValue({
    //   recentPosts: {
    //     isPending: false,
    //     fetchNextPage
    //   }
    // })

    vi.mock('@/hooks/usePosts', () => ({
      useGetRecentPosts: () => ({ isPending: false, fetchNextPage })
    }))

    // const scrollEl = await screen.getByTestId('home-container')
    // scrollEl.scrollTop = 1000
    // fireEvent.scroll(window, { target: { scrollY: 600 } })

    // spyView.mockReturnValue({
    //   isInView: true
    // })

    expect(fetchNextPage).toHaveBeenCalled()
    // spy.mockRestore()
  })
})
