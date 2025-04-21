import { notFound } from 'next/navigation';
import ProductForm from './product-form';
import { TNotes } from '@/types/notes';

type TNotesViewPageProps = {
  notesId: string;
};

export default async function NotesViewPage({
  notesId
}: TNotesViewPageProps) {
  let notes = null;
  let pageTitle = 'Add New Notes';

  if (notesId !== 'new') {
    // const data = await fetch(`/api/notes/`,)
    // notes = (await data.json()) as TNotes;
    // if (!notes) {
    //   notFound();
    // }
    pageTitle = `Edit Notes`;
  }

  return <ProductForm initialData={notes} pageTitle={pageTitle} />;
}
