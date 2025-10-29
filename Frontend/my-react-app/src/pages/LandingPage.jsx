import React from 'react';
import { AppName } from '../constants'; // <-- FIX IS HERE

// This is the building icon you used before, as an SVG
const BuildingIcon = () => (
  <svg className="h-8 w-auto text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
  </svg>
);

export const LandingPage = () => {
  return (
    <div id="app" className="min-h-screen flex flex-col font-inter">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <BuildingIcon />
              <span className="ml-2 text-2xl font-bold text-gray-900">{AppName}</span>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <a href="#/login" className="text-base font-medium text-gray-600 hover:text-gray-900">
                Sign In
              </a>
              <a href="#/register" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                Create an account
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content (Hero Section) */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Hero Text */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
                Welcome to <span className="text-indigo-600">{AppName}</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600">
                Your integrated portal for community management. Access notices, file complaints, and connect with your neighbors all in one place.
              </p>
              <div className="mt-10">
                <a href="#/register" className="inline-block px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  Get Started
                </a>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div className="hidden md:block">
              <img src="https://placehold.co/600x450/E0E7FF/4F46E5?text=Community+Portal" alt="Community Portal" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-base text-gray-500">
            &copy; 2025 Civitas. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};