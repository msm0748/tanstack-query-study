'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';

export default function RQProvider({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 쿼리 실패 시 재시도 횟수
            retry: 3,

            // 재시도 지연 시간 조절 함수
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 30000),

            // 캐시된 데이터의 유효 시간 (기본값: 5분)
            staleTime: 1000 * 60 * 5,

            // 캐시 유지 시간 (기본값: 5분)
            gcTime: 1000 * 60 * 5,

            // 자동 재검증 설정
            refetchOnWindowFocus: true, // 창에 포커스 될 때 자동 새로고침
            refetchOnReconnect: true, // 네트워크 재연결 시 자동 새로고침
            refetchOnMount: true, // 컴포넌트 마운트 시 자동 새로고침

            refetchInterval: 1000 * 60, // 자동 새로고침 시간 간격 (기본값: 1분)
            refetchIntervalInBackground: true, // 백그라운드에서 자동 새로고침 시도
          },

          mutations: {
            // 뮤테이션 재시도 횟수
            retry: 0,

            // 에러 발생 시 전역 에러 핸들러
            onError: (error) => {
              console.error('Query error:', error);
            },
          },
        },
      })
  );
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={process.env.NEXT_PUBLIC_MODE === 'local'}
      />
    </QueryClientProvider>
  );
}
