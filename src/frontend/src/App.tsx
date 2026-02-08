import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useCurrentUserProfile';
import AppShell from './components/layout/AppShell';
import AuthGate from './components/auth/AuthGate';
import ProfileOnboardingModal from './components/profile/ProfileOnboardingModal';
import Home from './pages/Home';
import News from './pages/News';
import Quant from './pages/Quant';
import Futures from './pages/Futures';
import Mine from './pages/Mine';
import Wallet from './pages/Wallet';
import Invitation from './pages/Invitation';
import Register from './pages/Register';
import Contracts from './pages/placeholders/Contracts';
import ContractRecords from './pages/placeholders/ContractRecords';
import Api from './pages/placeholders/Api';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

function Layout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const newsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/news',
  component: News,
});

const quantRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/quant',
  component: Quant,
});

const futuresRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/futures',
  component: Futures,
});

const mineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/mine',
  component: Mine,
});

const walletRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/wallet',
  component: Wallet,
});

const invitationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/invitation',
  component: Invitation,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: Register,
});

const contractsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contracts',
  component: Contracts,
});

const contractRecordsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contract-records',
  component: ContractRecords,
});

const apiRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/api',
  component: Api,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  newsRoute,
  quantRoute,
  futuresRoute,
  mineRoute,
  walletRoute,
  invitationRoute,
  registerRoute,
  contractsRoute,
  contractRecordsRoute,
  apiRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function AppContent() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  
  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  return (
    <>
      <AuthGate>
        <RouterProvider router={router} />
        {showProfileSetup && <ProfileOnboardingModal />}
      </AuthGate>
      <Toaster />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AppContent />
    </ThemeProvider>
  );
}
