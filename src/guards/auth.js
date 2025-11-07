import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function AuthGuard({ ...props }) {
  const session = await getSession();

  const { children } = props;
  if (!Boolean(session?.userId)) {
    redirect('/auth/sign-in');
  }
  return children;
}
