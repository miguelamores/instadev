import { cleanup, render, screen } from '@testing-library/react'
import { describe, expect, it, afterEach, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import PostDetailCard from '@/components/shared/PostDetailCard'
import { useDeletePost } from '@/hooks/usePosts'
import { useNavigate } from 'react-router-dom'

const fakePost = {
  content: 'Level up your skills',
  tags: ['programming', 'web', 'javascript'],
  $id: '66e9a2c6002157b5f44d',
  $collectionId: '66e22516002ff99d7742',
  $createdAt: '2024-09-17T15:39:50.918+00:00',
  $databaseId: '66e2229e003345afds',
  $updatedAt: '2024-09-17T15:39:50.918+00:00',
  $permissions: ['a', 'b'],
  creator: { email: 'miguel@gmail.com' }
}

vi.mock('react-router-dom', () => {
  return {
    useNavigate: vi.fn(() => ({ navigate: vi.fn() }))
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
    render(<PostDetailCard post={fakePost} isUserOwner={true} />)
    const remove = screen.getByRole('button', { name: 'remove icon' })
    await user.click(remove)
    const popup = screen.getByRole('alertdialog')
    expect(popup).toBeDefined()
  })

  it('should successfully delete post when confirmation is accepted', async () => {
    const user = userEvent.setup()
    useDeletePost.mockImplementation(() => ({
      mutateAsync: async () => ({ status: 'ok' })
    }))
    useNavigate.mockReturnValue(() => ({ navigate: vi.fn() }))
    render(<PostDetailCard post={fakePost} isUserOwner={true} />)
    const remove = screen.getByRole('button', { name: 'remove icon' })
    await user.click(remove)
    const confirm = screen.getByRole('button', { name: 'Continue' })
    await user.click(confirm)
    expect(useDeletePost).toHaveBeenCalled()
  })
})
