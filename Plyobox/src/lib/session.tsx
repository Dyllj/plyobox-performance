import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import { createSeed } from '@/lib/shared/seed';
import type { Member } from '@/lib/shared/contract';

type Session = {
  status: 'signed-out' | 'signed-in';
  user: Member;
  isTrainer: boolean;
  signIn: () => void;
  signOut: () => void;
};

const previewMember = createSeed(new Date()).members.find((member) => member.memberNo === 'PLY-0042')!;
const SessionContext = createContext<Session | null>(null);

export function SessionProvider({ children }: PropsWithChildren) {
  const [status, setStatus] = useState<Session['status']>('signed-out');
  const value = useMemo<Session>(() => ({
    status,
    user: previewMember,
    isTrainer: true,
    signIn: () => setStatus('signed-in'),
    signOut: () => setStatus('signed-out'),
  }), [status]);
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const session = useContext(SessionContext);
  if (!session) throw new Error('useSession must be used inside SessionProvider');
  return session;
}
