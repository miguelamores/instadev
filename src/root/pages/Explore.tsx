import { ExploreList } from '@/components/shared/ExploreList'
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
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const searchSchema = z.object({
  content: z.string().max(200)
})

const Explore = () => {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: { content: '' }
  })

  const { data, isPending, hasNextPage, fetchNextPage } = useSearchPosts(
    form.getValues().content || ''
  )

  const posts = data?.pages?.flatMap(page => page.documents)

  const onSubmit = (data: z.infer<typeof searchSchema>) => {
    console.log(data)
  }

  return (
    <section className='w-full flex flex-col items-center gap-4'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full md:w-2/4 gap-4 flex flex-col'
        >
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem className='w-full flex flex-row items-center gap-4'>
                <FormLabel>Search</FormLabel>
                <FormControl>
                  <Input placeholder='working on TDD...' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {form.getValues().content && (
        <h1>Results of {form.getValues().content}</h1>
      )}
      {!form.getValues().content && <h1>Popular</h1>}
      {isPending ? <p>Loading...</p> : <ExploreList posts={posts} />}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>Load more</button>
      )}
    </section>
  )
}

export default Explore
