import { ID, Query } from 'appwrite'
import {
  account,
  appwriteConfig,
  avatar,
  database,
  storage
} from '@/lib/appwrite'
import { INewPost, INewUser, Post, Posts } from '@/types'

export const createAccount = async (user: INewUser) => {
  try {
    const accountCreated = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    )

    if (!accountCreated) throw Error

    const avatarUrl = avatar.getInitials(user.name)

    const newUser = await saveUserToDB({
      accountId: accountCreated.$id,
      name: accountCreated.name,
      email: accountCreated.email,
      username: user.username,
      imageUrl: avatarUrl
    })

    if (!newUser) throw Error

    return newUser
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const saveUserToDB = async (user: {
  accountId: string
  email: string
  name: string
  imageUrl: URL
  username?: string
}) => {
  try {
    const newUser = await database.createDocument(
      appwriteConfig.database,
      appwriteConfig.userCollection,
      ID.unique(),
      user
    )

    if (!newUser) throw Error

    return newUser
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const signInAccount = async (user: {
  email: string
  password: string
}) => {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    )
    if (!session) throw Error

    return session
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getAccount = async () => {
  try {
    const currentAccount = await account.get()
    if (!currentAccount) throw Error
    return currentAccount
  } catch (error) {
    console.error(error)
  }
}

export const getCurrentUser = async () => {
  try {
    // await account.deleteSessions()
    const currentAccount = await getAccount()
    if (!currentAccount) throw Error

    const accountSeesion = await database.listDocuments(
      appwriteConfig.database,
      appwriteConfig.userCollection,
      [Query.equal('accountId', currentAccount.$id)]
    )
    console.log({ accountSeesion })
    return accountSeesion.documents[0]
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const signOutAccount = async () => {
  try {
    const session = await account.deleteSession('current')
    return session
  } catch (error) {
    console.error(error)
  }
}

export const createPost = async (post: INewPost) => {
  try {
    const file = await uploadFile(post.file[0])

    if (!file) throw Error

    const fileUrl = getFilePreview(file.$id)

    if (!fileUrl) {
      await deleteFile(file.$id)
      throw Error
    }

    const tags = post.tags?.replace(/ /g, '').split(',') || []
    const newPost = {
      creator: post.userId,
      content: post.content,
      tags,
      location: post.location,
      imageUrl: fileUrl,
      imageId: file.$id
    }

    const createdPost = await database.createDocument(
      appwriteConfig.database,
      appwriteConfig.postCollection,
      ID.unique(),
      newPost
    )

    if (!createdPost) {
      await deleteFile(file.$id)
      throw Error
    }

    return createPost
  } catch (error) {
    console.error(error)
  }
}

const uploadFile = async (file: File) => {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storage,
      ID.unique(),
      file
    )

    return uploadedFile
  } catch (error) {
    console.error(error)
  }
}

const getFilePreview = (fileId: string) => {
  try {
    const fileUrl = storage.getFilePreview(appwriteConfig.storage, fileId)

    return fileUrl
  } catch (error) {
    console.error(error)
  }
}

const deleteFile = async (fileId: string) => {
  try {
    await storage.deleteFile(appwriteConfig.storage, fileId)

    return { status: 'ok' }
  } catch (error) {
    console.error(error)
  }
}

export const getRecentPosts = async () => {
  try {
    const posts = await database.listDocuments(
      appwriteConfig.database,
      appwriteConfig.postCollection,
      [Query.orderDesc('$createdAt'), Query.limit(20)]
    )

    console.log(posts)

    return posts
  } catch (error) {
    console.error(error)
    return { documents: [], total: 0 }
  }
}

export const savePost = async (userId: string, postId: string) => {
  try {
    const savedPost = await database.createDocument(
      appwriteConfig.database,
      appwriteConfig.savesCollection,
      ID.unique(),
      {
        user: userId,
        post: postId
      }
    )

    if (!savePost) throw Error

    return savedPost
  } catch (error) {
    console.error(error)
  }
}

export const deleteSavedPost = async (documentId: string) => {
  try {
    const deletedSave = await database.deleteDocument(
      appwriteConfig.database,
      appwriteConfig.savesCollection,
      documentId
    )

    if (!deletedSave) throw Error

    return true
  } catch (error) {
    console.error(error)
  }
}
