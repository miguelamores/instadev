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
import { useNavigate } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from '@/hooks/use-toast'
import useSession from '@/hooks/useSession'
import { getErrorMessage } from '@/utils'
import ImageDrop from './ImageDrop'
import { useCreatePost } from '@/hooks/usePosts'

const formSchema = z.object({
  content: z.string().min(2).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(200),
  tags: z.string().min(2).max(200)
})

const PostForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { content: '', location: '', tags: '', file: [] }
  })
  const { user } = useSession()
  const { postCreation } = useCreatePost()
  const navigate = useNavigate()

  const onSubmit = async (post: z.infer<typeof formSchema>) => {
    try {
      const newPost = await postCreation.mutateAsync({
        ...post,
        userId: user.id
      })

      if (!newPost) toast({ title: 'Error creating post, Please try again' })

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
        className='w-full md:w-2/4 gap-4 flex flex-col'
      >
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input placeholder='What are you thinking?...' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='file'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <ImageDrop imageChange={field.onChange} />
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
              <FormLabel>Location</FormLabel>
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
        <Button type='submit' disabled={postCreation.isPending}>
          Create Post
        </Button>
      </form>
    </Form>
  )
}

export default PostForm
