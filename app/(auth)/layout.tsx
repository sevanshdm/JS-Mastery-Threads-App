// this file will allow you to specify different rules for the authentication routes.
// this file only applies to the routes within the (auth) subgroup

import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"

import '../globals.css'

//this is for better SEO
export const metadata = {
    title: 'Threads',
    description: 'A next.js 14 Meta Threads Application'
}

// define the font to be used
const inter = Inter({ subsets: ["latin"] })
                                                    
export default function RootLayout({ 
    children //props 
}: { children: React.ReactNode //type (because TS)
}) {
    return ( // this allows you to use all of Clerk's functionality
        <ClerkProvider>
            <html lang="en">    {/*this will apply the font across all the files*/}
                <body className={`${inter.className} bg-dark-1`}>
                    <div className="w-full flex justify-center items-center min-h-screen">
                        {children}
                    </div>
                </body>
            </html>
        </ClerkProvider>
    )
}