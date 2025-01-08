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
  const [posts, setPosts] = useState([])

  const onSubmit = (data: any) => {
    console.log(data)
    setPosts([{ id: 1, content: 'working on TDD...' }])
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
      {posts.length > 0 && (
        <>
          <h1>Results of {form.getValues().content}</h1>
          <ul>
            {posts.map(post => (
              <li key={post.id}>{post.content}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}

export default Explore
