import CryptoCard from '../../components/common/CryptoCard';
import { History } from 'lucide-react';

export default function ContractRecords() {
  return (
    <div className="min-h-screen space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Contract Records</h1>
        <p className="text-sm text-muted-foreground">View your contract history</p>
      </div>

      <CryptoCard className="p-8 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-4">
            <History className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="mt-4 text-lg font-semibold">No Records Yet</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Your contract history will appear here
        </p>
      </CryptoCard>
    </div>
  );
}
