import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error }) => {
  const handleGoHome = () => {
    window.location.href = '/'; // الانتقال إلى الصفحة الرئيسية
  };

  return (
    <div role="alert" style={{ padding: '1rem', textAlign: 'center' }}>
      <p>Something went wrong while rendering 😕</p>
      <pre>{error.message}</pre>
      <button
        onClick={handleGoHome}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Go to Home
      </button>
    </div>
  );
};

const MyErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.error("Error caught by ErrorBoundary:", error, info);
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default MyErrorBoundary;
