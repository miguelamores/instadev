import { ID, Query } from 'appwrite'
import {
  account,
  appwriteConfig,
  avatar,
  database,
  storage
} from '@/lib/appwrite'
import {
  INewPost,
  INewUser,
  IPaginatedPosts,
  IPaginatedUsers,
  IUpdatePost,
  IUser,
  Post
} from '@/types'

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

export const getCurrentUser = async (): Promise<IUser> => {
  try {
    // await account.deleteSessions()
    const currentAccount = await getAccount()
    if (!currentAccount) throw Error('Unauthorized')

    const accountSeesion = await database.listDocuments(
      appwriteConfig.database,
      appwriteConfig.userCollection,
      [Query.equal('accountId', currentAccount.$id)]
    )
    console.log({ accountSeesion })
    return accountSeesion.documents[0] as IUser
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

export const updatePost = async (post: IUpdatePost) => {
  const hasFileToUpdate = post.file.length > 0
  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId
    }

    if (hasFileToUpdate) {
      const file = await uploadFile(post.file[0])

      if (!file) throw Error

      const fileUrl = getFilePreview(file.$id)
      if (!fileUrl) {
        await deleteFile(file.$id)
        throw Error
      }
      image = { ...image, imageId: file.$id, imageUrl: fileUrl }
    }

    const tags = post.tags?.replace(/ /g, '').split(',') || []
    const newPost = {
      content: post.content,
      tags,
      location: post.location,
      imageUrl: image.imageUrl,
      imageId: image.imageId
    }

    const updatedPost = await database.updateDocument(
      appwriteConfig.database,
      appwriteConfig.postCollection,
      post.postId,
      {
        content: newPost.content,
        tags: newPost.tags,
        location: post.location,
        imageUrl: newPost.imageUrl,
        imageId: newPost.imageId
      }
    )

    if (!updatedPost) {
      if (hasFileToUpdate) {
        await deleteFile(image.imageId)
      }
      throw Error
    }

    if (hasFileToUpdate) {
      await deleteFile(post.imageId)
    }

    return updatedPost
  } catch (error) {
    console.error(error)
  }
}

export const deletePost = async (postId: string, imageId: string) => {
  if (!postId || !imageId) return

  try {
    const deletedPost = await database.deleteDocument(
      appwriteConfig.database,
      appwriteConfig.postCollection,
      postId
    )

    if (!deletedPost) throw Error

    await deleteFile(imageId)

    return { status: 'ok' }
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

export const getRecentPosts = async ({
  pageParam
}: {
  pageParam: string
}): Promise<IPaginatedPosts> => {
  try {
    const queries = [Query.limit(2), Query.orderDesc('$updatedAt')]
    if (pageParam !== '0') {
      queries.push(Query.cursorAfter(pageParam))
    }

    const posts = (await database.listDocuments(
      appwriteConfig.database,
      appwriteConfig.postCollection,
      queries
    )) as IPaginatedPosts

    console.log(posts)

    return posts
  } catch (error) {
    console.error(error)
    return { documents: [], total: 0 }
  }
}

export const delay = async (ms: number) =>
  await new Promise(resolve => setTimeout(resolve, ms))

export const savePost = async (userId: string, postId: string) => {
  // await delay(1000)
  // throw new Error('error save post')
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

export const likePost = async (userId: string, postId: string) => {
  try {
    const likedPost = await database.createDocument(
      appwriteConfig.database,
      appwriteConfig.likesCollection,
      ID.unique(),
      {
        user: userId,
        post: postId
      }
    )

    if (!likedPost) throw Error

    return likedPost
  } catch (error) {
    console.error(error)
  }
}

export const deleteLikedPost = async (documentId: string) => {
  try {
    const deletedLike = await database.deleteDocument(
      appwriteConfig.database,
      appwriteConfig.likesCollection,
      documentId
    )

    if (!deletedLike) throw Error

    return true
  } catch (error) {
    console.error(error)
  }
}

export const getPostById = async (id: string): Promise<Post> => {
  try {
    const post = (await database.getDocument(
      appwriteConfig.database,
      appwriteConfig.postCollection,
      id
    )) as Post

    if (!post) throw Error

    return post
  } catch (error) {
    console.error(error)
    throw Error('Post not found')
  }
}

export const searchPosts = async ({
  pageParam,
  searchTerm
}: {
  pageParam: string
  searchTerm: string
}): Promise<IPaginatedPosts> => {
  try {
    const queries = [Query.limit(1), Query.orderDesc('$updatedAt')]
    if (pageParam !== '0') {
      queries.push(Query.cursorAfter(pageParam))
    }

    if (searchTerm) {
      queries.push(Query.search('content', searchTerm))
    }

    const posts = (await database.listDocuments(
      appwriteConfig.database,
      appwriteConfig.postCollection,
      queries
    )) as IPaginatedPosts

    return posts
  } catch (error) {
    console.error(error)
    return { documents: [], total: 0 }
  }
}

export const getSavedPosts = async (userId: string | undefined) => {
  if (!userId) return null
  try {
    const savedPosts = await database.listDocuments(
      appwriteConfig.database,
      appwriteConfig.savesCollection,
      [Query.equal('user', userId), Query.orderDesc('$updatedAt')]
    )

    console.log(savedPosts)

    return savedPosts
  } catch (error) {
    console.error(error)
    return { documents: [], total: 0 }
  }
}

export const searchUsers = async ({
  pageParam,
  searchUser
}: {
  pageParam: string
  searchUser: string
}): Promise<IPaginatedUsers> => {
  try {
    const queries = [Query.limit(10), Query.orderDesc('$updatedAt')]
    if (pageParam !== '0') {
      queries.push(Query.cursorAfter(pageParam))
    }

    if (searchUser) {
      queries.push(Query.contains('email', searchUser))
    }

    const users = (await database.listDocuments(
      appwriteConfig.database,
      appwriteConfig.userCollection,
      queries
    )) as IPaginatedUsers

    return users
  } catch (error) {
    console.error(error)
    return { documents: [], total: 0 }
  }
}
