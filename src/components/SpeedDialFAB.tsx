
import { useState } from 'react';
import { Plus, Minus, RefreshCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SpeedDialFABProps {
  onExpenseClick: () => void;
  onIncomeClick: () => void;
  onRecurringClick: () => void;
}

export function SpeedDialFAB({ 
  onExpenseClick, 
  onIncomeClick, 
  onRecurringClick 
}: SpeedDialFABProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Speed Dial Options */}
      <div className={cn(
        "flex flex-col-reverse gap-3 mb-3 transition-all duration-300",
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      )}>
        {/* Recorrente */}
        <Button
          size="lg"
          variant="secondary"
          className="h-12 w-12 rounded-full shadow-lg bg-purple-500 hover:bg-purple-600 text-white"
          onClick={() => handleAction(onRecurringClick)}
        >
          <RefreshCcw className="h-5 w-5" />
        </Button>
        
        {/* Receita */}
        <Button
          size="lg"
          variant="secondary"
          className="h-12 w-12 rounded-full shadow-lg bg-green-500 hover:bg-green-600 text-white"
          onClick={() => handleAction(onIncomeClick)}
        >
          <Plus className="h-5 w-5" />
        </Button>
        
        {/* Despesa */}
        <Button
          size="lg"
          variant="secondary"
          className="h-12 w-12 rounded-full shadow-lg bg-red-500 hover:bg-red-600 text-white"
          onClick={() => handleAction(onExpenseClick)}
        >
          <Minus className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Main FAB */}
      <Button
        size="lg"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-transform duration-300",
          isOpen && "rotate-45"
        )}
        onClick={toggleOpen}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </Button>
    </div>
  );
}
