'use client';
import { Button } from '../ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  totalPages: number;
  currentPage: number;
};

function Pagination({ totalPages, currentPage }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams);
  let totalPagesArr = [];
  for (let i = 1; i <= totalPages; i++) {
    totalPagesArr.push(i);
  }
  return (
    <div className="flex items-center justify-center gap-2">
      {totalPagesArr.map((val) => (
        <Button
          onClick={() => {
            urlSearchParams.set('page', val.toString());
            router.push('?' + urlSearchParams);
          }}
          variant={currentPage === val ? 'default' : 'outline'}
          size="icon"
          key={val}
        >
          {val}
        </Button>
      ))}
    </div>
  );
}

export default Pagination;
