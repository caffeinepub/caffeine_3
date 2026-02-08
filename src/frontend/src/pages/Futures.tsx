import CryptoCard from '../components/common/CryptoCard';
import { BarChart3 } from 'lucide-react';

export default function Futures() {
  return (
    <div className="min-h-screen space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Futures</h1>
        <p className="text-sm text-muted-foreground">Advanced trading features</p>
      </div>

      <CryptoCard className="p-8 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-4">
            <BarChart3 className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="mt-4 text-lg font-semibold">Coming Soon</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Futures trading will be available soon
        </p>
      </CryptoCard>
    </div>
  );
}
