import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleErrors = (error, errorInfo) => {
      console.error('Error caught by error boundary:', error, errorInfo);
      setHasError(true);
    };

    window.addEventListener('error', handleErrors);

    return () => {
      window.removeEventListener('error', handleErrors);
    };
  }, []);

  if (hasError) {
    return <div>Something went wrong.</div>; // Render your error message or fallback UI
  }

  return children;
};

export default ErrorBoundary;
