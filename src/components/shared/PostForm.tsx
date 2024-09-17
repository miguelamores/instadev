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
import useSession from '@/hooks/useSession'
import { getErrorMessage } from '@/utils'
import ImageDrop from './ImageDrop'

const formSchema = z.object({
  content: z.string().min(2).max(2200),
  image: z.custom(),
  location: z.string().min(2).max(200),
  tags: z.string().min(2).max(200)
})

const PostForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { content: '', location: '', tags: '', image: null }
  })

  const navigate = useNavigate()

  const onSubmit = async (user: z.infer<typeof formSchema>) => {
    try {
    } catch (error) {
      console.error(error)
      toast({ title: getErrorMessage(error) })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full md:w-2/4 gap-4 flex flex-col'
      >
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='What are you thinking?...' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <ImageDrop />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='River of...' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (Separated by comma)</FormLabel>
              <FormControl>
                <Input placeholder='Nature, livestyle, relax' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Create Post</Button>
      </form>
    </Form>
  )
}

export default PostForm
