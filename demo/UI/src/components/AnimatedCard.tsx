import React, { ReactNode, useState } from 'react';

type AnimatedCardProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  hoverEffect?: boolean;
};

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  className = '',
  title,
  subtitle,
  hoverEffect = true
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverEffect) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };
  
  return (
    <div 
      className={`form-card slide-in relative ${hoverEffect ? 'overflow-hidden' : ''} ${className}`}
      onMouseMove={handleMouseMove}
    >
      {hoverEffect && (
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.6), transparent 40%)`,
          }}
        />
      )}
      
      {(title || subtitle) && (
        <div className="mb-6 border-b border-gray-700 pb-4">
          {title && <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">{title}</h2>}
          {subtitle && <p className="text-center text-gray-400 mt-1">{subtitle}</p>}
        </div>
      )}
      
      {children}
    </div>
  );
};

export default AnimatedCard;