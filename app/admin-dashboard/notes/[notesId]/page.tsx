import FormCardSkeleton from "@/components/form-card-skeleton";
import PageContainer from "@/components/layout/page-container";
import { Suspense } from "react";
import NotesViewPage from "../components/notes-view-page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getUser } from "@/lib/user/service";

export const metadata = {
    title: 'Admmin-dashboard: Notes View'
};

type PageProps = { params: Promise<{ notesId: string }> };

export default async function Page(props: PageProps) {
    const params = await props.params;

    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
        throw new Error("User id not found");
    }

    const user = await getUser(session?.user.id);
    if (!user) {
        throw new Error("user not found")
    }
    return (
        <PageContainer scrollable>
            <div className="flex-1 space-y-4">
                <Suspense fallback={<FormCardSkeleton />}>
                    <NotesViewPage notesId={params.notesId} uploaderId={user?.id} />
                </Suspense>
            </div>
        </PageContainer>
    )
}