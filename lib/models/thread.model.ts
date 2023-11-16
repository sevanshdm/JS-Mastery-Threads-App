import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }, 
    parentId: { // in case the thread is a comment
        type: String
    },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread', // A thread can have multiple threads as children.This is recursive
        }
    ]
})

                                    // create one if non-existent
const Thread = mongoose.models.Thread || mongoose.model('Thread', threadSchema)

export default Thread