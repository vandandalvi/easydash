import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LEAD_SOURCES, LEAD_STATUSES } from '@/constants/leads';
import type { Lead } from '@/types/lead';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  status: z.enum(LEAD_STATUSES),
  source: z.enum(LEAD_SOURCES),
});

type FormData = z.infer<typeof schema>;

interface Props {
  initialValues?: Omit<Lead, 'id' | 'createdAt'>;
  loading: boolean;
  onSubmit: (values: Omit<Lead, 'id' | 'createdAt'>) => Promise<void>;
}

export function LeadForm({ initialValues, loading, onSubmit }: Props) {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialValues ?? { name: '', email: '', status: 'new', source: 'website' },
  });
  return (
    <form className="grid gap-5" onSubmit={handleSubmit((values) => onSubmit(values))}>
      <Input label="Full name" error={formState.errors.name?.message} {...register('name')} />
      <Input label="Email address" type="email" error={formState.errors.email?.message} {...register('email')} />
      <Select label="Status" options={LEAD_STATUSES.map((value) => ({ value, label: value }))} {...register('status')} />
      <Select label="Source" options={LEAD_SOURCES.map((value) => ({ value, label: value }))} {...register('source')} />
      <Button type="submit" disabled={loading} className="mt-2">
        {loading ? 'Saving...' : 'Save Lead'}
      </Button>
    </form>
  );
}
