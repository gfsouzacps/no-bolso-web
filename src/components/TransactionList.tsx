
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useTransactions } from '@/contexts/TransactionContext';
import { cn } from '@/lib/utils';

export function TransactionList() {
  const { getFilteredTransactions, wallets, users } = useTransactions();
  const transactions = getFilteredTransactions();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getWalletName = (walletId: string) => {
    return wallets.find(w => w.id === walletId)?.name || 'Carteira';
  };

  const getUser = (userId: string) => {
    return users.find(u => u.id === userId);
  };

  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <p>Nenhuma transação encontrada</p>
            <p className="text-sm mt-1">Ajuste os filtros ou adicione uma nova transação</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transações Recentes</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {transactions.map((transaction) => {
            const user = getUser(transaction.userId);
            return (
              <div key={transaction.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-full",
                    transaction.type === 'income' ? 'bg-income/10' : 'bg-expense/10'
                  )}>
                    {transaction.type === 'income' ? (
                      <ArrowUp className="h-4 w-4 text-income" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-expense" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        {user && (
                          <>
                            <Avatar className="h-4 w-4">
                              <AvatarFallback className={cn("text-white text-xs", user.color)}>
                                {user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{user.name}</span>
                          </>
                        )}
                      </div>
                      <span>•</span>
                      <span>{getWalletName(transaction.walletId)}</span>
                      <span>•</span>
                      <span>
                        {format(transaction.date, "dd MMM yyyy", { locale: ptBR })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "font-semibold",
                    transaction.type === 'income' ? 'text-income' : 'text-expense'
                  )}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
