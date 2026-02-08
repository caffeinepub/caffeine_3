export function getReferralLink(referralCode: string): string {
  return `${window.location.origin}/register?ref=${referralCode}`;
}

export function parseReferralCode(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('ref');
  } catch {
    return null;
  }
}
