import { cleanup, render, screen } from '@testing-library/react'
import { describe, expect, it, afterEach } from 'vitest'
import PostDetailCard from '@/components/shared/PostDetailCard'

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

  it('should show delete icon', () => {
    render(<PostDetailCard post={fakePost} />)
    const remove = screen.getByAltText('remove icon')
    expect(remove).toBeDefined()
  })
})
