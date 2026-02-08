import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Array "mo:core/Array";
import List "mo:core/List";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Core Types
  public type UserId = Principal;
  public type Email = Text;
  public type Wallet = Nat;
  public type InvestmentAmount = Nat;
  public type TransactionAmount = Nat;
  public type ReferralCode = Text;

  public type TransactionType = {
    #deposit;
    #withdrawal;
    #investment;
    #referralCommission;
  };

  public type TransactionStatus = {
    #pending;
    #completed;
    #failed;
  };

  public type InvestmentPlan = {
    id : Nat;
    name : Text;
    durationDays : Nat;
    profitPercentage : Nat;
    minInvestment : Nat;
    maxInvestment : Nat;
  };

  // Model Types
  public type UserProfile = {
    principal : Principal;
    email : Text;
    referral_code : ReferralCode;
    referred_by : ?UserId;
  };

  public type Investment = {
    user_id : UserId;
    plan_id : Nat;
    amount : InvestmentAmount;
    start_date : Time.Time;
    end_date : Time.Time;
  };

  public type Transaction = {
    user_id : UserId;
    transaction_type : TransactionType;
    status : TransactionStatus;
    amount : TransactionAmount;
    created_at : Time.Time;
  };

  public type ReferralEarning = {
    referrer_id : UserId;
    referred_user_id : UserId;
    level : Nat; // 1 or 2
    percentage : Nat; // 20 or 10
    amount : TransactionAmount;
  };

  // State
  var lastCreatedPlanId = 0;
  let users = Map.empty<UserId, UserProfile>();
  let wallets = Map.empty<UserId, Wallet>();
  let investments = Map.empty<UserId, Investment>();
  let transactions = Map.empty<UserId, Transaction>();
  let referralEarnings = List.empty<ReferralEarning>();
  let plans = Map.empty<Nat, InvestmentPlan>();

  // Backend methods
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    users.add(caller, profile);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    users.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : UserId) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    users.get(user);
  };

  public shared ({ caller }) func setCurrentBalance(amount : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can set balance");
    };
    wallets.add(caller, amount);
  };

  public query ({ caller }) func getCallerBalance() : async ?Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view balance");
    };
    wallets.get(caller);
  };

  public shared ({ caller }) func addTransaction(transaction : Transaction) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add transactions");
    };

    // Verify ownership: user can only create transactions for themselves
    if (transaction.user_id != caller) {
      Runtime.trap("Unauthorized: Can only create transactions for yourself");
    };

    switch (transactions.get(transaction.user_id)) {
      case (?existing) {
        Runtime.trap("Transaction already exists for user " # debug_show (transaction.user_id));
      };
      case (null) {
        transactions.add(transaction.user_id, transaction);
      };
    };
  };

  public query ({ caller }) func getCallerTransaction() : async ?Transaction {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view transactions");
    };
    transactions.get(caller);
  };

  public shared ({ caller }) func addInvestment(investment : Investment) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add investments");
    };

    // Verify ownership: user can only create investments for themselves
    if (investment.user_id != caller) {
      Runtime.trap("Unauthorized: Can only create investments for yourself");
    };

    switch (investments.get(investment.user_id)) {
      case (?existing) {
        Runtime.trap("Investment already exists for user " # debug_show (investment.user_id));
      };
      case (null) {
        investments.add(investment.user_id, investment);
      };
    };
  };

  public query ({ caller }) func getCallerInvestment() : async ?Investment {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view investments");
    };
    investments.get(caller);
  };

  public shared ({ caller }) func addReferralEarning(earning : ReferralEarning) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add referral earnings");
    };
    referralEarnings.add(earning);
  };

  public query ({ caller }) func getCallerReferralEarnings() : async [ReferralEarning] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view referral earnings");
    };
    referralEarnings.filter(
      func(earning) {
        earning.referrer_id == caller;
      }
    ).toArray();
  };

  public shared ({ caller }) func createNewInvestmentPlan(planName : Text, durationDays : Nat, profitPercentage : Nat, minInvestment : Nat, maxInvestment : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create new investment plans");
    };

    lastCreatedPlanId += 1;
    let newPlan = {
      id = lastCreatedPlanId;
      name = planName;
      durationDays;
      profitPercentage;
      minInvestment;
      maxInvestment;
    };
    plans.add(newPlan.id, newPlan);
  };

  public query ({ caller }) func getInvestmentPlans() : async [InvestmentPlan] {
    // Investment plans are public information, no authorization required
    plans.values().toArray();
  };
};
