import { ExploreList } from '@/components/shared/ExploreList'
import ShinyText from '@/components/shared/ShinyText'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'
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

  const deboucedContent = useDebounce(form.getValues().content, 500)

  const { data, isPending, hasNextPage, fetchNextPage } =
    useSearchPosts(deboucedContent)

  const posts = data?.pages?.flatMap(page => page.documents)

  const onSubmit = (data: z.infer<typeof searchSchema>) => {
    console.log(data)
  }

  return (
    <section className='w-full flex flex-col items-center p-4 gap-4'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full md:w-2/4 gap-4 flex flex-col'
        >
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem className='space-y-0 w-full flex justify-between items-center gap-1 px-3 bg-[#333334] rounded-full'>
                {/* <FormLabel>Search</FormLabel> */}
                <FormLabel>
                  <img
                    src='assets/icons/search.svg'
                    alt='search icon'
                    className='w-6 h-6 hover:cursor-pointer'
                  />
                </FormLabel>

                <FormControl>
                  <Input
                    className='border-none bg-transparent focus-visible:ring-0'
                    placeholder='Search'
                    {...field}
                  />
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
      {!form.getValues().content && (
        <h1 className='text-4xl font-semibold flex flex-1 w-full mb-4 justify-center'>
          Popular
        </h1>
      )}
      {isPending ? <p>Loading...</p> : <ExploreList posts={posts} />}
      {hasNextPage && (
        <button
          className='text-gray-900 border border-gray-300 focus:outline-none hover:bg-gray-700 focus:ring-4 focus:ring-gray-700 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
          onClick={() => fetchNextPage()}
        >
          <ShinyText speed={3} text='Load more' />
        </button>
      )}
    </section>
  )
}

export default Explore
