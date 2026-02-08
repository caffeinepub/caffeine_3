import { ReactNode } from 'react';
import BottomTabs from '../nav/BottomTabs';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 pb-20 overflow-x-hidden">
        {children}
      </main>
      <BottomTabs />
    </div>
  );
}
