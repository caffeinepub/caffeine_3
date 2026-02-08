import { useGetCallerReferralEarnings } from '../hooks/useReferrals';
import { useGetCallerUserProfile } from '../hooks/useCurrentUserProfile';
import ReferralStatsCards from '../components/referrals/ReferralStatsCards';
import ReferralEarningsTable from '../components/referrals/ReferralEarningsTable';
import CryptoCard from '../components/common/CryptoCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Invitation() {
  const { data: earnings, isLoading: earningsLoading } = useGetCallerReferralEarnings();
  const { data: profile, isLoading: profileLoading } = useGetCallerUserProfile();
  const [copied, setCopied] = useState(false);

  const referralLink = profile
    ? `${window.location.origin}/register?ref=${profile.referral_code}`
    : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success('Referral link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  if (profileLoading || earningsLoading) {
    return (
      <div className="min-h-screen space-y-4 p-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Referral Program</h1>
        <p className="text-sm text-muted-foreground">Invite friends and earn commissions</p>
      </div>

      {/* Referral Link */}
      <CryptoCard className="p-4">
        <Label htmlFor="referralLink" className="text-sm font-medium">
          Your Referral Link
        </Label>
        <div className="mt-2 flex gap-2">
          <Input
            id="referralLink"
            value={referralLink}
            readOnly
            className="flex-1"
          />
          <Button onClick={handleCopy} size="icon" variant="outline">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Share this link to earn 20% commission on Level 1 and 10% on Level 2
        </p>
      </CryptoCard>

      {/* Stats */}
      <ReferralStatsCards earnings={earnings || []} />

      {/* Earnings Table */}
      <ReferralEarningsTable earnings={earnings || []} />
    </div>
  );
}
