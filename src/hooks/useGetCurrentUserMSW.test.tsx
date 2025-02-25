import { renderHook, waitFor } from '@testing-library/react'
import {
  afterAll,
  afterEach,
  assert,
  beforeAll,
  describe,
  expect,
  it
} from 'vitest'
import { useGetCurrentUser } from './useGetCurrentUser'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { handlers, user as mockedUser } from '@/handlers'
import { setupServer } from 'msw/node'

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

const server = setupServer(...handlers)

describe('useGetCurrentUser', () => {
  beforeAll(() => server.listen())

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())

  it('should return user data when request is successful', async () => {
    const { result } = renderHook(() => useGetCurrentUser(), {
      wrapper: createWrapper()
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    assert.isNotNull(result.current.data)
    assert.deepEqual(result.current.data, mockedUser)
  })
})
