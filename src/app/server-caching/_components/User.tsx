'use client';

import { getUsers } from '@/client/getUsers';
import { useQuery } from '@tanstack/react-query';

interface User {
  id: number;
  name: string;
}

export default function User() {
  // 서버에서 캐싱한 데이터를 사용
  // 서버에서 캐싱한 데이터가 없으면 queryFn 발동
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  return (
    <div>
      {data?.map((user: User) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}
