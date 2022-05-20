import React from 'react';
import { SpinnerCircularFixed } from 'spinners-react';

const Loader = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <SpinnerCircularFixed
        size={50}
        thickness={100}
        speed={100}
        color="rgba(84, 74, 244, 1)"
        secondaryColor="rgba(206, 212, 218, 0.3)"
      />
      <p style={{ fontSize: '0.8rem' }}>Loading...</p>
    </div>
  );
};

export default Loader;
