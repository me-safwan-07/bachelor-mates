import React from "react"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/authOptions"
import { getUser } from "@/lib/user/service"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

declare module "next-auth" {
    interface Session {
        user: {
            id?: string | null;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}


const AppLayout = async({ children }: { children: React.ReactNode }) => {
    const session = await getServerSession(authOptions)
    const user = session?.user?.id ? await getUser(session.user.id) : null;
    
    return (
        <>
            <Navbar user={user}/>
            {children}
            <Footer />
        </>
    )
}

export default AppLayout