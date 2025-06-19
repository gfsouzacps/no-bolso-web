
import { Calculator, TrendingUp } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
  return (
    <header className="flex items-center justify-between mb-6 sm:mb-8">
      <div className="flex items-center gap-3">
        <div className="bg-primary rounded-lg p-2">
          <Calculator className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">FinanceApp</h1>
          <p className="text-sm text-muted-foreground hidden sm:block">
            Controle suas finanças de forma inteligente
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          <span>Dashboard Financeiro</span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
