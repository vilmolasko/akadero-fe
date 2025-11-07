import { TableHead as ShadTableHead, TableRow } from '@/components/ui/table';

export default function TableHead({ headData }) {
  return (
    <ShadTableHead>
      <TableRow>
        {headData.map((head) => (
          <ShadTableHead
            key={head.id}
            className={head.alignRight ? 'text-right' : 'text-left'}>
            {head.label}
          </ShadTableHead>
        ))}
      </TableRow>
    </ShadTableHead>
  );
}
