import { Bell, Search, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function TopNav() {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-xl flex items-center justify-between px-6 lg:px-8 sticky top-0 z-20">
      {/* Spacer for mobile hamburger */}
      <div className="lg:hidden w-10" />

      {/* Search */}
      <div className="hidden sm:flex items-center gap-2.5 bg-secondary/60 border border-border/50 rounded-xl px-3.5 py-2 w-72 lg:w-80 transition-colors focus-within:border-primary/30 focus-within:bg-card">
        <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <input
          placeholder="Search transactions, accounts..."
          className="bg-transparent text-sm outline-none w-full text-foreground placeholder:text-muted-foreground/70"
        />
        <kbd className="hidden md:inline text-[10px] text-muted-foreground/60 bg-card border border-border rounded-md px-1.5 py-0.5 font-mono">⌘K</kbd>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1.5">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground hover:text-foreground rounded-xl h-9 w-9 transition-all duration-200">
          {dark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
        </Button>
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground rounded-xl h-9 w-9 transition-all duration-200">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-destructive rounded-full ring-2 ring-card" />
        </Button>
        <div className="ml-3 flex items-center gap-3 pl-3 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary ring-2 ring-primary/10">
            A
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-foreground leading-none">Alex Chen</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">alex@email.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
