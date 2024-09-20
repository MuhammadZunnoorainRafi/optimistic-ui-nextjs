import { Skeleton } from '@/components/ui/skeleton';
import { RocketIcon } from '@radix-ui/react-icons';
import React from 'react';

function Loading() {
  const arr = [1, 2, 3];

  return (
    <div className="space-y-1 min-h-[70vh] flex items-center justify-center">
      <RocketIcon className="size-56 animate-pulse" />
    </div>
  );
}

export default Loading;
