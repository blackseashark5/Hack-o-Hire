import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FileText, LayoutDashboard, Settings,
  History, FileCheck, ExternalLink
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  
  const menuItems = [
    {
      name: 'Process Term Sheets',
      icon: FileText,
      path: '/'
    },
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard'
    },
    {
      name: 'Past Data',
      icon: History,
      path: '/history'
    },
    {
      name: 'Validation Reports',
      icon: FileCheck,
      path: '/validation'
    },
    {
      name: 'Settings',
      icon: Settings,
      path: '/settings'
    }
  ];

  const externalLinks = [
    {
      name: 'Jira Board',
      icon: ExternalLink,
      url: 'https://your-jira-board.com'
    },
    {
      name: 'Confluence',
      icon: ExternalLink,
      url: 'https://your-confluence.com'
    }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'w-64' : 'w-0 -translate-x-full'}`}>
      <div className="h-full flex flex-col">
        <div className="flex-1 py-4">
          <nav className="px-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t dark:border-gray-700">
          <h3 className="px-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            External Links
          </h3>
          {externalLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-link"
            >
              <link.icon className="w-5 h-5" />
              <span className="font-medium">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};