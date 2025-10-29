import { BASE_URL } from '../constants';

/**
 * A helper function for making authenticated API requests.
 */
export const apiRequest = async (url, method, body, token) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${url}`, options);
    const data = await response.json();

    if (!response.ok) {
      // Use the error message from the backend if available
      throw new Error(data.error || data.message || `HTTP error! status: ${response.status}`);
    }
    return data;
  } catch (error) {
    console.error(`API Error (${method} ${url}):`, error);
    throw error; // Re-throw to be caught by the caller
  }
};