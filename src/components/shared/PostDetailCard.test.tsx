import { cleanup, render, screen } from '@testing-library/react'
import { describe, expect, it, afterEach, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import PostDetailCard from '@/components/shared/PostDetailCard'
import * as postHooks from '@/hooks/usePosts'

const fakePost = {
  content: 'Level up your skills',
  tags: ['programming', 'web', 'javascript'],
  imageUrl:
    'https://cloud.appwrite.io/v1/storage/buckets/66e2393d003a90d0cb5d/files/677ffcc200265a0506a8/preview?project=66e1d8fd00258214b24b',
  imageId: '677ffcc200265a0506a8',
  location: 'any heart',
  $id: '66e9a2c6002157b5f44d',
  id: '66e9a2c6002157b5f44d',
  $createdAt: '2025-01-09T16:43:48.293+00:00',
  $updatedAt: '2025-01-09T16:43:48.293+00:00',
  $permissions: [
    'read("user:66e471d70028e2ac3b6e")',
    'update("user:66e471d70028e2ac3b6e")',
    'delete("user:66e471d70028e2ac3b6e")'
  ],
  creator: {
    name: 'peter',
    username: 'petertroll',
    accountId: '66e471d70028e2ac3b6e',
    email: 'miguel@gmail.com',
    bio: null,
    imageId: null,
    imageUrl:
      'https://cloud.appwrite.io/v1/avatars/initials?name=peter&project=66e1d8fd00258214b24b',
    $id: '66e471d900052f82eb43',
    id: '66e471d900052f82eb43',
    $createdAt: '2024-09-13T17:09:45.465+00:00',
    $updatedAt: '2024-09-13T17:09:45.465+00:00',
    $permissions: [
      'read("user:66e4700b003d98328a9f")',
      'update("user:66e4700b003d98328a9f")',
      'delete("user:66e4700b003d98328a9f")'
    ],
    save: [
      {
        $id: '678542d900292929907f',
        $createdAt: '2025-01-13T16:44:10.169+00:00',
        $updatedAt: '2025-01-13T16:44:10.169+00:00',
        $permissions: [
          'read("user:66e471d70028e2ac3b6e")',
          'update("user:66e471d70028e2ac3b6e")',
          'delete("user:66e471d70028e2ac3b6e")'
        ],
        $databaseId: '66e2229e00371c1d18d1',
        $collectionId: '66e22532003d422e98fa'
      },
      {
        $id: '678542df000015bcff53',
        $createdAt: '2025-01-13T16:44:15.436+00:00',
        $updatedAt: '2025-01-13T16:44:15.436+00:00',
        $permissions: [
          'read("user:66e471d70028e2ac3b6e")',
          'update("user:66e471d70028e2ac3b6e")',
          'delete("user:66e471d70028e2ac3b6e")'
        ],
        $databaseId: '66e2229e00371c1d18d1',
        $collectionId: '66e22532003d422e98fa'
      },
      {
        $id: '679cf6ef003c42d6ac75',
        $createdAt: '2025-01-31T16:14:40.316+00:00',
        $updatedAt: '2025-01-31T16:14:40.316+00:00',
        $permissions: [
          'read("user:66e471d70028e2ac3b6e")',
          'update("user:66e471d70028e2ac3b6e")',
          'delete("user:66e471d70028e2ac3b6e")'
        ],
        $databaseId: '66e2229e00371c1d18d1',
        $collectionId: '66e22532003d422e98fa'
      }
    ],
    like: [
      {
        $id: '678a672f00345d6c989c',
        $createdAt: '2025-01-17T14:20:32.227+00:00',
        $updatedAt: '2025-01-17T14:20:32.227+00:00',
        $permissions: [
          'read("user:66e471d70028e2ac3b6e")',
          'update("user:66e471d70028e2ac3b6e")',
          'delete("user:66e471d70028e2ac3b6e")'
        ],
        $databaseId: '66e2229e00371c1d18d1',
        $collectionId: '66e23824000f9e5584df'
      },
      {
        $id: '679cf6e900241e753142',
        $createdAt: '2025-01-31T16:14:33.941+00:00',
        $updatedAt: '2025-01-31T16:14:33.941+00:00',
        $permissions: [
          'read("user:66e471d70028e2ac3b6e")',
          'update("user:66e471d70028e2ac3b6e")',
          'delete("user:66e471d70028e2ac3b6e")'
        ],
        $databaseId: '66e2229e00371c1d18d1',
        $collectionId: '66e23824000f9e5584df'
      }
    ],
    $databaseId: '66e2229e00371c1d18d1',
    $collectionId: '66e223af00196917c4fd'
  },
  save: [
    {
      $id: '679cf6ef003c42d6ac75',
      $createdAt: '2025-01-31T16:14:40.316+00:00',
      $updatedAt: '2025-01-31T16:14:40.316+00:00',
      $permissions: [
        'read("user:66e471d70028e2ac3b6e")',
        'update("user:66e471d70028e2ac3b6e")',
        'delete("user:66e471d70028e2ac3b6e")'
      ],
      user: {
        name: 'peter',
        username: 'petertroll',
        accountId: '66e471d70028e2ac3b6e',
        email: 'peter@gmail.com',
        bio: null,
        imageId: null,
        imageUrl:
          'https://cloud.appwrite.io/v1/avatars/initials?name=peter&project=66e1d8fd00258214b24b',
        $id: '66e471d900052f82eb43',
        $createdAt: '2024-09-13T17:09:45.465+00:00',
        $updatedAt: '2024-09-13T17:09:45.465+00:00',
        $permissions: [
          'read("user:66e4700b003d98328a9f")',
          'update("user:66e4700b003d98328a9f")',
          'delete("user:66e4700b003d98328a9f")'
        ],
        $databaseId: '66e2229e00371c1d18d1',
        $collectionId: '66e223af00196917c4fd'
      },
      $databaseId: '66e2229e00371c1d18d1',
      $collectionId: '66e22532003d422e98fa'
    }
  ],
  like: [
    {
      $id: '679cf6e900241e753142',
      $createdAt: '2025-01-31T16:14:33.941+00:00',
      $updatedAt: '2025-01-31T16:14:33.941+00:00',
      $permissions: [
        'read("user:66e471d70028e2ac3b6e")',
        'update("user:66e471d70028e2ac3b6e")',
        'delete("user:66e471d70028e2ac3b6e")'
      ],
      user: {
        name: 'peter',
        username: 'petertroll',
        accountId: '66e471d70028e2ac3b6e',
        email: 'peter@gmail.com',
        bio: null,
        imageId: null,
        imageUrl:
          'https://cloud.appwrite.io/v1/avatars/initials?name=peter&project=66e1d8fd00258214b24b',
        $id: '66e471d900052f82eb43',
        $createdAt: '2024-09-13T17:09:45.465+00:00',
        $updatedAt: '2024-09-13T17:09:45.465+00:00',
        $permissions: [
          'read("user:66e4700b003d98328a9f")',
          'update("user:66e4700b003d98328a9f")',
          'delete("user:66e4700b003d98328a9f")'
        ],
        $databaseId: '66e2229e00371c1d18d1',
        $collectionId: '66e223af00196917c4fd'
      },
      $databaseId: '66e2229e00371c1d18d1',
      $collectionId: '66e23824000f9e5584df'
    }
  ],
  $databaseId: '66e2229e00371c1d18d1',
  $collectionId: '66e22516002ff99d7742'
}

vi.mock('@tanstack/react-query')
// vi.mock('react-router-dom')

// vi.mock('react-router-dom', () => {
//   return {
//     ...vi.importActual('react-router-dom'),
//     useNavigate: () => vi.fn(),
//     Link: vi.fn()
//   }
// })

vi.mock('react-router-dom', () => {
  return {
    useNavigate: vi.fn(() => ({ navigate: vi.fn() })),
    Link: vi.fn()
  }
})

vi.mock('@/hooks/usePosts', () => {
  return {
    useDeletePost: vi.fn(() => ({ mutateAsync: vi.fn() }))
  }
})

describe('Post Detail page', () => {
  afterEach(cleanup)

  it('should render component', () => {
    render(<PostDetailCard post={fakePost} />)
  })

  it('should have an image', () => {
    render(<PostDetailCard post={fakePost} />)
    const img = screen.getByAltText(/post image of/)
    expect(img).toBeDefined()
  })

  it('should show a post title', () => {
    render(<PostDetailCard post={fakePost} />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeDefined()
  })

  it('should show creator avatar', () => {
    render(<PostDetailCard post={fakePost} />)
    const avatar = screen.getByRole('avatar')
    expect(avatar).toBeDefined()
  })

  it('should show creator name', () => {
    render(<PostDetailCard post={fakePost} />)
    const user = screen.getByRole('paragraph')
    expect(user).toBeDefined()
  })

  it('should show created date', () => {
    render(<PostDetailCard post={fakePost} />)
    const date = screen.getByText(/ago/)
    expect(date).toBeDefined()
  })

  it('should show delete icon if post owns authenticated user', () => {
    render(<PostDetailCard post={fakePost} isUserOwner={true} />)
    const remove = screen.getByAltText('remove icon')
    expect(remove).toBeDefined()
  })

  it('should show popup confirmation when delete icon is clicked', async () => {
    const user = userEvent.setup()
    // render component
    render(<PostDetailCard post={fakePost} isUserOwner={true} />)

    // click on delete icon
    const remove = screen.getByRole('button', { name: 'remove icon' })
    await user.click(remove)

    // check if popup is displayed
    const popup = screen.getByRole('alertdialog')
    expect(popup).toBeDefined()
  })

  it('should successfully delete post when confirmation is accepted', async () => {
    const user = userEvent.setup()
    const mutateFn = vi.fn()

    // useNavigate().mockReturnValue(() => ({ navigate: vi.fn() }))

    // spyOn the custom hook and mock what we need
    const spy = vi.spyOn(postHooks, 'useDeletePost').mockReturnValue({
      isPending: false,
      mutateAsync: mutateFn
    })

    render(<PostDetailCard post={fakePost} isUserOwner={true} />)

    // simulate user click
    const remove = screen.getByRole('button', { name: 'remove icon' })
    await user.click(remove)
    const confirm = screen.getByRole('button', { name: 'Continue' })
    await user.click(confirm)

    // Ensure mutate was called with the correct arguments
    expect(mutateFn).toHaveBeenCalledWith({ postId: fakePost.$id })
    // Restore the original implementation
    spy.mockRestore()
  })
})
