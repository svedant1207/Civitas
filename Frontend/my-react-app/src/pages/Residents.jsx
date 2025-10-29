import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../api';
import { DataRenderer } from '../components/ui/DataRenderer';
import { Card } from '../components/ui/Card';

export const Residents = () => {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchResidents = async () => {
      setLoading(true);
      try {
        const data = await apiRequest('/residents/', 'GET', null, token);
        setResidents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResidents();
  }, [token]);

  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Community Residents</h2>
      <DataRenderer loading={loading} error={error} data={residents} resourceName="residents">
        {(data) => (
          <Card className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.map((res) => (
                    <tr key={res.id}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{res.first_name} {res.last_name}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{res.email}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{res.phone}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{res.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </DataRenderer>
    </div>
  );
};