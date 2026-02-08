import { IDL } from '@dfinity/candid';

export const idlFactory = ({ IDL }: { IDL: any }) => {
  const UserId = IDL.Principal;
  const Time = IDL.Int;
  const TransactionAmount = IDL.Nat;
  const ReferralEarning = IDL.Record({
    'referred_user_id': UserId,
    'referrer_id': UserId,
    'level': IDL.Nat,
    'amount': TransactionAmount,
    'percentage': IDL.Nat,
  });
  const InvestmentPlan = IDL.Record({
    'id': IDL.Nat,
    'durationDays': IDL.Nat,
    'name': IDL.Text,
    'maxInvestment': IDL.Nat,
    'minInvestment': IDL.Nat,
    'profitPercentage': IDL.Nat,
  });
  const InvestmentAmount = IDL.Nat;
  const Investment = IDL.Record({
    'end_date': Time,
    'user_id': UserId,
    'start_date': Time,
    'plan_id': IDL.Nat,
    'amount': InvestmentAmount,
  });
  const ReferralCode = IDL.Text;
  const UserProfile = IDL.Record({
    'principal': IDL.Principal,
    'referred_by': IDL.Opt(UserId),
    'email': IDL.Text,
    'referral_code': ReferralCode,
  });
  const TransactionStatus = IDL.Variant({
    'pending': IDL.Null,
    'completed': IDL.Null,
    'failed': IDL.Null,
  });
  const TransactionType = IDL.Variant({
    'investment': IDL.Null,
    'referralCommission': IDL.Null,
    'deposit': IDL.Null,
    'withdrawal': IDL.Null,
  });
  const Transaction = IDL.Record({
    'status': TransactionStatus,
    'transaction_type': TransactionType,
    'created_at': Time,
    'user_id': UserId,
    'amount': TransactionAmount,
  });
  const UserRole = IDL.Variant({
    'admin': IDL.Null,
    'user': IDL.Null,
    'guest': IDL.Null,
  });
  return IDL.Service({
    '_initializeAccessControlWithSecret': IDL.Func([IDL.Text], [], []),
    'addInvestment': IDL.Func([Investment], [], []),
    'addReferralEarning': IDL.Func([ReferralEarning], [], []),
    'addTransaction': IDL.Func([Transaction], [], []),
    'assignCallerUserRole': IDL.Func([IDL.Principal, UserRole], [], []),
    'createNewInvestmentPlan': IDL.Func(
      [IDL.Text, IDL.Nat, IDL.Nat, IDL.Nat, IDL.Nat],
      [],
      [],
    ),
    'getCallerBalance': IDL.Func([], [IDL.Opt(IDL.Nat)], ['query']),
    'getCallerInvestment': IDL.Func([], [IDL.Opt(Investment)], ['query']),
    'getCallerReferralEarnings': IDL.Func(
      [],
      [IDL.Vec(ReferralEarning)],
      ['query'],
    ),
    'getCallerTransaction': IDL.Func([], [IDL.Opt(Transaction)], ['query']),
    'getCallerUserProfile': IDL.Func([], [IDL.Opt(UserProfile)], ['query']),
    'getCallerUserRole': IDL.Func([], [UserRole], ['query']),
    'getInvestmentPlans': IDL.Func([], [IDL.Vec(InvestmentPlan)], ['query']),
    'getUserProfile': IDL.Func([UserId], [IDL.Opt(UserProfile)], ['query']),
    'isCallerAdmin': IDL.Func([], [IDL.Bool], ['query']),
    'saveCallerUserProfile': IDL.Func([UserProfile], [], []),
    'setCurrentBalance': IDL.Func([IDL.Nat], [], []),
  });
};
