import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigateButton = ({ to, className, children }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to, { replace: true });
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
};

export default NavigateButton;
