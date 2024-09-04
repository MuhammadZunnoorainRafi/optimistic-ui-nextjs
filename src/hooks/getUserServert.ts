import { auth } from '@/auth';

export const getUserServer = async () => {
  const session = await auth();
  if (
    session &&
    session.user &&
    session.user.id &&
    session.user.name &&
    session.user.email
  ) {
    const { id, name, email } = session.user;
    return { id, name, email };
  }
  return null;
};
