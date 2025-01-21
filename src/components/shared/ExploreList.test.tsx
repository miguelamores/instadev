import '@testing-library/jest-dom/vitest'
import { screen, render } from '@testing-library/react'
import { it, describe, expect, afterEach } from 'vitest'

import { ExploreList } from './ExploreList'

const fakePostList = [
  {
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
]

describe('Explore list', () => {
  it.skip('should render a list of posts', async () => {
    render(<ExploreList posts={fakePostList} />)
    expect(screen.getByRole('list')).toHaveLength(1) // .toBeDefined()
  })

  it('should show empty list message', async () => {
    render(<ExploreList posts={[]} />)
    expect(screen.getByText('No posts found')).toBeDefined()
  })
})
