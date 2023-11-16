'use server' // not having use server here will throw an error you can't directly create db action browser-side.

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}

export async function createThread({text, author, communityId, path}: Params) {
    try {
        connectToDB()

        const createdThread = await Thread.create({
            text,
            author,
            community: null,
        })
    
        // Update user model
        await User.findByIdAndUpdate(author, {
            $push: { threads: createdThread._id }
        })
    
        revalidatePath(path)   
    } catch (error: any) {
        throw new Error(`Error creating thread: ${error.message}`)
    }
}
                                        // default
export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectToDB()

    // Calculate the number of posts to skip 
    const skipAmount = (pageNumber - 1) * pageSize

    // Fetch the posts that have no parents (top-level threads...)
    const postsQuery = Thread.find({ parentId: { $in: [null, undefined]}})
    .sort({ createdAt: 'desc' })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: 'author', model: User })
    .populate({ 
        path: 'children',
        populate: {
            path: 'author',
            model: User,
            select: "_id name parentId image"
        }
    })

    const totalPostsCount = await Thread.countDocuments({ parentId: { $in: [null, undefined]} })

    const posts = await postsQuery.exec()

    const isNext = totalPostsCount > skipAmount + posts.length

    return { posts, isNext }
}

export async function fetchThreadById(id: string) {
    connectToDB()

    try {

         // Populate Community
        const thread = await Thread.findById(id)
            .populate({
                path: 'author',
                model: User,
                select: "_id id name image" // select which fields you need from the author.
            })
            .populate({
                path: 'children',
                populate: [ // each child thread gets populated with the author of specific comment
                    {
                        path: 'author',
                        model: User,
                        select: '_id id name parentId image'
                    },
                    { //populate the thread comment itself
                        path: 'children',
                        model: Thread,
                        populate: {
                            path: 'author',
                            model: User,
                            select: "_id id name parentId image"
                        }
                    }
                ]
            }).exec() //executes the query
            
            return thread
    } catch (error: any) {
        throw new Error(`Error fetching thread ${error.message}`)
    }
}