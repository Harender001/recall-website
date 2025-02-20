import React from 'react';
import logoImage from '../assets/logo.png';

const Logo = () => {
  return (
    <a href="#" className="logo">
      <img src={logoImage} alt="RecallAI Logo" className="logo-image" />
    </a>
  );
};

export default Logo; 