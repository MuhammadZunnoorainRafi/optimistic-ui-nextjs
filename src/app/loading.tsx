import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

function Loading() {
  const arr = [1, 2, 3];

  return (
    <div className="space-y-1">
      {arr.map((num) => (
        <div className="space-y-2" key={num}>
          <Skeleton className="h-10 w-[750px]" />
          <Skeleton className="h-10 w-[700px]" />
        </div>
      ))}
    </div>
  );
}

export default Loading;
