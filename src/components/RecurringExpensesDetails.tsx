
import { ArrowLeft, Trash2, Calendar, Clock, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTransactions } from '@/contexts/TransactionContext';
import { RecurringExpenseEditModal } from '@/components/RecurringExpenseEditModal';
import { useState } from 'react';

interface RecurringExpensesDetailsProps {
  onBack: () => void;
}

export function RecurringExpensesDetails({ onBack }: RecurringExpensesDetailsProps) {
  const { getRecurringExpensesDetails, removeRecurringExpense } = useTransactions();
  const [editingExpense, setEditingExpense] = useState<string | null>(null);
  const recurringExpenses = getRecurringExpensesDetails();

  const formatCurrency = (value: number) => {
    if (value === Infinity) return 'Infinito';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatEndDate = (endDate?: Date, isInfinite?: boolean) => {
    if (isInfinite) return 'Vitalício';
    if (!endDate) return 'Não definido';
    return format(endDate, 'MM/yyyy', { locale: ptBR });
  };

  const handleRemoveExpense = (expenseId: string) => {
    if (confirm('Tem certeza que deseja remover esta despesa recorrente?')) {
      removeRecurringExpense(expenseId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Gastos a Prazo</h1>
      </div>

      {/* Lista de gastos recorrentes */}
      <div className="space-y-4">
        {recurringExpenses.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum gasto recorrente encontrado</p>
                <p className="text-sm mt-1">Adicione transações com recorrência para acompanhar seus gastos fixos</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          recurringExpenses.map((expense) => (
            <Card key={expense.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{expense.description}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Mensal: {formatCurrency(expense.monthlyAmount)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Até: {formatEndDate(expense.endDate, expense.isInfinite)}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm font-medium text-warning">
                        Total restante: {formatCurrency(expense.totalRemaining)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingExpense(expense.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveExpense(expense.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Modal de Edição */}
      {editingExpense && (
        <RecurringExpenseEditModal
          expenseId={editingExpense}
          open={!!editingExpense}
          onOpenChange={(open) => !open && setEditingExpense(null)}
        />
      )}
    </div>
  );
}
