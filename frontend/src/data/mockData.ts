export interface Transaction {
  id: string;
  merchant: string;
  date: string;
  amount: number;
  type: 'expense' | 'income';
  category: string;
  status: 'completed' | 'pending' | 'failed';
  account: string;
}

export interface BankAccount {
  id: string;
  institution: string;
  name: string;
  type: 'checking' | 'savings' | 'credit';
  balance: number;
  availableBalance: number;
  lastSynced: string;
  logo: string;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  icon: string;
}

export const transactions: Transaction[] = [
  { id: '1', merchant: 'Whole Foods Market', date: '2025-03-14', amount: 127.43, type: 'expense', category: 'Groceries', status: 'completed', account: 'Chase Checking' },
  { id: '2', merchant: 'Netflix', date: '2025-03-13', amount: 15.99, type: 'expense', category: 'Entertainment', status: 'completed', account: 'Chase Checking' },
  { id: '3', merchant: 'Employer Direct Deposit', date: '2025-03-12', amount: 4250.00, type: 'income', category: 'Salary', status: 'completed', account: 'Chase Checking' },
  { id: '4', merchant: 'Equinox Fitness', date: '2025-03-12', amount: 189.00, type: 'expense', category: 'Health', status: 'completed', account: 'Amex Platinum' },
  { id: '5', merchant: 'Amazon Web Services', date: '2025-03-11', amount: 42.17, type: 'expense', category: 'Tech', status: 'completed', account: 'Chase Checking' },
  { id: '6', merchant: 'Uber', date: '2025-03-11', amount: 24.50, type: 'expense', category: 'Transport', status: 'completed', account: 'Chase Checking' },
  { id: '7', merchant: 'Blue Bottle Coffee', date: '2025-03-10', amount: 6.75, type: 'expense', category: 'Dining', status: 'completed', account: 'Amex Platinum' },
  { id: '8', merchant: 'Stripe Payment', date: '2025-03-10', amount: 1200.00, type: 'income', category: 'Freelance', status: 'completed', account: 'Chase Checking' },
  { id: '9', merchant: 'Con Edison', date: '2025-03-09', amount: 142.30, type: 'expense', category: 'Utilities', status: 'completed', account: 'Chase Checking' },
  { id: '10', merchant: 'Sweetgreen', date: '2025-03-09', amount: 16.85, type: 'expense', category: 'Dining', status: 'completed', account: 'Amex Platinum' },
  { id: '11', merchant: 'Apple Store', date: '2025-03-08', amount: 999.00, type: 'expense', category: 'Shopping', status: 'completed', account: 'Amex Platinum' },
  { id: '12', merchant: 'Landlord - Rent', date: '2025-03-01', amount: 2400.00, type: 'expense', category: 'Rent', status: 'completed', account: 'Chase Checking' },
  { id: '13', merchant: 'Verizon Wireless', date: '2025-03-05', amount: 85.00, type: 'expense', category: 'Utilities', status: 'pending', account: 'Chase Checking' },
  { id: '14', merchant: 'Delta Airlines', date: '2025-03-04', amount: 342.00, type: 'expense', category: 'Travel', status: 'completed', account: 'Amex Platinum' },
  { id: '15', merchant: 'Spotify', date: '2025-03-03', amount: 9.99, type: 'expense', category: 'Entertainment', status: 'completed', account: 'Chase Checking' },
  { id: '16', merchant: 'Target', date: '2025-03-02', amount: 67.42, type: 'expense', category: 'Shopping', status: 'completed', account: 'Chase Checking' },
  { id: '17', merchant: 'Chipotle', date: '2025-03-02', amount: 14.25, type: 'expense', category: 'Dining', status: 'completed', account: 'Amex Platinum' },
  { id: '18', merchant: 'Google Cloud', date: '2025-02-28', amount: 31.50, type: 'expense', category: 'Tech', status: 'completed', account: 'Chase Checking' },
  { id: '19', merchant: 'Trader Joe\'s', date: '2025-02-27', amount: 89.33, type: 'expense', category: 'Groceries', status: 'completed', account: 'Chase Checking' },
  { id: '20', merchant: 'Freelance Client - Acme', date: '2025-02-25', amount: 2800.00, type: 'income', category: 'Freelance', status: 'completed', account: 'Chase Checking' },
  { id: '21', merchant: 'Hertz Car Rental', date: '2025-02-24', amount: 156.00, type: 'expense', category: 'Travel', status: 'completed', account: 'Amex Platinum' },
  { id: '22', merchant: 'Walgreens', date: '2025-02-23', amount: 28.99, type: 'expense', category: 'Health', status: 'completed', account: 'Chase Checking' },
  { id: '23', merchant: 'Refund - Amazon', date: '2025-02-22', amount: 45.00, type: 'income', category: 'Shopping', status: 'completed', account: 'Chase Checking' },
  { id: '24', merchant: 'Starbucks', date: '2025-02-21', amount: 7.50, type: 'expense', category: 'Dining', status: 'failed', account: 'Amex Platinum' },
];

export const bankAccounts: BankAccount[] = [
  { id: '1', institution: 'Chase', name: 'Total Checking', type: 'checking', balance: 12450.32, availableBalance: 12450.32, lastSynced: '2 min ago', logo: '🏦' },
  { id: '2', institution: 'Chase', name: 'Savings', type: 'savings', balance: 28750.00, availableBalance: 28750.00, lastSynced: '2 min ago', logo: '🏦' },
  { id: '3', institution: 'American Express', name: 'Platinum Card', type: 'credit', balance: -2847.52, availableBalance: 17152.48, lastSynced: '5 min ago', logo: '💳' },
  { id: '4', institution: 'Ally Bank', name: 'High-Yield Savings', type: 'savings', balance: 15200.00, availableBalance: 15200.00, lastSynced: '10 min ago', logo: '🏦' },
  { id: '5', institution: 'Capital One', name: 'Venture X', type: 'credit', balance: -1320.80, availableBalance: 18679.20, lastSynced: '8 min ago', logo: '💳' },
];

export const budgets: Budget[] = [
  { id: '1', category: 'Groceries', limit: 600, spent: 427, icon: '🛒' },
  { id: '2', category: 'Dining', limit: 400, spent: 312, icon: '🍽️' },
  { id: '3', category: 'Entertainment', limit: 200, spent: 185, icon: '🎬' },
  { id: '4', category: 'Transport', limit: 300, spent: 124, icon: '🚗' },
  { id: '5', category: 'Shopping', limit: 500, spent: 999, icon: '🛍️' },
  { id: '6', category: 'Utilities', limit: 350, spent: 227, icon: '⚡' },
  { id: '7', category: 'Health', limit: 250, spent: 189, icon: '💪' },
  { id: '8', category: 'Travel', limit: 500, spent: 342, icon: '✈️' },
  { id: '9', category: 'Tech', limit: 150, spent: 73, icon: '💻' },
  { id: '10', category: 'Subscriptions', limit: 100, spent: 42, icon: '📱' },
];

export const monthlySpending = [
  { month: 'Oct', income: 5800, expenses: 4200 },
  { month: 'Nov', income: 6100, expenses: 4500 },
  { month: 'Dec', income: 7200, expenses: 5800 },
  { month: 'Jan', income: 5450, expenses: 4100 },
  { month: 'Feb', income: 5900, expenses: 3900 },
  { month: 'Mar', income: 5450, expenses: 4601 },
];

export const categoryBreakdown = [
  { name: 'Rent', value: 2400, fill: 'hsl(243, 55%, 53%)' },
  { name: 'Groceries', value: 427, fill: 'hsl(156, 52%, 43%)' },
  { name: 'Dining', value: 312, fill: 'hsl(38, 92%, 50%)' },
  { name: 'Shopping', value: 999, fill: 'hsl(340, 58%, 55%)' },
  { name: 'Entertainment', value: 185, fill: 'hsl(200, 65%, 50%)' },
  { name: 'Other', value: 878, fill: 'hsl(220, 10%, 46%)' },
];

export const CATEGORIES = [
  'Groceries', 'Dining', 'Entertainment', 'Transport', 'Shopping',
  'Utilities', 'Health', 'Travel', 'Rent', 'Tech', 'Salary', 'Freelance', 'Subscriptions'
];

/** Dashboard summary - pre-computed from mock data for easy future API replacement */
export const dashboardSummary = {
  totalBalance: 52231.00,
  monthlySpending: 4601,
  monthlyIncome: 5450,
  savings: 43950,
  linkedAccounts: 5,
  budgetRemaining: 420,
  savingsRate: 15.6,
  topCategory: { name: 'Rent', amount: 2400 },
  largestExpense: { merchant: 'Apple Store', amount: 999, date: 'Mar 8' },
};
