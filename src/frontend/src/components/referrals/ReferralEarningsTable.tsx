import CryptoCard from '../common/CryptoCard';
import { Badge } from '@/components/ui/badge';
import type { ReferralEarning } from '../../backend';

interface ReferralEarningsTableProps {
  earnings: ReferralEarning[];
}

export default function ReferralEarningsTable({ earnings }: ReferralEarningsTableProps) {
  const level1Earnings = earnings.filter((e) => Number(e.level) === 1);
  const level2Earnings = earnings.filter((e) => Number(e.level) === 2);

  const renderEarningsList = (earningsList: ReferralEarning[], level: number) => (
    <div className="space-y-2">
      {earningsList.length > 0 ? (
        earningsList.map((earning, idx) => (
          <CryptoCard key={idx} className="p-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm font-medium">
                  User: {earning.referred_user_id.toString().slice(0, 8)}...
                </div>
                <div className="text-xs text-muted-foreground">
                  Commission: {Number(earning.percentage)}%
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold crypto-up">
                  ${(Number(earning.amount) / 100).toFixed(2)}
                </div>
                <Badge variant="secondary" className="mt-1">
                  Level {level}
                </Badge>
              </div>
            </div>
          </CryptoCard>
        ))
      ) : (
        <CryptoCard className="p-6 text-center">
          <p className="text-sm text-muted-foreground">No Level {level} earnings yet</p>
        </CryptoCard>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="font-semibold">Level 1 Earnings (20%)</h3>
        {renderEarningsList(level1Earnings, 1)}
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold">Level 2 Earnings (10%)</h3>
        {renderEarningsList(level2Earnings, 2)}
      </div>
    </div>
  );
}
