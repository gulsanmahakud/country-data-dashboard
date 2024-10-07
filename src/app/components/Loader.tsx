import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
