import { renderHook, waitFor } from '@testing-library/react'
import { assert, describe, expect, it, vi } from 'vitest'
import { useGetCurrentUser } from './useGetCurrentUser'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getCurrentUser } from '@/services/appwrite'
import { IUser } from '@/types'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  })

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

const mockedUser: IUser = {
  name: 'peter',
  username: 'petertroll',
  accountId: '66e471d70028e2ac3b6e',
  email: 'peter@gmail.com',
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
  $databaseId: '66e2229e00371c1d18d1',
  $collectionId: '66e223af00196917c4fd'
}

vi.mock('@/services/appwrite', () => ({
  getCurrentUser: vi.fn()
}))

describe('useGetCurrentUser', () => {
  it('should return user data when request is successful', async () => {
    vi.mocked(getCurrentUser).mockResolvedValue(mockedUser)
    const { result } = renderHook(() => useGetCurrentUser(), {
      wrapper: createWrapper()
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    assert.isNotNull(result.current.data)
    assert.deepEqual(result.current.data, mockedUser)
  })
})
