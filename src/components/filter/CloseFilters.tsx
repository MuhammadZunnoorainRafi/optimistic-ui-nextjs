'use client';

import { useRouter, useSearchParams } from 'next/navigation';

function CloseFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newUrlSearchParams = new URLSearchParams(searchParams);

  return (
    <div className="flex items-center justify-center gap-3">
      {
        <button
          onClick={() => {
            newUrlSearchParams.delete('stars');
            // newUrlSearchParams.delete('category');
            // newUrlSearchParams.delete('page');
            // newUrlSearchParams.delete('search');
            router.push('/');
          }}
          className="px-3 py-1 rounded-md bg-slate-700 text-slate-50 flex items-center justify-center gap-3"
        >
          <p>Clear Filters</p>
          <p>X</p>
        </button>
      }
    </div>
  );
}

export default CloseFilters;
