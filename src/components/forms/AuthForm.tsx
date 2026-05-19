import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { UserRole } from '@/types/auth';

const schema = z.object({
  name: z.string().optional(),
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Minimum 6 chars'),
  role: z.enum(['admin', 'sales']).optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  type: 'login' | 'register';
  loading: boolean;
  disabled?: boolean;
  onSubmit: (values: { name?: string; email: string; password: string; role?: UserRole }) => Promise<void>;
}

export function AuthForm({ type, loading, disabled = false, onSubmit }: Props) {
  const { register, handleSubmit, formState, setError } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: 'sales' },
  });
  return (
    <form
      className="grid gap-5"
      onSubmit={handleSubmit(async (values) => {
        if (type === 'register' && (!values.name || values.name.trim().length < 2)) {
          setError('name', { message: 'Name is required' });
          return;
        }
        await onSubmit(values);
      })}
    >
      {type === 'register' && <Input label="Full name" error={formState.errors.name?.message} {...register('name')} />}
      <Input label="Email address" type="email" error={formState.errors.email?.message} {...register('email')} />
      <Input label="Password" type="password" error={formState.errors.password?.message} {...register('password')} />
      <Button type="submit" disabled={loading || disabled} className="mt-2">
        {loading ? 'Please wait...' : disabled ? 'Please wait for server' : type === 'login' ? 'Sign in' : 'Create account'}
      </Button>
    </form>
  );
}
