import { Models } from 'appwrite'

export type INavLink = {
  imgURL: string
  route: string
  label: string
}

export type IUpdateUser = {
  userId: string
  name: string
  bio: string
  imageId: string
  imageUrl: URL | string
  file: File[]
}

export type INewPost = {
  userId: string
  content: string
  file: File[]
  location?: string
  tags?: string
}

export type IUpdatePost = {
  postId: string
  content: string
  imageId: string
  imageUrl: URL
  file: File[]
  location?: string
  tags?: string
}

export interface IUser extends Models.Document {
  id: string
  name: string
  username: string
  email: string
  imageUrl: string
  imageId: null
  bio: string | null
  accountId: string
}

export type INewUser = {
  name: string
  email: string
  username: string
  password: string
}

export type ISessionStoreType = {
  user: IUser | null
  isLoading: boolean
  isAuthenticated: boolean
  setUser: (user: IUser) => void
  setIsLoading: (isLoading: boolean) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
  checkAuthUser: () => Promise<boolean>
}

export interface Posts {
  documents: Post[]
  total: number
}

export interface Post extends Models.Document {
  content: string
  tags: string[]
  $id: string
  imageUrl: string
  imageId: string
  location: string
  creator: IUser & Models.Document
}

export interface IPaginatedPosts {
  documents: Post[]
  total: number
}

export interface IPaginatedUsers {
  documents: IUser[]
  total: number
}
