import { authOptions } from "@/lib/authOptions"
import { getUser } from "@/lib/user/service"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function NoteLayout({
  params,
  children,
}: {
  params: { notesId: string } & any // Type assertion
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return redirect(`/auth/login?callbackUrl=/notes/${params.notesId}`)
  }

  const user = await getUser(session?.user.id as string)
  if (!user) {
    return redirect(`/auth/login?callbackUrl=/notes/${params.notesId}`)
  }

  return <>{children}</>
}