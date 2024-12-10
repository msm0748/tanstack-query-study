'use client';

import { getUsers } from '@/client/getUsers';
import { createUser } from '@/server/users';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface User {
  id: number;
  name: string;
}

export default function Home() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['users'], // 이 쿼리에 대한 고유 키
    queryFn: () => getUsers(),
    select: (users) =>
      users.filter((user: User) => user.name === 'Leanne Graham'), // 데이터 변환
  });

  // 다른 users 관련 쿼리들
  // const testQuery = useQuery({ queryKey: ['users', 'test'], ... });
  // const fastQuery = useQuery({ queryKey: ['users', 'fast'], ... });

  // 이렇게 하면 모든 users 관련 쿼리 무효화
  // queryClient.invalidateQueries({ queryKey: ['users'] });
  // queryClient.invalidateQueries({ queryKey: ['test'] }); // 이건 안 됨

  // 더 구체적으로 무효화하고 싶다면 원래 쿼리 키를 그대로 사용
  // queryClient.invalidateQueries({ queryKey: ['users', 'test'] });

  // React Query의 쿼리 키 무효화는 기본적으로:
  // 1. 전체 키 일치
  // 2. 시작 부분 일치

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // 사용자 생성 성공 시 사용자 목록 쿼리 무효화 및 다시 가져오기
      // 새 사용자 추가 후 즉시 사용자 목록 업데이트 보장
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  // 즉시 다시 가져오기
  queryClient.refetchQueries({ queryKey: ['users'] });

  return (
    <div>
      {/* 사용자 생성 뮤테이션을 트리거하는 버튼 */}
      {/* { id: 1, name: 'John Doe' } 매개변수는 createUser함수에서 전달받는 인자 */}
      <button onClick={() => mutation.mutate({ id: 1, name: 'John Doe' })}>
        Create User
      </button>
      <div>
        {query.data?.map((user: User) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
    </div>
  );
}
