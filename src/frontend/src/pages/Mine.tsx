import { useGetCallerUserProfile } from '../hooks/useCurrentUserProfile';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useNavigate } from '@tanstack/react-router';
import LoginButton from '../components/auth/LoginButton';
import CryptoCard from '../components/common/CryptoCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Wallet, Users, Mail, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Mine() {
  const { identity } = useInternetIdentity();
  const { data: profile, isLoading } = useGetCallerUserProfile();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const referralLink = profile
    ? `${window.location.origin}/register?ref=${profile.referral_code}`
    : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success('Referral link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen space-y-4 p-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-sm text-muted-foreground">Manage your account</p>
      </div>

      {/* Profile Info */}
      <CryptoCard glow className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="font-medium">{profile?.email || 'Not set'}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Referral Code</div>
              <div className="font-medium">{profile?.referral_code || 'N/A'}</div>
            </div>
          </div>
        </div>
      </CryptoCard>

      {/* Referral Link */}
      {profile && (
        <CryptoCard className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-sm font-medium">Your Referral Link</div>
              <div className="mt-1 truncate text-xs text-muted-foreground">
                {referralLink}
              </div>
            </div>
            <Button onClick={handleCopyLink} size="icon" variant="outline">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </CryptoCard>
      )}

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start gap-3"
            onClick={() => navigate({ to: '/wallet' })}
          >
            <Wallet className="h-5 w-5" />
            My Wallet
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-3"
            onClick={() => navigate({ to: '/invitation' })}
          >
            <Users className="h-5 w-5" />
            Referral Dashboard
          </Button>
        </div>
      </div>

      {/* Logout */}
      <div className="pt-4">
        <LoginButton />
      </div>
    </div>
  );
}
