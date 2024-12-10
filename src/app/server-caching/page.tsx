import { getUsers } from '@/client/getUsers';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import User from './_components/User';

export default async function Page() {
  // 서버에서 리액트 쿼리 캐싱하는 방법
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <User />
    </HydrationBoundary>
  );
}
