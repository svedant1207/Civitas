import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../api';
import { DataRenderer } from '../components/ui/DataRenderer';
import { Card } from '../components/ui/Card';
import { FormInput } from '../components/ui/FormInput';

export const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const data = await apiRequest('/complaints/', 'GET', null, token);
      setComplaints(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    try {
      const newComplaint = await apiRequest('/complaints/', 'POST', { title, description }, token);
      setComplaints([newComplaint, ...complaints]); // Add new complaint to top
      setTitle('');
      setDescription('');
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* New Complaint Form */}
      <div className="lg:col-span-1">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">File a New Complaint</h2>
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            {formError && <p className="text-sm text-red-600">{formError}</p>}
            <FormInput label="Title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              disabled={formLoading}
              className="flex w-full justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-indigo-400"
            >
              {formLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Submit Complaint'}
            </button>
          </form>
        </Card>
      </div>

      {/* Complaints List */}
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Submitted Complaints</h2>
        <DataRenderer loading={loading} error={error} data={complaints} resourceName="complaints">
          {(data) => (
            <div className="space-y-4">
              {data.map((item) => (
                <Card key={item.id}>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                  <p className="mt-3 text-xs text-gray-400">
                    Filed on: {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </Card>
              ))}
            </div>
          )}
        </DataRenderer>
      </div>
    </div>
  );
};