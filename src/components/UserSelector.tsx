
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useTransactions } from '@/contexts/TransactionContext';
import { cn } from '@/lib/utils';

export function UserSelector() {
  const { users, filters, updateFilters } = useTransactions();

  const handleUserToggle = (userId: string) => {
    if (filters.userId === userId) {
      // Se já está selecionado, remove o filtro (mostra todos)
      updateFilters({ userId: undefined });
    } else {
      // Seleciona o usuário específico
      updateFilters({ userId });
    }
  };

  return (
    <div className="flex items-center gap-2 p-4 bg-card rounded-lg border">
      <span className="text-sm font-medium">Exibindo transações de:</span>
      <div className="flex gap-2">
        <Button
          variant={!filters.userId ? "default" : "outline"}
          size="sm"
          onClick={() => updateFilters({ userId: undefined })}
          className="flex items-center gap-2"
        >
          Todos
        </Button>
        {users.map((user) => (
          <Button
            key={user.id}
            variant={filters.userId === user.id ? "default" : "outline"}
            size="sm"
            onClick={() => handleUserToggle(user.id)}
            className="flex items-center gap-2"
          >
            <Avatar className="h-6 w-6">
              <AvatarFallback className={cn("text-white text-xs", user.color)}>
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {user.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
