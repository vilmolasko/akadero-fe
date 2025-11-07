import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function GuestGuard({ ...props }) {
  const session = await getSession();

  const { children, redirect: redirectTo } = props;

  if (Boolean(session?.userId)) {
    redirect(redirectTo || `/admin/dashboard`);
  }
  return children;
}
