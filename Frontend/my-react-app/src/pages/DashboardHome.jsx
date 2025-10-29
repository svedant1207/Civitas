import React from 'react';
import { AppName } from '../constants';

export const DashboardHome = () => (
  <div>
    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Welcome to {AppName}</h2>
    <p className="text-lg text-gray-600">
      Select an option from the sidebar to manage notices, complaints, residents, and payments.
    </p>
  </div>
);