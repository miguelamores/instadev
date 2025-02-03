import '@testing-library/jest-dom/vitest'
import { screen, render } from '@testing-library/react'
import { it, describe, expect } from 'vitest'

import { ExploreList } from './ExploreList'

const fakePostList = [
  {
    // content: 'Level up your skills',
    // tags: ['programming', 'web', 'javascript'],
    // $id: '66e9a2c6002157b5f44d',
    // $collectionId: '66e22516002ff99d7742',
    // $createdAt: '2024-09-17T15:39:50.918+00:00',
    // $databaseId: '66e2229e003345afds',
    // $updatedAt: '2024-09-17T15:39:50.918+00:00',
    // $permissions: ['a', 'b'],
    // creator: { email: 'miguel@gmail.com' },

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
