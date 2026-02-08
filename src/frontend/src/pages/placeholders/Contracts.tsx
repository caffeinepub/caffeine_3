import CryptoCard from '../../components/common/CryptoCard';
import { FileText } from 'lucide-react';

export default function Contracts() {
  return (
    <div className="min-h-screen space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Contracts</h1>
        <p className="text-sm text-muted-foreground">View your active contracts</p>
      </div>

      <CryptoCard className="p-8 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-4">
            <FileText className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="mt-4 text-lg font-semibold">No Active Contracts</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Your investment contracts will appear here
        </p>
      </CryptoCard>
    </div>
  );
}
