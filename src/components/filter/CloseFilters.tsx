'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function CloseFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newUrlSearchParams = new URLSearchParams(searchParams);

  const category = searchParams.get('category');
  const [categoryFilter, setCategoryFilter] = useState(category ? true : false);

  useEffect(() => {
    category && setCategoryFilter(true);
  }, [category]);
  return (
    <div className="flex items-center justify-center gap-3">
      {categoryFilter && (
        <button
          onClick={() => {
            setCategoryFilter(false);
            newUrlSearchParams.delete('category');
            router.push('?' + newUrlSearchParams);
          }}
          className="px-3 py-1 rounded-md bg-slate-700 text-slate-50 flex items-center justify-center gap-3"
        >
          <p>{category}</p>
          <p>X</p>
        </button>
      )}
    </div>
  );
}

export default CloseFilters;
