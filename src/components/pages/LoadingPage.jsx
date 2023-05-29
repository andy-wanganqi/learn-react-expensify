import React from 'react';

const LoadingPage = () => {
  return (
    <div className='loader'>
      <div className='loader__image'></div>
      <div style={{display: "none"}}>Loading Page</div>
    </div>
  );
};

export default LoadingPage;
