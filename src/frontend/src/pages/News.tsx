import CryptoCard from '../components/common/CryptoCard';
import { Newspaper } from 'lucide-react';

export default function News() {
  return (
    <div className="min-h-screen space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">News</h1>
        <p className="text-sm text-muted-foreground">Latest crypto market updates</p>
      </div>

      <CryptoCard className="p-8 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-4">
            <Newspaper className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="mt-4 text-lg font-semibold">Coming Soon</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Stay tuned for the latest crypto news and market analysis
        </p>
      </CryptoCard>
    </div>
  );
}
