export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: Date;
  walletId: string;
  userId: string;
  categoryId?: string; // Para categorias de investimento
  transactionCategoryId?: string; // Para categorias de transação normais
  recurrence?: {
    type: 'none' | 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'bimonthly' | 'quarterly' | 'semester' | 'yearly' | 'custom';
    repetitions?: number;
    endDate?: Date;
    isInfinite?: boolean;
  };
}

export interface Wallet {
  id: string;
  name: string;
  balance: number;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  color: string;
}

export interface InvestmentCategory {
  id: string;
  name: string;
  goal: number;
  current: number;
  color: string;
  createdAt: Date;
}

export interface TransactionCategory {
  id: string;
  name: string;
  type: 'income' | 'expense' | 'both';
  color: string;
}

export interface TransactionFormData {
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: Date;
  walletId: string;
  userId: string;
  categoryId?: string;
  transactionCategoryId?: string;
  recurrence?: {
    type: 'none' | 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'bimonthly' | 'quarterly' | 'semester' | 'yearly' | 'custom';
    repetitions?: number;
    endDate?: Date;
    isInfinite?: boolean;
  };
}

export interface TransactionFilters {
  startDate?: Date;
  endDate?: Date;
  type?: 'income' | 'expense' | 'all';
  walletId?: string;
  userId?: string;
}

export interface RecurringExpenseDetail {
  id: string;
  description: string;
  monthlyAmount: number;
  endDate?: Date;
  isInfinite?: boolean;
  totalRemaining: number;
}
