
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="w-full py-4 px-6 glass-panel fixed top-4 left-0 right-0 mx-auto max-w-6xl z-50 rounded-full">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <ImageIcon className="text-primary-foreground w-5 h-5" />
          </div>
          <span className="text-xl font-semibold">HotelPost</span>
        </Link>
        
        <nav className="flex items-center space-x-1">
          {[
            { path: '/', label: 'Create' },
            { path: '/edit', label: 'Edit' },
            { path: '/share', label: 'Share' }
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
