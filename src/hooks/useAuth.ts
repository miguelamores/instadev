import {
  createAccount,
  signInAccount,
  signOutAccount
} from '@/services/appwrite'
import { INewUser } from '@/types'
import { useMutation } from '@tanstack/react-query'

const useAuth = () => {
  const accountCreation = useMutation({
    mutationFn: (user: INewUser) => createAccount(user)
  })

  const accountSignIn = useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user)
  })

  const accountSignOut = useMutation({
    mutationFn: () => signOutAccount()
  })

  return {
    accountCreation,
    accountSignIn,
    accountSignOut
  }
}

export default useAuth
