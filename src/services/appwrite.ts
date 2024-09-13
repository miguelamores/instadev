import { ID } from 'appwrite'
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

    const newUser = await database.createDocument(
      appwriteConfig.database,
      appwriteConfig.userCollection,
      ID.unique(),
      {
        name: accountCreated.name,
        username: user.username,
        accountId: accountCreated.$id,
        email: accountCreated.email,
        imageUrl: avatarUrl
      }
    )

    if (!newUser) throw Error

    return newUser
  } catch (error) {
    console.error(error)
    throw error
  }
}
