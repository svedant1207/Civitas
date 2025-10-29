import React from 'react';
import { Loader2 } from 'lucide-react';
import { Card } from './Card';

export const DataRenderer = ({ loading, error, data, children, resourceName = "items" }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-l-4 border-red-500">
        <p className="font-medium text-red-700">Error fetching {resourceName}: {error}</p>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <p className="text-center text-gray-500">No {resourceName} found.</p>
      </Card>
    );
  }

  return children(data);
};