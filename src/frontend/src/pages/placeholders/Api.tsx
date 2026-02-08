import CryptoCard from '../../components/common/CryptoCard';
import { Code } from 'lucide-react';

export default function Api() {
  return (
    <div className="min-h-screen space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">API</h1>
        <p className="text-sm text-muted-foreground">API access and documentation</p>
      </div>

      <CryptoCard className="p-8 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-4">
            <Code className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="mt-4 text-lg font-semibold">Coming Soon</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          API documentation and access will be available soon
        </p>
      </CryptoCard>
    </div>
  );
}
