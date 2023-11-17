'use client'

import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
// see zod.dev for info, it allows you to more easily create schemas or the fields in your form
import { zodResolver } from '@hookform/resolvers/zod'
import { z }  from "zod" // for validation
import { Input } from '../ui/input'
import { usePathname, useRouter } from 'next/navigation'

// import { updateUser } from '@/lib/actions/user.actions'
import { CommentValidation } from '@/lib/validations/thread'
import Image from 'next/image'
import { addCommentToThread } from '@/lib/actions/thread.actions'
// import { createThread } from '@/lib/actions/thread.actions'

interface Props {
    threadId: string
    currentUserImg: string
    currentUserId: string
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
    const router = useRouter()
    const pathname = usePathname()
  
    const form = useForm({
      resolver: zodResolver(CommentValidation),
      defaultValues: {
          thread: '',
      }
    })
                                  // Type
    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
      await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname)
    
      form.reset()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className='flex items-center w-full gap-3'>
                            <FormLabel>
                                <Image src={currentUserImg} alt='Profile image' width={48} height={48} className='rounded-full object-cover'/>                  
                            </FormLabel>
                            <FormControl className='border-none bg-transparent'>
                                <Input
                                    type='text'
                                    placeholder='Comment...'
                                    className='no-focus text-light-1 outline-none'
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />          {/*calls onSubmit function*/}
                <Button type='submit' className='comment-form_btn'>
                    Reply
                </Button>
            </form>
        </Form>
    )
}

export default Comment; 