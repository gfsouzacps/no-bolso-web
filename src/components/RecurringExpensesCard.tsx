
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, TrendingDown, TrendingUp, ChevronRight } from 'lucide-react';
import { useTransactions } from '@/contexts/TransactionContext';

interface RecurringExpensesCardProps {
  onClick?: () => void;
}

export function RecurringExpensesCard({ onClick }: RecurringExpensesCardProps) {
  const { getRecurringExpenses, getMonthlyIncome } = useTransactions();
  
  const { monthlyTotal, totalRemaining } = getRecurringExpenses();
  const monthlyIncome = getMonthlyIncome();
  const expenseRatio = monthlyIncome > 0 ? (monthlyTotal / monthlyIncome) * 100 : 0;

  const formatCurrency = (value: number) => {
    if (value === Infinity) return 'Infinito';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <Card 
      className={`h-full ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Gastos a Prazo
          </div>
          {onClick && <ChevronRight className="h-5 w-5 text-muted-foreground" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Custo Mensal */}
          <div className="p-3 sm:p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-expense" />
              <span className="text-sm text-muted-foreground">Custo Mensal</span>
            </div>
            <p className="text-lg sm:text-xl font-bold text-expense">
              {formatCurrency(monthlyTotal)}
            </p>
          </div>

          {/* Total Restante */}
          <div className="p-3 sm:p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-warning" />
              <span className="text-sm text-muted-foreground">Total Restante</span>
            </div>
            <p className="text-lg sm:text-xl font-bold text-warning">
              {formatCurrency(totalRemaining)}
            </p>
          </div>
        </div>

        {/* Comparação com Renda */}
        {monthlyIncome > 0 && (
          <div className="p-3 sm:p-4 border rounded-lg bg-muted/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-income" />
                <span className="text-sm text-muted-foreground">Renda Mensal</span>
              </div>
              <span className="text-sm font-medium text-income">
                {formatCurrency(monthlyIncome)}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Comprometimento</span>
                <span className={`text-sm font-medium ${
                  expenseRatio > 70 ? 'text-destructive' : 
                  expenseRatio > 50 ? 'text-warning' : 'text-income'
                }`}>
                  {expenseRatio.toFixed(1)}%
                </span>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${
                    expenseRatio > 70 ? 'bg-destructive' : 
                    expenseRatio > 50 ? 'bg-warning' : 'bg-income'
                  }`}
                  style={{ width: `${Math.min(expenseRatio, 100)}%` }}
                />
              </div>
              
              <p className="text-xs text-muted-foreground">
                {expenseRatio > 70 ? 'Atenção: Alto comprometimento da renda' :
                 expenseRatio > 50 ? 'Moderado comprometimento da renda' :
                 'Comprometimento saudável da renda'}
              </p>
            </div>
          </div>
        )}

        {monthlyTotal === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Nenhum gasto recorrente encontrado</p>
            <p className="text-xs mt-1">Adicione transações com recorrência para acompanhar seus gastos fixos</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
