import { Client, Databases, Account, Storage, Avatars } from 'appwrite'

export const appwriteConfig = {
  endpoint: import.meta.env.VITE_APPWRITE_API_ENDPOINT,
  project: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  database: import.meta.env.VITE_APPWRITE_DB_ID,
  storage: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  userCollection: import.meta.env.VITE_APPWRITE_USERS_COLLECTION,
  postCollection: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION
}

const client = new Client()

client.setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.project)

export const account = new Account(client)
export const database = new Databases(client)
export const storage = new Storage(client)
export const avatar = new Avatars(client)
