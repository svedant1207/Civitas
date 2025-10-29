import React from 'react';
import {
  Home,
  Bell,
  MessageSquareWarning,
  Users,
  CreditCard,
  Building
} from 'lucide-react';

export const Sidebar = ({ activeView }) => {
  const navItems = [
    { name: 'dashboard', label: 'Dashboard', icon: Home, href: '#/dashboard' },
    { name: 'notices', label: 'Notices', icon: Bell, href: '#/notices' },
    { name: 'complaints', label: 'Complaints', icon: MessageSquareWarning, href: '#/complaints' },
    { name: 'residents', label: 'Residents', icon: Users, href: '#/residents' },
    { name: 'payments', label: 'Payments', icon: CreditCard, href: '#/payments' },
  ];

  return (
    <nav className="flex w-16 flex-col items-center overflow-y-auto border-r border-gray-200 bg-white py-4 sm:w-20">
      <a href="#/dashboard" className="flex flex-shrink-0 items-center">
        <Building className="h-8 w-auto text-indigo-600" />
      </a>
      <div className="mt-6 w-full flex-1 space-y-2 px-2">
        {navItems.map((item) => {
          const isActive = activeView === item.name;
          return (
            <a
              key={item.name}
              href={item.href}
              title={item.label}
              className={`
                ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                flex w-full flex-col items-center rounded-lg p-3 text-xs font-medium
              `}
            >
              <item.icon className="h-6 w-6" />
              <span className="mt-1 hidden sm:block">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};