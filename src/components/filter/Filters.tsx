import { Card, CardContent } from '../ui/card';
import CategoryFilter from './CategoryFilter';
import CheckboxFilter from './CheckboxFilter';

function Filters() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2 divide-y-2 pt-3">
        <CategoryFilter />
        <CheckboxFilter />
      </CardContent>
    </Card>
  );
}

export default Filters;
