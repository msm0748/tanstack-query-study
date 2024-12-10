'use client';

import { getUsers } from '@/client/getUsers';
import { createUser } from '@/server/users';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface User {
  id: number;
  name: string;
}

export default function Home() {
  const query = useQuery({
    queryKey: ['users', 'test'],
    queryFn: () => getUsers(),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
  return (
    <div>
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
