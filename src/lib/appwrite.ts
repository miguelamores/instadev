import { Client, Databases, Account, ID } from 'appwrite'

const appwriteConfig = {
  endpoint: import.meta.env.VITE_APPWRITE_API_ENDPOINT,
  project: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  collection: import.meta.env.VITE_APPWRITE_COLLECTION
}

const client = new Client()

client.setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.project)

export const account = new Account(client)
export const database = new Databases(client)
