'use client';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

const categoryFilter = [
  { name: 'Shirt', value: 'shirt' },
  { name: 'Pant', value: 'pant' },
  { name: 'Jacket', value: 'jacket' },
];

function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams);
  const category = searchParams.get('category');
  const [defaultValue, setDefaultValue] = useState(category || undefined);
  const onValueChange = (val: string) => {
    urlSearchParams.set('category', val);
    router.push('?' + urlSearchParams);
  };

  return (
    <div className="space-y-1">
      <h1 className="font-bold">Category:</h1>
      <RadioGroup
        value={category || ''}
        onValueChange={onValueChange}
        className="ml-6"
      >
        {categoryFilter.map((val) => (
          <div key={val.name} className="flex items-center space-x-2">
            <RadioGroupItem value={val.value} id={val.name} />
            <Label htmlFor={val.name}>{val.name}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default CategoryFilter;
