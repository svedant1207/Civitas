import { useState, useEffect } from 'react';

const getHashLocation = () => {
  const hash = window.location.hash.replace(/^#\/?/, ''); // Remove #/

  if (!hash || hash === 'home' || hash === '/') {
    return { page: 'home', view: 'home' };
  }

  if (['login', 'register'].includes(hash)) {
    return { page: hash, view: hash };
  }

  // Default to dashboard if logged in and hash is unclear
  if (['dashboard', 'notices', 'complaints', 'residents', 'payments'].includes(hash)) {
     return { page: 'dashboard', view: hash };
  }

  // Fallback
  return { page: 'home', view: 'home' };
};

export const useHashNavigation = (token) => {
  const [navigation, setNavigation] = useState(getHashLocation());

  useEffect(() => {
    const handleHashChange = () => {
      setNavigation(getHashLocation());
    };

    window.addEventListener('hashchange', handleHashChange);

    // Initial check: Redirect if logged in but on public page, or vice versa
    const { page } = getHashLocation();
    if (token && (page === 'home' || page === 'login' || page === 'register')) {
      window.location.hash = '#/dashboard';
    } else if (!token && page !== 'home' && page !== 'login' && page !== 'register') {
      window.location.hash = '#/';
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [token]); // Re-run effect if token changes

  return navigation;
};