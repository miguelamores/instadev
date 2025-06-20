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
import { useCreatePost, useUpdatePost } from '@/hooks/usePosts'
import { Models } from 'appwrite'

const formSchema = z.object({
  content: z.string().min(2).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(200),
  tags: z.string().min(2).max(200)
})

type PostFormProps = {
  post?: Models.Document
  action: 'create' | 'update'
}

const PostForm = ({ post, action }: PostFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: post?.content ?? '',
      location: post?.location ?? '',
      tags: post?.tags.join(',') ?? '',
      file: []
    }
  })
  const { user } = useSession()
  const { postCreation } = useCreatePost()
  const { mutateAsync: updatePost, isPending: isLoadingUpdatePost } =
    useUpdatePost()
  const navigate = useNavigate()

  const onSubmit = async (postForm: z.infer<typeof formSchema>) => {
    try {
      if (!user.id) {
        throw Error('User id must not be null')
      }

      if (action === 'update' && post) {
        const updatedPost = await updatePost({
          ...postForm,
          postId: post.$id,
          imageId: post.imageId,
          imageUrl: post.imageUrl
        })

        if (!updatedPost) {
          toast({ title: 'Update post failed. Try again later' })
        }

        return navigate('/')
      }

      const newPost = await postCreation.mutateAsync({
        ...postForm,
        userId: user.id
      })

      if (!newPost) {
        toast({ title: 'Error creating post, Please try again' })
        return
      }
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
                <ImageDrop
                  imageChange={field.onChange}
                  imageUrl={post?.imageUrl}
                />
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
        <Button
          type='submit'
          disabled={postCreation.isPending || isLoadingUpdatePost}
        >
          {`${action === 'create' ? 'Create Post' : 'Update Post'}`}
        </Button>
      </form>
    </Form>
  )
}

export default PostForm
