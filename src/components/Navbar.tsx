
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Code } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Code className="h-6 w-6 text-purple-500" />
          <Link to="/" className="text-lg font-bold">
            MCP Server Inspector
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="block md:hidden">
            <Button variant="outline" size="icon">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[1.2rem] w-[1.2rem]"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
