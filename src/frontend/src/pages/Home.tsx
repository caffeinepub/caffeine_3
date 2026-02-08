import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import CryptoCard from '../components/common/CryptoCard';
import NeonIndicator from '../components/common/NeonIndicator';
import { sampleMarketData, marketOverview } from '../data/sampleMarket';
import { FileText, History, Code, Wallet, Users, TrendingUp, TrendingDown } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const quickActions = [
    { label: 'Contracts', icon: FileText, path: '/contracts' },
    { label: 'Records', icon: History, path: '/contract-records' },
    { label: 'API', icon: Code, path: '/api' },
    { label: 'Wallet', icon: Wallet, path: '/wallet' },
    { label: 'Invitation', icon: Users, path: '/invitation' },
  ];

  return (
    <div className="min-h-screen space-y-6 p-4">
      {/* Hero Banner */}
      <CryptoCard glow className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/assets/generated/hero-banner.dim_1600x600.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative z-10 flex items-center gap-4 p-6">
          <img
            src="/assets/generated/bull-icon.dim_512x512.png"
            alt="Bull"
            className="h-16 w-16"
          />
          <div>
            <h1 className="text-2xl font-bold">AI Quant Trading</h1>
            <p className="text-sm text-muted-foreground">Smart investment strategies powered by AI</p>
          </div>
        </div>
      </CryptoCard>

      {/* Quick Actions */}
      <div className="grid grid-cols-5 gap-2">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={() => navigate({ to: action.path })}
              className="flex flex-col items-center gap-2 rounded-lg bg-card p-3 transition-colors hover:bg-accent"
            >
              <div className="rounded-full bg-primary/10 p-2">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-medium">{action.label}</span>
            </button>
          );
        })}
      </div>

      {/* Market Overview */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Market Overview</h2>
        <div className="grid grid-cols-2 gap-3">
          <CryptoCard className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              Market Trend
            </div>
            <div className="mt-2 text-2xl font-bold crypto-up">Increase</div>
            <div className="mt-1 text-sm text-muted-foreground">
              {marketOverview.trendPercentage}% in 24h
            </div>
          </CryptoCard>

          <CryptoCard className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingDown className="h-4 w-4" />
              Long/Short Ratio
            </div>
            <div className="mt-2 text-2xl font-bold">{marketOverview.longShortRatio}</div>
            <div className="mt-1 text-sm text-muted-foreground">
              {marketOverview.longPercentage}% Long
            </div>
          </CryptoCard>
        </div>
      </div>

      {/* Market List */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Markets</h2>
        <div className="space-y-2">
          {sampleMarketData.map((market) => (
            <CryptoCard key={market.pair} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{market.pair}</div>
                  <div className="text-sm text-muted-foreground">{market.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${market.price.toLocaleString()}</div>
                  <NeonIndicator value={market.change24h} />
                </div>
              </div>
            </CryptoCard>
          ))}
        </div>
      </div>
    </div>
  );
}
