import { Posts } from '@/types'
import React, { createContext, useContext } from 'react'

type PostsContextProviderType = {
  children: React.ReactNode
  client: PostContextType
}

type PostContextType = () => Promise<Posts>

const PostsContext = createContext<PostContextType | null>(null)

export function PostsContextProvider({
  children,
  client
}: PostsContextProviderType) {
  return (
    <PostsContext.Provider value={client}>{children}</PostsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePostsContext = () => {
  const context = useContext(PostsContext)

  if (!context) {
    throw new Error(
      'usePostsContext must be used within an PostsContextProvider'
    )
  }

  return context
}
