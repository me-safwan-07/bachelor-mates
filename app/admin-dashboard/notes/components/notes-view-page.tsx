import NotesForm from "./notes-form";

type TNotesViewPageProps = {
    notesId: string;
    uploaderId: string;
}
export default async function NotesViewPage({
    notesId,
    uploaderId
}: TNotesViewPageProps
) {
    let notes = null;
    let pageTitle = 'Create New Notes';

    if (notesId !== 'new') {
        // Fetch notes data from the server using notesId
        // const notes = await getNotesById(notesId);
        // pageTitle = `Edit Notes: ${notes.title}`;
    }

    return <NotesForm pageTitle={pageTitle} uploaderId={uploaderId}/>;
}