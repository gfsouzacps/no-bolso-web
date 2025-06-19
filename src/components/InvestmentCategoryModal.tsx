
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTransactions } from '@/contexts/TransactionContext';

interface InvestmentCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InvestmentCategoryModal({ open, onOpenChange }: InvestmentCategoryModalProps) {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const { addInvestmentCategory } = useTransactions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !goal) return;

    addInvestmentCategory({
      name: name.trim(),
      goal: parseFloat(goal),
      current: 0,
      color: 'bg-blue-500',
      createdAt: new Date()
    });

    setName('');
    setGoal('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nova Categoria de Investimento</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Categoria</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Viagem, Carro Novo..."
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="goal">Meta (R$)</Label>
            <Input
              id="goal"
              type="number"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Ex: 10000"
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Criar Categoria
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
