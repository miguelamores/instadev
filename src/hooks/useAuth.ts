import { createAccount, signInAccount } from '@/services/appwrite'
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

  return {
    accountCreation,
    accountSignIn
  }
}

export default useAuth
