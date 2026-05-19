import { Button } from '@/components/ui/Button';

interface Props {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, pages, onPageChange }: Props) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Page {page} of {pages}
      </p>
      <div className="flex gap-2">
        <Button variant="secondary" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          Previous
        </Button>
        <Button variant="secondary" disabled={page >= pages} onClick={() => onPageChange(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
