import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../api';
import { DataRenderer } from '../components/ui/DataRenderer';
import { Card } from '../components/ui/Card';

export const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const data = await apiRequest('/notices/', 'GET', null, token);
        setNotices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, [token]);

  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Notices</h2>
      <DataRenderer loading={loading} error={error} data={notices} resourceName="notices">
        {(data) => (
          <div className="space-y-4">
            {data.map((notice) => (
              <Card key={notice.id}>
                <h3 className="text-lg font-semibold text-gray-900">{notice.title}</h3>
                {/* Note: Your backend `notices.py` sends `content` but your `models.py` has `body`.
                  This code checks for both, but you should fix your backend to be consistent!
                */}
                <p className="mt-2 text-sm text-gray-600">{notice.body || notice.content}</p>
                <p className="mt-3 text-xs text-gray-400">
                  Posted on: {new Date(notice.created_at).toLocaleDateString()}
                </p>
              </Card>
            ))}
          </div>
        )}
      </DataRenderer>
    </div>
  );
};