import PostThread from "@/components/forms/PostThread"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from 'next/navigation'

async function Page() {
    const user = await currentUser()

    if(!user) return null

    const userInfo = await fetchUser(user.id)

    if(!userInfo?.onboarded) redirect('/onboarding') //this moves users who switched their URL bar manually to onboarding if they haven't done so yet.

    return (
        <>
            <h1 className="head-text">Create Thread</h1>

            <PostThread userId={userInfo._id}/>
        </>
    )
}

export default Page