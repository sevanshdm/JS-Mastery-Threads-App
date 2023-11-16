import * as z from 'zod'

export const UserValidation = z.object({
    profile_photo: z.string().url().nonempty(), // ensures that profile photo is a string of type url and can't be empty.
    name: z.string().min(3, {message: 'Minimum 3 characters'}).max(30),
    username: z.string().min(3).max(30),
    bio: z.string().min(3, {message: 'Minimum 3 characters'}).max(1000),
})