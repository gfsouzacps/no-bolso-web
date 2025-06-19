import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Transaction, Wallet, TransactionFilters, User, InvestmentCategory, TransactionCategory, RecurringExpenseDetail } from '@/types/transaction';

interface TransactionContextType {
  transactions: Transaction[];
  wallets: Wallet[];
  users: User[];
  investmentCategories: InvestmentCategory[];
  transactionCategories: TransactionCategory[];
  filters: TransactionFilters;
  currentUser: User | null;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (transaction: Transaction) => void;
  addInvestmentCategory: (category: Omit<InvestmentCategory, 'id'>) => void;
  updateInvestmentCategory: (id: string, category: InvestmentCategory) => void;
  updateFilters: (filters: Partial<TransactionFilters>) => void;
  setCurrentUser: (user: User) => void;
  getFilteredTransactions: () => Transaction[];
  getTotalBalance: () => number;
  getIncomeTotal: () => number;
  getExpenseTotal: () => number;
  getRecurringExpenses: () => { monthlyTotal: number; totalRemaining: number };
  getRecurringExpensesDetails: () => RecurringExpenseDetail[];
  removeRecurringExpense: (transactionId: string) => void;
  getMonthlyIncome: () => number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

// Mock data for demonstration
const mockUsers: User[] = [
  { id: '1', name: 'Você', color: 'bg-blue-500' },
  { id: '2', name: 'Sua Esposa', color: 'bg-pink-500' },
];

const mockWallets: Wallet[] = [
  { id: '1', name: 'Débito', balance: 1250.00 },
  { id: '2', name: 'Crédito', balance: -500.00 },
  { id: '3', name: 'Investimentos', balance: 5000.00 },
];

const mockTransactionCategories: TransactionCategory[] = [
  { id: '1', name: 'Restaurante', type: 'expense', color: 'bg-red-500' },
  { id: '2', name: 'Supermercado', type: 'expense', color: 'bg-green-500' },
  { id: '3', name: 'Moradia', type: 'expense', color: 'bg-blue-500' },
  { id: '4', name: 'Transporte', type: 'expense', color: 'bg-yellow-500' },
  { id: '5', name: 'Lazer', type: 'expense', color: 'bg-purple-500' },
  { id: '6', name: 'Saúde', type: 'expense', color: 'bg-pink-500' },
  { id: '7', name: 'Educação', type: 'expense', color: 'bg-indigo-500' },
  { id: '8', name: 'Salário', type: 'income', color: 'bg-green-600' },
  { id: '9', name: 'Outras Receitas', type: 'income', color: 'bg-emerald-500' },
];

const mockInvestmentCategories: InvestmentCategory[] = [
  {
    id: '1',
    name: 'Reserva de Emergência',
    goal: 10000,
    current: 5000,
    color: 'bg-green-500',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Viagem Europa',
    goal: 8000,
    current: 2500,
    color: 'bg-blue-500',
    createdAt: new Date('2024-02-01')
  },
  {
    id: '3',
    name: 'Carro Novo',
    goal: 35000,
    current: 15000,
    color: 'bg-purple-500',
    createdAt: new Date('2024-03-10')
  }
];

const mockTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Salário',
    amount: 3500.00,
    type: 'income',
    date: new Date('2024-06-01'),
    walletId: '1',
    userId: '1',
    transactionCategoryId: '8',
    recurrence: {
      type: 'monthly',
      isInfinite: true
    }
  },
  {
    id: '2',
    description: 'Supermercado',
    amount: 250.00,
    type: 'expense',
    date: new Date('2024-06-05'),
    walletId: '1',
    userId: '2',
    transactionCategoryId: '2'
  },
  {
    id: '3',
    description: 'Freelance',
    amount: 800.00,
    type: 'income',
    date: new Date('2024-06-10'),
    walletId: '1',
    userId: '1',
    transactionCategoryId: '9'
  },
  {
    id: '4',
    description: 'Financiamento Casa',
    amount: 1200.00,
    type: 'expense',
    date: new Date('2024-06-08'),
    walletId: '1',
    userId: '1',
    transactionCategoryId: '3',
    recurrence: {
      type: 'monthly',
      repetitions: 36,
      endDate: new Date('2027-06-08')
    }
  },
  {
    id: '5',
    description: 'Netflix',
    amount: 45.00,
    type: 'expense',
    date: new Date('2024-06-11'),
    walletId: '2',
    userId: '2',
    transactionCategoryId: '5',
    recurrence: {
      type: 'monthly',
      isInfinite: true
    }
  },
];

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [wallets] = useState<Wallet[]>(mockWallets);
  const [users] = useState<User[]>(mockUsers);
  const [investmentCategories, setInvestmentCategories] = useState<InvestmentCategory[]>(mockInvestmentCategories);
  const [transactionCategories] = useState<TransactionCategory[]>(mockTransactionCategories);
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0]);
  const [filters, setFilters] = useState<TransactionFilters>({
    type: 'all'
  });

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const updateTransaction = (updatedTransaction: Transaction) => {
    setTransactions(prev => 
      prev.map(transaction => 
        transaction.id === updatedTransaction.id ? updatedTransaction : transaction
      )
    );
  };

  const addInvestmentCategory = (category: Omit<InvestmentCategory, 'id'>) => {
    const newCategory: InvestmentCategory = {
      ...category,
      id: Date.now().toString(),
    };
    setInvestmentCategories(prev => [...prev, newCategory]);
  };

  const updateInvestmentCategory = (id: string, updatedCategory: InvestmentCategory) => {
    setInvestmentCategories(prev => 
      prev.map(category => category.id === id ? updatedCategory : category)
    );
  };

  const removeRecurringExpense = (transactionId: string) => {
    setTransactions(prev => prev.filter(t => t.id !== transactionId));
  };

  const updateFilters = (newFilters: Partial<TransactionFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const getFilteredTransactions = () => {
    return transactions.filter(transaction => {
      const typeMatch = filters.type === 'all' || transaction.type === filters.type;
      const startDateMatch = !filters.startDate || transaction.date >= filters.startDate;
      const endDateMatch = !filters.endDate || transaction.date <= filters.endDate;
      const walletMatch = !filters.walletId || transaction.walletId === filters.walletId;
      const userMatch = !filters.userId || transaction.userId === filters.userId;

      return typeMatch && startDateMatch && endDateMatch && walletMatch && userMatch;
    });
  };

  const getTotalBalance = () => {
    return transactions.reduce((total, transaction) => {
      return transaction.type === 'income' 
        ? total + transaction.amount 
        : total - transaction.amount;
    }, 0);
  };

  const getIncomeTotal = () => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((total, t) => total + t.amount, 0);
  };

  const getExpenseTotal = () => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((total, t) => total + t.amount, 0);
  };

  const getRecurringExpenses = () => {
    const recurringExpenses = transactions.filter(t => 
      t.type === 'expense' && 
      t.recurrence && 
      t.recurrence.type !== 'none'
    );

    let monthlyTotal = 0;
    let totalRemaining = 0;

    recurringExpenses.forEach(expense => {
      if (expense.recurrence) {
        // Calcular valor mensal baseado no tipo de recorrência
        let monthlyAmount = 0;
        switch (expense.recurrence.type) {
          case 'monthly':
            monthlyAmount = expense.amount;
            break;
          case 'weekly':
            monthlyAmount = expense.amount * 4.33; // aproximadamente 4.33 semanas por mês
            break;
          case 'yearly':
            monthlyAmount = expense.amount / 12;
            break;
        }

        monthlyTotal += monthlyAmount;

        // Calcular total restante
        if (expense.recurrence.isInfinite) {
          totalRemaining = Infinity;
        } else if (expense.recurrence.repetitions) {
          const remainingMonths = expense.recurrence.repetitions - 1; // -1 porque já pagou o primeiro
          totalRemaining += monthlyAmount * remainingMonths;
        }
      }
    });

    return { monthlyTotal, totalRemaining };
  };

  const getRecurringExpensesDetails = (): RecurringExpenseDetail[] => {
    const recurringExpenses = transactions.filter(t => 
      t.type === 'expense' && 
      t.recurrence && 
      t.recurrence.type !== 'none'
    );

    return recurringExpenses.map(expense => {
      let monthlyAmount = 0;
      let totalRemaining = 0;

      if (expense.recurrence) {
        switch (expense.recurrence.type) {
          case 'monthly':
            monthlyAmount = expense.amount;
            break;
          case 'weekly':
            monthlyAmount = expense.amount * 4.33;
            break;
          case 'yearly':
            monthlyAmount = expense.amount / 12;
            break;
        }

        if (expense.recurrence.isInfinite) {
          totalRemaining = Infinity;
        } else if (expense.recurrence.repetitions) {
          const remainingMonths = expense.recurrence.repetitions - 1;
          totalRemaining = monthlyAmount * remainingMonths;
        }
      }

      return {
        id: expense.id,
        description: expense.description,
        monthlyAmount,
        endDate: expense.recurrence?.endDate,
        isInfinite: expense.recurrence?.isInfinite || false,
        totalRemaining
      };
    });
  };

  const getMonthlyIncome = () => {
    const recurringIncome = transactions.filter(t => 
      t.type === 'income' && 
      t.recurrence && 
      t.recurrence.type !== 'none'
    );

    return recurringIncome.reduce((total, income) => {
      if (income.recurrence) {
        switch (income.recurrence.type) {
          case 'monthly':
            return total + income.amount;
          case 'weekly':
            return total + (income.amount * 4.33);
          case 'yearly':
            return total + (income.amount / 12);
          default:
            return total;
        }
      }
      return total;
    }, 0);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        wallets,
        users,
        investmentCategories,
        transactionCategories,
        currentUser,
        filters,
        addTransaction,
        updateTransaction,
        addInvestmentCategory,
        updateInvestmentCategory,
        removeRecurringExpense,
        updateFilters,
        setCurrentUser,
        getFilteredTransactions,
        getTotalBalance,
        getIncomeTotal,
        getExpenseTotal,
        getRecurringExpenses,
        getRecurringExpensesDetails,
        getMonthlyIncome,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}
