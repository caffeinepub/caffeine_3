import type { Principal } from '@dfinity/principal';

export type UserId = Principal;
export type Time = bigint;
export type TransactionAmount = bigint;
export type InvestmentAmount = bigint;
export type ReferralCode = string;

export interface ReferralEarning {
  referred_user_id: UserId;
  referrer_id: UserId;
  level: bigint;
  amount: TransactionAmount;
  percentage: bigint;
}

export interface InvestmentPlan {
  id: bigint;
  durationDays: bigint;
  name: string;
  maxInvestment: bigint;
  minInvestment: bigint;
  profitPercentage: bigint;
}

export interface Investment {
  end_date: Time;
  user_id: UserId;
  start_date: Time;
  plan_id: bigint;
  amount: InvestmentAmount;
}

export interface UserProfile {
  principal: Principal;
  referred_by?: UserId;
  email: string;
  referral_code: ReferralCode;
}

export enum TransactionStatus {
  pending = 'pending',
  completed = 'completed',
  failed = 'failed'
}

export enum TransactionType {
  investment = 'investment',
  referralCommission = 'referralCommission',
  deposit = 'deposit',
  withdrawal = 'withdrawal'
}

export interface Transaction {
  status: TransactionStatus;
  transaction_type: TransactionType;
  created_at: Time;
  user_id: UserId;
  amount: TransactionAmount;
}

export enum UserRole {
  admin = 'admin',
  user = 'user',
  guest = 'guest'
}

export interface backendInterface {
  _initializeAccessControlWithSecret(secret: string): Promise<void>;
  addInvestment(investment: Investment): Promise<void>;
  addReferralEarning(earning: ReferralEarning): Promise<void>;
  addTransaction(transaction: Transaction): Promise<void>;
  assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
  createNewInvestmentPlan(
    planName: string,
    durationDays: bigint,
    profitPercentage: bigint,
    minInvestment: bigint,
    maxInvestment: bigint
  ): Promise<void>;
  getCallerBalance(): Promise<bigint | null>;
  getCallerInvestment(): Promise<Investment | null>;
  getCallerReferralEarnings(): Promise<Array<ReferralEarning>>;
  getCallerTransaction(): Promise<Transaction | null>;
  getCallerUserProfile(): Promise<UserProfile | null>;
  getCallerUserRole(): Promise<UserRole>;
  getInvestmentPlans(): Promise<Array<InvestmentPlan>>;
  getUserProfile(user: UserId): Promise<UserProfile | null>;
  isCallerAdmin(): Promise<boolean>;
  saveCallerUserProfile(profile: UserProfile): Promise<void>;
  setCurrentBalance(amount: bigint): Promise<void>;
}
