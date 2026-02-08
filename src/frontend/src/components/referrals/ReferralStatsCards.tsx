import CryptoCard from '../common/CryptoCard';
import { Users, TrendingUp } from 'lucide-react';
import type { ReferralEarning } from '../../backend';

interface ReferralStatsCardsProps {
  earnings: ReferralEarning[];
}

export default function ReferralStatsCards({ earnings }: ReferralStatsCardsProps) {
  const level1Earnings = earnings.filter((e) => Number(e.level) === 1);
  const level2Earnings = earnings.filter((e) => Number(e.level) === 2);
  const totalEarnings = earnings.reduce((sum, e) => sum + Number(e.amount), 0) / 100;

  return (
    <div className="grid grid-cols-2 gap-3">
      <CryptoCard className="p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          Total Team
        </div>
        <div className="mt-2 text-2xl font-bold">{earnings.length}</div>
        <div className="mt-1 text-xs text-muted-foreground">
          L1: {level1Earnings.length} | L2: {level2Earnings.length}
        </div>
      </CryptoCard>

      <CryptoCard className="p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          Total Earnings
        </div>
        <div className="mt-2 text-2xl font-bold crypto-up">${totalEarnings.toFixed(2)}</div>
        <div className="mt-1 text-xs text-muted-foreground">Commission</div>
      </CryptoCard>
    </div>
  );
}
