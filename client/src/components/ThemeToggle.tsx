import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme, switchable } = useTheme();

  if (!switchable) return null;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
      title={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
    >
      {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-300" />}
    </button>
  );
}
