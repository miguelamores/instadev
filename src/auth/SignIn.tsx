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
import useAuth from '@/hooks/useAuth'
import { toast } from '@/hooks/use-toast'
import { getErrorMessage } from '@/utils'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

const SignIn = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' }
  })

  const { accountSignIn } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (user: z.infer<typeof formSchema>) => {
    try {
      const session = await accountSignIn.mutateAsync({
        email: user.email,
        password: user.password
      })

      if (!session) {
        toast({ title: 'Sign in failed. Please try again' })
        return
      }

      form.reset()
      navigate('/')
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
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='johndoe@gmail.com' {...field} />
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
        <Button type='submit'>Sign in</Button>
      </form>
      <p className='mt-4'>
        Don't you have an account?{' '}
        <Link to='/sign-up'>
          {' '}
          <strong>Register here</strong>
        </Link>
      </p>
    </Form>
  )
}

export default SignIn
