'use client'

import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
// see zod.dev for info, it allows you to more easily create schemas or the fields in your form
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"
import { Textarea } from '../ui/textarea'
import { start } from 'repl'
import { usePathname, useRouter } from 'next/navigation'

// import { updateUser } from '@/lib/actions/user.actions'
import { ThreadValidation } from '@/lib/validations/thread'
import { createThread } from '@/lib/actions/thread.actions'
import Thread from '@/lib/models/thread.model'

interface Props {
    user: {
        id: string
        objectId: string
        username: string
        name: string
        bio: string
        image: string
    }
    btnTitle: string
}

function PostThread({ userId }: { userId: string }) {
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
        thread: '',
        accountId: userId,
    }
  })
                                // Type
  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    await createThread({ 
        text: values.thread,
        author: userId,
        communityId: null,
        path: pathname
    })

    router.push('/')
  }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 flex flex-col justify-start gap-10">
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className='flex flex-col w-full gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Content                  
                            </FormLabel>
                            <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                                <Textarea
                                    rows={15}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />          {/*calls onSubmit function*/}
                <Button type='submit' className='bg-primary-500'>
                    Post Thread
                </Button>
            </form>
        </Form>
    )
}

export default PostThread