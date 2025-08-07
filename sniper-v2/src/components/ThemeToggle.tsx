
import React from 'react';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className={`border-2 transition-all duration-300 ${
        theme === 'red' 
          ? 'border-sniper-red text-sniper-red hover:bg-sniper-red hover:text-white' 
          : 'border-sniper-green text-sniper-green hover:bg-sniper-green hover:text-white'
      }`}
      title={`Switch to ${theme === 'red' ? 'Green' : 'Red'} theme`}
    >
      <Palette className="h-4 w-4" />
    </Button>
  );
};

export default ThemeToggle;
