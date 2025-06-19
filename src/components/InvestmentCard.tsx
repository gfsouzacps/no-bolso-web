
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Target, Calendar, Plus } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useTransactions } from '@/contexts/TransactionContext';
import { InvestmentCategoryModal } from '@/components/InvestmentCategoryModal';
import { InvestmentDetailModal } from '@/components/InvestmentDetailModal';
import { InvestmentCategory } from '@/types/transaction';

export function InvestmentCard() {
  const { investmentCategories } = useTransactions();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<InvestmentCategory | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const calculateProgress = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const handleCategoryClick = (category: InvestmentCategory) => {
    setSelectedCategory(category);
    setShowDetailModal(true);
  };

  return (
    <>
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Investimentos
            </CardTitle>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowCreateModal(true)}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {investmentCategories.map((investment) => (
            <div 
              key={investment.id} 
              className="p-3 sm:p-4 border rounded-lg space-y-3 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => handleCategoryClick(investment)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h3 className="font-medium text-sm sm:text-base">{investment.name}</h3>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {investment.createdAt.toLocaleDateString('pt-BR')}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-xs sm:text-sm text-muted-foreground">Meta:</span>
                    <span className="text-xs sm:text-sm font-medium">{formatCurrency(investment.goal)}</span>
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-primary">
                    {formatCurrency(investment.current)}
                  </span>
                </div>
                
                <Progress 
                  value={calculateProgress(investment.current, investment.goal)} 
                  className="h-2"
                />
                
                <div className="text-right">
                  <span className="text-xs text-muted-foreground">
                    {calculateProgress(investment.current, investment.goal).toFixed(1)}% da meta
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {investmentCategories.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Nenhuma categoria de investimento</p>
              <p className="text-xs mt-1">Clique no + para criar sua primeira categoria</p>
            </div>
          )}
        </CardContent>
      </Card>

      <InvestmentCategoryModal 
        open={showCreateModal} 
        onOpenChange={setShowCreateModal} 
      />
      
      <InvestmentDetailModal
        open={showDetailModal}
        onOpenChange={setShowDetailModal}
        category={selectedCategory}
      />
    </>
  );
}
