export function validateEmail(email: string): string | null {
  if (!email || email.trim() === '') {
    return 'Email is required';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }

  return null;
}

export function validateAmount(
  amount: number,
  min: number = 0,
  max: number = Infinity
): string | null {
  if (isNaN(amount) || amount <= 0) {
    return 'Amount must be greater than zero';
  }

  if (amount < min) {
    return `Amount must be at least $${min}`;
  }

  if (amount > max) {
    return `Amount cannot exceed $${max}`;
  }

  return null;
}
