import { ExploreList } from '@/components/shared/ExploreList'
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
import { useSearchPosts } from '@/hooks/usePosts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const searchSchema = z.object({
  content: z.string().min(3).max(2200)
})

const Explore = () => {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: { content: '' }
  })
  // const [posts, setPosts] = useState([])
  const { data, isPending, hasNextPage, fetchNextPage } = useSearchPosts()

  const posts = data?.pages?.flatMap(page => page.documents)

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <section>
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
                  <Input placeholder='working on TDD...' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Search</Button>
        </form>
      </Form>
      {form.getValues().content && (
        <h1>Results of {form.getValues().content}</h1>
      )}
      {isPending ? <p>Loading...</p> : <ExploreList posts={posts} />}
      <button onClick={() => fetchNextPage()}>Load more</button>
    </section>
  )
}

export default Explore
