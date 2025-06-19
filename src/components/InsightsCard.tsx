
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, TrendingUp, TrendingDown, Target } from 'lucide-react';

export function InsightsCard() {
  // Insights simulados que virão da IA futuramente
  const insights = [
    {
      id: 1,
      type: 'expense',
      icon: TrendingDown,
      text: 'Seu maior gasto este mês foi com Supermercado',
      value: 'R$ 1.240,00',
      color: 'text-expense'
    },
    {
      id: 2,
      type: 'comparison',
      icon: TrendingUp,
      text: 'Você gastou 22% a mais que no mês anterior',
      value: '+R$ 380,00',
      color: 'text-orange-500'
    },
    {
      id: 3,
      type: 'savings',
      icon: Target,
      text: 'Parabéns! Você poupou R$ 800,00 esse mês',
      value: 'Meta: 65%',
      color: 'text-income'
    }
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Seus Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => {
          const IconComponent = insight.icon;
          return (
            <div key={insight.id} className="p-3 sm:p-4 border rounded-lg">
              <div className="flex items-start gap-3">
                <div className={`mt-1 ${insight.color}`}>
                  <IconComponent className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base text-foreground leading-relaxed">
                    {insight.text}
                  </p>
                  <p className={`text-xs sm:text-sm font-medium mt-1 ${insight.color}`}>
                    {insight.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        
        {insights.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Brain className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Nenhum insight disponível</p>
            <p className="text-xs mt-1">Adicione mais transações para receber insights personalizados</p>
          </div>
        )}
        
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground text-center">
            💡 Insights gerados automaticamente pela IA
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
