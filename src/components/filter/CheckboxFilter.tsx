'use client';
import { useCallback, useEffect, useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

let checkboxList = ['5', '4', '3', '2', '1'];
let fruits = ['apple', 'banana', 'mango', 'orange'];

function CheckboxFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedStars, setSelectedStarts] = useState<string[]>(
    searchParams.get('stars')?.split('-') || []
  );
  const newUrlSearchParams = new URLSearchParams(searchParams);
  const memoizedFunction = useCallback(() => {
    if (selectedStars.length <= 0) {
      newUrlSearchParams.delete('stars');
    } else {
      newUrlSearchParams.set('stars', selectedStars.join('-'));
    }

    router.push('?' + newUrlSearchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStars, searchParams]);

  useEffect(() => {
    memoizedFunction();
  }, [memoizedFunction, searchParams]);
  useEffect(() => {
    if (searchParams.get('stars') === null) {
      setSelectedStarts([]);
    }
  }, [searchParams]);

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
      <Select
        onValueChange={(val) => {
          newUrlSearchParams.set('fruits', val);
          router.push('?' + newUrlSearchParams);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            {fruits.map((val) => (
              <SelectItem key={val} value={val}>
                {val}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default CheckboxFilter;
