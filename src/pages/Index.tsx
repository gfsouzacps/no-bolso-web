
import { useState } from 'react';
import { TransactionProvider } from '@/contexts/TransactionContext';
import { Header } from '@/components/Header';
import { UserSelector } from '@/components/UserSelector';
import { BalanceCard } from '@/components/BalanceCard';
import { TransactionFilters } from '@/components/TransactionFilters';
import { TransactionList } from '@/components/TransactionList';
import { FinancialChart } from '@/components/FinancialChart';
import { InvestmentCard } from '@/components/InvestmentCard';
import { InsightsCard } from '@/components/InsightsCard';
import { RecurringExpensesCard } from '@/components/RecurringExpensesCard';
import { RecurringExpensesDetails } from '@/components/RecurringExpensesDetails';
import { SpeedDialFAB } from '@/components/SpeedDialFAB';
import { ExpenseModal } from '@/components/ExpenseModal';
import { IncomeModal } from '@/components/IncomeModal';
import { RecurringModal } from '@/components/RecurringModal';
import { ChatModal } from '@/components/ChatModal';

const Index = () => {
  const [showRecurringDetails, setShowRecurringDetails] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [recurringModalOpen, setRecurringModalOpen] = useState(false);

  if (showRecurringDetails) {
    return (
      <TransactionProvider>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-4 sm:py-8 max-w-6xl">
            <RecurringExpensesDetails onBack={() => setShowRecurringDetails(false)} />
          </div>
        </div>
      </TransactionProvider>
    );
  }

  return (
    <TransactionProvider>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-4 sm:py-8 max-w-6xl">
          <Header />
          <UserSelector />
          <BalanceCard />
          
          {/* Layout responsivo principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="lg:col-span-2 order-1 lg:order-1">
              <TransactionFilters />
              <TransactionList />
            </div>
            <div className="lg:col-span-1 order-2 lg:order-2">
              <FinancialChart />
            </div>
          </div>
          
          {/* Seção de Gastos Recorrentes */}
          <div className="mb-6 sm:mb-8">
            <RecurringExpensesCard onClick={() => setShowRecurringDetails(true)} />
          </div>
          
          {/* Seção de Investimentos e Insights - empilhados em mobile */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <InvestmentCard />
            <InsightsCard />
          </div>
          
          {/* Speed Dial FAB */}
          <SpeedDialFAB
            onExpenseClick={() => setExpenseModalOpen(true)}
            onIncomeClick={() => setIncomeModalOpen(true)}
            onRecurringClick={() => setRecurringModalOpen(true)}
          />
          
          {/* Modais */}
          <ExpenseModal open={expenseModalOpen} onOpenChange={setExpenseModalOpen} />
          <IncomeModal open={incomeModalOpen} onOpenChange={setIncomeModalOpen} />
          <RecurringModal open={recurringModalOpen} onOpenChange={setRecurringModalOpen} />
          <ChatModal />
        </div>
      </div>
    </TransactionProvider>
  );
};

export default Index;
