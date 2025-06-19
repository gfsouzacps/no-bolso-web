
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTransactions } from '@/contexts/TransactionContext';
import { InvestmentCategory } from '@/types/transaction';

interface InvestmentDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: InvestmentCategory | null;
}

export function InvestmentDetailModal({ open, onOpenChange, category }: InvestmentDetailModalProps) {
  const [newGoal, setNewGoal] = useState('');
  const [newName, setNewName] = useState('');
  const [movementAmount, setMovementAmount] = useState('');
  const [movementType, setMovementType] = useState<'income' | 'expense'>('income');
  const [movementDescription, setMovementDescription] = useState('');
  const { transactions, updateInvestmentCategory, addTransaction } = useTransactions();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handleUpdateGoal = () => {
    if (!category || !newGoal) return;
    
    updateInvestmentCategory(category.id, {
      ...category,
      goal: parseFloat(newGoal)
    });
    
    setNewGoal('');
  };

  const handleUpdateName = () => {
    if (!category || !newName) return;
    
    updateInvestmentCategory(category.id, {
      ...category,
      name: newName.trim()
    });
    
    setNewName('');
  };

  const handleAddMovement = () => {
    if (!category || !movementAmount || !movementDescription) return;

    const amount = parseFloat(movementAmount);
    
    addTransaction({
      description: movementDescription,
      amount,
      type: movementType,
      date: new Date(),
      walletId: '3', // Carteira de investimentos
      userId: '1', // Usuário atual
      categoryId: category.id
    });

    // Atualizar o valor atual da categoria
    const newCurrent = movementType === 'income' 
      ? category.current + amount 
      : category.current - amount;

    updateInvestmentCategory(category.id, {
      ...category,
      current: Math.max(0, newCurrent)
    });

    setMovementAmount('');
    setMovementDescription('');
    setMovementType('income');
  };

  // Filtrar transações relacionadas a esta categoria de investimento
  const categoryTransactions = transactions.filter(t => 
    t.walletId === '3' && // Carteira de investimentos
    t.categoryId === category?.id
  );

  if (!category) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{category.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Editar Nome */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Nome da Categoria</h3>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Label htmlFor="newName">Novo Nome</Label>
                <Input
                  id="newName"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder={category.name}
                />
              </div>
              <Button onClick={handleUpdateName} disabled={!newName}>
                Atualizar Nome
              </Button>
            </div>
          </div>

          {/* Editar Meta */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Meta da Categoria</h3>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Label htmlFor="newGoal">Nova Meta (R$)</Label>
                <Input
                  id="newGoal"
                  type="number"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  placeholder={`Atual: ${formatCurrency(category.goal)}`}
                  min="0"
                  step="0.01"
                />
              </div>
              <Button onClick={handleUpdateGoal} disabled={!newGoal}>
                Atualizar Meta
              </Button>
            </div>
          </div>

          {/* Adicionar Movimentação */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Nova Movimentação</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="movementDescription">Descrição</Label>
                <Input
                  id="movementDescription"
                  value={movementDescription}
                  onChange={(e) => setMovementDescription(e.target.value)}
                  placeholder="Ex: Depósito mensal"
                />
              </div>
              <div>
                <Label htmlFor="movementAmount">Valor (R$)</Label>
                <Input
                  id="movementAmount"
                  type="number"
                  value={movementAmount}
                  onChange={(e) => setMovementAmount(e.target.value)}
                  placeholder="0,00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Label htmlFor="movementType">Tipo</Label>
                <Select value={movementType} onValueChange={(value: 'income' | 'expense') => setMovementType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Entrada</SelectItem>
                    <SelectItem value="expense">Saída</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleAddMovement} 
                disabled={!movementAmount || !movementDescription}
                className="mt-6"
              >
                Adicionar
              </Button>
            </div>
          </div>
          
          {/* Extrato */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Extrato de Movimentações</h3>
            {categoryTransactions.length > 0 ? (
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categoryTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          {transaction.date.toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            transaction.type === 'income' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {transaction.type === 'income' ? 'Entrada' : 'Saída'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Nenhuma movimentação encontrada para esta categoria</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
