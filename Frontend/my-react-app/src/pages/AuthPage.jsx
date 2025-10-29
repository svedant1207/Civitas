import React, { useState, useEffect } from 'react';
import { AppName } from '../constants'; // <-- FIX IS HERE
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';

// This is the building icon you used before, as an SVG
const BuildingIcon = () => (
  <svg className="h-10 w-auto text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
  </svg>
);

export const AuthPage = ({ initialView = 'login' }) => {
  // This page will now control which form to show
  const [view, setView] = useState(initialView);

  // This ensures the view updates if the hash link changes
  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <a href="#/" title="Back to Home" className="flex justify-center">
          <BuildingIcon />
        </a>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {view === 'login' ? `Sign in to ${AppName}` : `Create your ${AppName} account`}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <button
            onClick={() => setView(view === 'login' ? 'register' : 'login')}
            className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
          >
            {view === 'login' ? 'create a new account' : 'sign in to your account'}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {view === 'login' ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
};


