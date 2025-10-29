import React from 'react';
import { LogOut, Building } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AppName } from '../../constants';

export const Header = () => {
  const { logout } = useAuth();
  return (
    <header className="flex h-16 flex-shrink-0 justify-between items-center bg-white px-4 shadow-sm sm:px-6 lg:px-8">
      <h1 className="text-xl font-semibold text-gray-900 hidden sm:block">
        {AppName} Dashboard
      </h1>
      <div className="flex-1 sm:hidden">
        <Building className="h-8 w-auto text-indigo-600" />
      </div>
      <button
        onClick={logout}
        className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <LogOut className="h-5 w-5 text-gray-500" />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </header>
  );
};