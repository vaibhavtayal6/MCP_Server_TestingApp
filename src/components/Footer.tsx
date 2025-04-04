
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} MCP Server Inspector. All rights reserved to vaibhavtayal6.
        </p>
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/vaibhavtayal6" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
