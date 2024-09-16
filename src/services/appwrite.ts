import { ID, Query } from 'appwrite'
import { account, appwriteConfig, avatar, database } from '@/lib/appwrite'
import { INewUser } from '@/types'

export const createAccount = async (user: INewUser) => {
  try {
    const accountCreated = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    )

    if (!accountCreated) throw Error

    const avatarUrl = avatar.getInitials(user.name) // TODO: verify if it's the correct method

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
    // await account.deleteSessions()
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    )
    if (!account) throw Error

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
