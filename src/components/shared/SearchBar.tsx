'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';

function SearchBar() {
  const searchParams = useSearchParams();
  const [text, setText] = useState(searchParams.get('search') || '');
  const router = useRouter();
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(searchParams.toString());
    const timeout = setTimeout(() => {
      text.length > 0
        ? urlSearchParams.set('search', text)
        : urlSearchParams.delete('search');
      router.push('?' + urlSearchParams.toString());
    }, 400);
    return () => {
      clearTimeout(timeout);
    };
  }, [text, searchParams, router]);

  return (
    <div>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Search"
      />
    </div>
  );
}

export default SearchBar;
