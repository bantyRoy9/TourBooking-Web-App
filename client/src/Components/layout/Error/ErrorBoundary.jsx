import React, { useState, useEffect } from 'react';
import Alert from './Alert';
import 'react-toastify/dist/ReactToastify.css'; 
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleErrors = (error, errorInfo) => {      
      Alert("Something wrong happen","S");
      setHasError(true);
    };

    window.addEventListener('error', handleErrors);

    return () => {
      window.removeEventListener('error', handleErrors);
    };
  }, []);
  
  if (hasError) {
    return <div style={{textAlign:"center"}}>Something wrong happened</div>
  }

  return children;
};

export default ErrorBoundary;