'use client';
import { useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import { useRouter, useSearchParams } from 'next/navigation';

let checkboxList = ['5', '4', '3', '2', '1'];

function CheckboxFilter() {
  const searchParams = useSearchParams();
  const newUrlSearchParams = new URLSearchParams(searchParams);
  const router = useRouter();
  const [selectedStars, setSelectedStarts] = useState<string[]>([]);
  return (
    <div className="space-y-1">
      <h1 className="font-bold">Stars</h1>
      <div className="flex flex-col ml-6">
        {checkboxList.map((star) => (
          <div className="flex items-center justify-start gap-1" key={star}>
            <Checkbox
              id={star}
              value={star}
              checked={selectedStars.includes(star)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedStarts((prev) => [...prev, star]);
                  newUrlSearchParams.set('stars', selectedStars.join(''));
                  router.push('?' + newUrlSearchParams);
                  console.log(selectedStars);
                } else {
                  setSelectedStarts((prev) =>
                    prev.filter((val) => val !== star)
                  );
                }
              }}
            />
            <label htmlFor={star}>{new Array(+star).fill('⭐').join('')}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CheckboxFilter;
