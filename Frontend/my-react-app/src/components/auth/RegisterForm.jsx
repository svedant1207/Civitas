import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { FormInput } from '../ui/FormInput';
import { PasswordInput } from '../ui/PasswordInput';

export const RegisterForm = () => {
  const { register, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    address: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    setFormError(error);
  }, [error]);

  const handleChange = (e) => {
    clearError();
    setFormError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError(null);
    try {
      await register(formData);
      // Success is handled by AuthContext redirect
    } catch (err) {
      setFormError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {formError && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm font-medium text-red-800">{formError}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormInput label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} />
        <FormInput label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} />
      </div>

      <FormInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} autoComplete="email" />

      <div>
        <label htmlFor="password-register" className="block text-sm font-medium text-gray-700">Password</label>
        <div className="mt-1">
          <PasswordInput
            id="password-register"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </div>
      </div>

      <FormInput label="Address" name="address" value={formData.address} onChange={handleChange} autoComplete="street-address" />
      <FormInput label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} autoComplete="tel" />

      <div>
        <button
          type="submit"
          disabled={loading}
          className="flex w-full justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-indigo-400"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Create Account'}
        </button>
      </div>
    </form>
  );
};