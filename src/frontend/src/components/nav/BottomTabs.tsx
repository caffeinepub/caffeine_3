import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Home, Newspaper, TrendingUp, BarChart3, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tabs = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'news', label: 'News', icon: Newspaper, path: '/news' },
  { id: 'quant', label: 'Quant', icon: TrendingUp, path: '/quant' },
  { id: 'futures', label: 'Futures', icon: BarChart3, path: '/futures' },
  { id: 'mine', label: 'Mine', icon: User, path: '/mine' },
];

export default function BottomTabs() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur-lg">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentPath === tab.path;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: tab.path })}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 min-w-[60px] ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : ''}`} />
              <span className="text-xs font-medium">{tab.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
