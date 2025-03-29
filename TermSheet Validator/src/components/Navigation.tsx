import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, Moon, Sun, Brain, 
  LayoutDashboard, FileText, Settings as SettingsIcon 
} from 'lucide-react';

interface NavigationProps {
  onToggleSidebar: () => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  onToggleSidebar,
  onToggleTheme,
  isDarkMode
}) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-850 shadow-lg z-50">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </button>
          
          <Link to="/" className="flex items-center space-x-2.5">
            <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Term Sheet AI
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/dashboard"
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <LayoutDashboard className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </Link>
          
          <Link
            to="/settings"
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <SettingsIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </Link>

          <button
            onClick={onToggleTheme}
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};