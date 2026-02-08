import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { getUrlParameter } from '../utils/urlParams';
import LoginButton from '../components/auth/LoginButton';
import { UserPlus } from 'lucide-react';

export default function Register() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const referralCode = getUrlParameter('ref');

  useEffect(() => {
    if (identity) {
      navigate({ to: '/' });
    }
  }, [identity, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-6">
            <UserPlus className="h-12 w-12 text-primary" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Join Caffeine</h1>
          {referralCode && (
            <p className="text-sm text-muted-foreground">
              You've been invited! Referral code: <span className="font-semibold">{referralCode}</span>
            </p>
          )}
          <p className="text-muted-foreground">
            Sign in to create your account and start investing
          </p>
        </div>
        <div className="flex justify-center">
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
