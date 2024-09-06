import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

function Loading() {
  const arr = [1, 2, 3];

  return (
    <div>
      {arr.map((num) => (
        <div className="space-y-2" key={num}>
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      ))}
    </div>
  );
}

export default Loading;
