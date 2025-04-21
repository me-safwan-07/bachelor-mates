import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import ProductViewPage from '../components/product-view-page';

export const metadata = {
  title: 'Dashboard : Product View'
};

type PageProps = { params: Promise<{ notesId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <ProductViewPage notesId={params.notesId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
