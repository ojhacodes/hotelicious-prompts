
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ImageIcon, Sparkles, Flame, Heart } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="w-full py-4 px-6 glass-panel fixed top-4 left-0 right-0 mx-auto max-w-6xl z-50 rounded-full shadow-lg">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center transform transition-transform group-hover:rotate-12">
            <ImageIcon className="text-primary-foreground w-5 h-5" />
          </div>
          <span className="text-xl font-bold gradient-text">HotelPost</span>
        </Link>
        
        <nav className="flex items-center space-x-2">
          {[
            { path: '/', label: 'Create', icon: <Sparkles className="h-4 w-4" /> },
            { path: '/edit', label: 'Edit', icon: <Flame className="h-4 w-4" /> },
            { path: '/share', label: 'Share', icon: <Heart className="h-4 w-4" /> }
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1.5",
                location.pathname === item.path
                  ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md"
                  : "hover:bg-muted hover:scale-105"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
