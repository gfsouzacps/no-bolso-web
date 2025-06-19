
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useTransactions } from '@/contexts/TransactionContext';

export function BalanceCard() {
  const { getTotalBalance, getIncomeTotal, getExpenseTotal } = useTransactions();

  const balance = getTotalBalance();
  const income = getIncomeTotal();
  const expense = getExpenseTotal();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 sm:mb-6">
      {/* Saldo Total - ocupa largura total em mobile */}
      <Card className="sm:col-span-2 lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Saldo Total
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">
            {formatCurrency(balance)}
          </div>
        </CardContent>
      </Card>

      {/* Entradas */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <ArrowUp className="h-4 w-4 text-income" />
            Entradas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg sm:text-xl font-bold text-income">
            {formatCurrency(income)}
          </div>
        </CardContent>
      </Card>

      {/* Saídas */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <ArrowDown className="h-4 w-4 text-expense" />
            Saídas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg sm:text-xl font-bold text-expense">
            {formatCurrency(expense)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
