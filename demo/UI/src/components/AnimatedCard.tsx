import React, { ReactNode } from 'react';

type AnimatedCardProps = {
  children: ReactNode;
  className?: string;
};

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`form-card slide-in ${className}`}>
      {children}
    </div>
  );
};

export default AnimatedCard;