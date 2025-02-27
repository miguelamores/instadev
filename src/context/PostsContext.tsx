import { Models } from 'appwrite'
import React, { createContext, useContext } from 'react'

type PostsContextProviderType = {
  children: React.ReactNode
  client: PostContextType
}

type PostContextType = ({
  pageParam
}: {
  pageParam: string
}) => Promise<Models.DocumentList<Models.Document>>

const PostsContext = createContext<PostContextType | null>(null)

export function PostsContextProvider({
  children,
  client
}: PostsContextProviderType) {
  return (
    <PostsContext.Provider value={client}>{children}</PostsContext.Provider>
  )
}

export const usePostsContext = () => {
  const context = useContext(PostsContext)

  if (!context) {
    throw new Error(
      'usePostsContext must be used within an PostsContextProvider'
    )
  }

  return context
}
