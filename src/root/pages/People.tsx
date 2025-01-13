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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useSearchUsers } from '@/hooks/useSearchUsers'
import { UserList } from '@/components/shared/UserList'

const searchSchema = z.object({
  user: z.string().max(200)
})

const People = () => {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: { user: '' }
  })

  const deboucedUser = useDebounce(form.getValues().user, 500)

  const { data, isPending, hasNextPage, fetchNextPage } =
    useSearchUsers(deboucedUser)

  const users = data?.pages?.flatMap(page => page.documents)

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
            name='user'
            render={({ field }) => (
              <FormItem className='w-full flex flex-row items-center gap-4'>
                <FormLabel>Search</FormLabel>
                <FormControl>
                  <Input placeholder='John doe' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {form.getValues().user && <h1>Results of {form.getValues().user}</h1>}
      {!form.getValues().user && <h1>Popular</h1>}
      {isPending ? <p>Loading...</p> : <UserList users={users} />}
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

export default People
