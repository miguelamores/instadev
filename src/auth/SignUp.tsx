import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useToast } from '@/hooks/use-toast'
import useAuth from '@/hooks/useAuth'
import { getErrorMessage } from '@/utils'
import useSession from '@/hooks/useSession'

const formSchema = z.object({
  name: z.string().min(2).max(30),
  username: z.string().min(2).max(20),
  email: z.string().email(),
  password: z.string().min(8)
})

const SignUp = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', username: '', email: '', password: '' }
  })
  const { toast } = useToast()
  const navigate = useNavigate()

  const { accountCreation, accountSignIn } = useAuth()
  const { checkAuthUser } = useSession()

  const onSubmit = async (user: z.infer<typeof formSchema>) => {
    try {
      const newUser = await accountCreation.mutateAsync(user)

      if (!newUser) toast({ title: 'Error creating account. Please try again' })

      const session = await accountSignIn.mutateAsync({
        email: user.email,
        password: user.password
      })

      if (!session) toast({ title: 'Sign in failed. Please try again' })

      const isLoguedIn = await checkAuthUser()

      if (isLoguedIn) {
        form.reset()
        navigate('/')
      }
    } catch (error) {
      console.error(error)
      toast({ title: getErrorMessage(error) })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full md:w-1/4 gap-4 flex flex-col'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='John Doe' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='johndoe' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='jdoe@gmail.com' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='*********' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          disabled={accountCreation.isPending || accountSignIn.isPending}
        >
          Submit
        </Button>
      </form>
      <p className='mt-4'>
        Do you already have an account?{' '}
        <Link to='/sign-in'>
          {' '}
          <strong>Log in</strong>
        </Link>
      </p>
    </Form>
  )
}

export default SignUp
