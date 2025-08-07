
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Target, Shield, User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const publicNavItems = [
    { name: 'Home', path: '/home' },
    { name: 'Tools', path: '/tools' },
    { name: 'Scans', path: '/scans' },
  ];

  const authenticatedNavItems = [
    ...publicNavItems,
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Profile', path: '/profile' },
    { name: 'Put Keys', path: '/put-keys' },
  ];

  const navItems = isAuthenticated ? authenticatedNavItems : publicNavItems;

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-sniper-red/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Target className="h-8 w-8 text-sniper-red" />
            <span className="text-xl font-bold text-sniper-red">SNIPER</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-sniper-red ${
                  isActive(item.path) ? 'text-sniper-red' : 'text-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="border-sniper-red text-sniper-red hover:bg-sniper-red hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-sniper-red hover:bg-sniper-red/90">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="border-sniper-red text-sniper-red hover:bg-sniper-red hover:text-white"
                onClick={logout}
              >
                Logout
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-sniper-red/30">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 text-base font-medium transition-colors hover:text-sniper-red ${
                  isActive(item.path) ? 'text-sniper-red' : 'text-foreground'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <div className="px-3 pb-2">
                <ThemeToggle />
              </div>
              {!isAuthenticated ? (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full border-sniper-red text-sniper-red hover:bg-sniper-red hover:text-white">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-sniper-red hover:bg-sniper-red/90">
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full border-sniper-red text-sniper-red hover:bg-sniper-red hover:text-white"
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
