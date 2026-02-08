import { useState } from 'react';
import { useSaveCallerUserProfile } from '../../hooks/useCurrentUserProfile';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { getUrlParameter } from '../../utils/urlParams';
import { validateEmail } from '../../utils/validation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import ErrorBanner from '../common/ErrorBanner';
import { Loader2 } from 'lucide-react';

export default function ProfileOnboardingModal() {
  const { identity } = useInternetIdentity();
  const [email, setEmail] = useState('');
  const [referralCode, setReferralCode] = useState(getUrlParameter('ref') || '');
  const [error, setError] = useState('');
  
  const { mutate: saveProfile, isPending } = useSaveCallerUserProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    if (!identity) {
      setError('Not authenticated');
      return;
    }

    const principal = identity.getPrincipal();
    const userReferralCode = principal.toString().slice(0, 8).toUpperCase();

    saveProfile(
      {
        principal,
        email,
        referral_code: userReferralCode,
        referred_by: referralCode ? principal : undefined,
      },
      {
        onError: (err) => {
          setError(err.message || 'Failed to save profile');
        },
      }
    );
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
          <DialogDescription>
            Please provide your email to get started
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <ErrorBanner message={error} />}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="referralCode">Referral Code (Optional)</Label>
            <Input
              id="referralCode"
              type="text"
              placeholder="Enter referral code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Continue'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
